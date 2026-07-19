import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Footer } from '~/components/footer';
import { Heading } from '~/components/heading';
import { Icon } from '~/components/icon';
import { Input } from '~/components/input';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { tokens } from '~/components/theme-provider/theme';
import { Transition } from '~/components/transition';
import { useFormInput } from '~/hooks';
import { useRef, useState } from 'react';
import { cssProps, msToNum, numToMs } from '~/utils/style';
import { baseMeta } from '~/utils/meta';
import { Form, useActionData, useNavigation, useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/cloudflare';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import styles from './contact.module.css';

async function getEnvVars(context) {
  const env = {
    AWS_ACCESS_KEY_ID: context?.cloudflare?.env?.AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: context?.cloudflare?.env?.AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY,
    EMAIL: context?.cloudflare?.env?.EMAIL || process.env.EMAIL,
    FROM_EMAIL: context?.cloudflare?.env?.FROM_EMAIL || process.env.FROM_EMAIL,
    WEB3FORMS_ACCESS_KEY: context?.cloudflare?.env?.WEB3FORMS_ACCESS_KEY || process.env.WEB3FORMS_ACCESS_KEY,
  };

  // In local development, read from .dev.vars manually if wrangler dev proxy hasn't populated them
  if (process.env.NODE_ENV === 'development') {
    try {
      const fs = await import('node:fs');
      const path = await import('node:path');
      const devVarsPath = path.resolve(process.cwd(), '.dev.vars');
      if (fs.existsSync(devVarsPath)) {
        const content = fs.readFileSync(devVarsPath, 'utf8');
        const lines = content.split('\n');
        for (const line of lines) {
          const [key, ...valueParts] = line.split('=');
          if (key && valueParts.length > 0) {
            const k = key.trim();
            const v = valueParts.join('=').trim();
            if (k in env && !env[k]) {
              env[k] = v;
            }
          }
        }
      }
    } catch (e) {
      console.warn('Could not read .dev.vars:', e);
    }
  }

  return env;
}

export async function loader({ context }) {
  const env = await getEnvVars(context);
  return json({ web3FormsKey: env.WEB3FORMS_ACCESS_KEY || '' });
}

export const meta = () => {
  return baseMeta({
    title: 'Contact',
    description:
      'Send me a message if you’re interested in discussing a project or if you just want to say hi',
  });
};

const MAX_EMAIL_LENGTH = 512;
const MAX_MESSAGE_LENGTH = 4096;
const EMAIL_PATTERN = /(.+)@(.+){2,}\.(.+){2,}/;

export async function action({ context, request }) {
  const formData = await request.formData();
  const email = String(formData.get('email'));
  const message = String(formData.get('message'));
  
  // Validation
  const errors = {};
  if (!email || !EMAIL_PATTERN.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!message) {
    errors.message = 'Please enter a message.';
  }
  if (email.length > MAX_EMAIL_LENGTH) {
    errors.email = `Email address must be shorter than ${MAX_EMAIL_LENGTH} characters.`;
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    errors.message = `Message must be shorter than ${MAX_MESSAGE_LENGTH} characters.`;
  }

  if (Object.keys(errors).length > 0) {
    return json({ errors });
  }

  const env = await getEnvVars(context);

  if (env.AWS_ACCESS_KEY_ID && env.AWS_SECRET_ACCESS_KEY && env.EMAIL) {
    const ses = new SESClient({
      region: 'us-east-1',
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      },
    });

    // Send email via Amazon SES
    await ses.send(
      new SendEmailCommand({
        Destination: {
          ToAddresses: [env.EMAIL],
        },
        Message: {
          Body: {
            Text: {
              Data: `From: ${email}\n\n${message}`,
            },
          },
          Subject: {
            Data: `Portfolio message from ${email}`,
          },
        },
        Source: `Portfolio <${env.FROM_EMAIL || 'portfolio@local'}>`,
        ReplyToAddresses: [email],
      })
    );
  } else {
    // Fallback: log locally when env variables are not configured (local dev)
    console.info('Contact submission (local fallback):', { email, message });
  }

  return json({ success: true });
}

export const Contact = () => {
  const errorRef = useRef();
  const email = useFormInput('');
  const message = useFormInput('');
  const initDelay = tokens.base.durationS;
  const actionData = useActionData();
  const { state } = useNavigation();

  const { web3FormsKey } = useLoaderData() || {};
  console.log('DEBUG: web3FormsKey on client =', web3FormsKey);
  const [clientSuccess, setClientSuccess] = useState(false);
  const [clientSending, setClientSending] = useState(false);
  const [clientError, setClientError] = useState('');

  const sending = state === 'submitting' || clientSending;
  const success = actionData?.success || clientSuccess;
  const errors = actionData?.errors || (clientError ? { message: clientError } : null);

  const handleSubmit = async (event) => {
    if (!web3FormsKey) {
      console.log('DEBUG: No web3FormsKey found, falling back to server action.');
      return;
    }

    event.preventDefault();
    setClientSending(true);
    setClientError('');

    console.log('DEBUG: Submitting to Web3Forms client-side with key:', web3FormsKey);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: web3FormsKey,
          name: 'Portfolio Contact Form',
          email: email.value,
          message: message.value,
        }),
      });

      const result = await response.json();
      console.log('DEBUG: Web3Forms raw response result =', result);
      if (result.success) {
        setClientSuccess(true);
      } else {
        setClientError(result.message || 'Failed to send message via Web3Forms.');
      }
    } catch (err) {
      console.error('DEBUG: Web3Forms submit error =', err);
      setClientError(err.message || 'Failed to send message.');
    } finally {
      setClientSending(false);
    }
  };

  return (
    <Section className={styles.contact}>
      <Transition unmount in={!success} timeout={1600}>
        {({ status, nodeRef }) => (
          <Form
            unstable_viewTransition
            className={styles.form}
            method="post"
            onSubmit={handleSubmit}
            ref={nodeRef}
          >
            <Heading
              className={styles.title}
              data-status={status}
              level={3}
              as="h1"
              style={getDelay(tokens.base.durationXS, initDelay, 0.3)}
            >
              <DecoderText text="Say hello" start={status !== 'exited'} delay={300} />
            </Heading>
            <Divider
              className={styles.divider}
              data-status={status}
              style={getDelay(tokens.base.durationXS, initDelay, 0.4)}
            />
            {/* Hidden honeypot field to identify bots */}
            <Input
              className={styles.botkiller}
              label="Name"
              name="name"
              maxLength={MAX_EMAIL_LENGTH}
            />
            <Input
              required
              className={styles.input}
              data-status={status}
              style={getDelay(tokens.base.durationXS, initDelay)}
              autoComplete="email"
              label="Your email"
              type="email"
              name="email"
              maxLength={MAX_EMAIL_LENGTH}
              {...email}
            />
            <Input
              required
              multiline
              className={styles.input}
              data-status={status}
              style={getDelay(tokens.base.durationS, initDelay)}
              autoComplete="off"
              label="Message"
              name="message"
              maxLength={MAX_MESSAGE_LENGTH}
              {...message}
            />
            <Transition
              unmount
              in={!sending && !!errors}
              timeout={msToNum(tokens.base.durationM)}
            >
              {({ status: errorStatus, nodeRef }) => (
                <div
                  className={styles.formError}
                  ref={nodeRef}
                  data-status={errorStatus}
                  style={cssProps({
                    height: errorStatus ? errorRef.current?.offsetHeight : 0,
                  })}
                >
                  <div className={styles.formErrorContent} ref={errorRef}>
                    <div className={styles.formErrorMessage}>
                      <Icon className={styles.formErrorIcon} icon="error" />
                      {errors?.email}
                      {errors?.message}
                    </div>
                  </div>
                </div>
              )}
            </Transition>
            <Button
              className={styles.button}
              data-status={status}
              data-sending={sending}
              style={getDelay(tokens.base.durationM, initDelay)}
              disabled={sending}
              loading={sending}
              loadingText="Sending..."
              icon="send"
              type="submit"
            >
              Send message
            </Button>
          </Form>
        )}
      </Transition>
      <Transition unmount in={success}>
        {({ status, nodeRef }) => (
          <div className={styles.complete} aria-live="polite" ref={nodeRef}>
            <Heading
              level={3}
              as="h3"
              className={styles.completeTitle}
              data-status={status}
            >
              Message Sent
            </Heading>
            <Text
              size="l"
              as="p"
              className={styles.completeText}
              data-status={status}
              style={getDelay(tokens.base.durationXS)}
            >
              I’ll get back to you within a couple days, sit tight
            </Text>
            <Button
              secondary
              iconHoverShift
              className={styles.completeButton}
              data-status={status}
              style={getDelay(tokens.base.durationM)}
              href="/"
              icon="chevron-right"
            >
              Back to homepage
            </Button>
          </div>
        )}
      </Transition>
      <Footer className={styles.footer} />
    </Section>
  );
};

function getDelay(delayMs, offset = numToMs(0), multiplier = 1) {
  const numDelay = msToNum(delayMs) * multiplier;
  return cssProps({ delay: numToMs((msToNum(offset) + numDelay).toFixed(0)) });
}
