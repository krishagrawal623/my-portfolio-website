import profileImgLarge from '~/assets/krish-profile.jpg';
import profileImgPlaceholder from '~/assets/krish-profile.jpg';
import profileImg from '~/assets/krish-profile.jpg';
import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Image } from '~/components/image';
import { Link } from '~/components/link';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { Fragment, useState } from 'react';
import { media } from '~/utils/style';
import styles from './profile.module.css';

const ProfileText = ({ visible, titleId }) => (
  <Fragment>
    <Heading className={styles.title} data-visible={visible} level={3} id={titleId}>
      <DecoderText text="Hi there" start={visible} delay={500} />
    </Heading>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      I’m Krish Agrawal, currently pursuing a Bachelor of Technology in Computer Science (School of Computing) at MIT ADT University, Pune (class of 2027). I specialize in Full-Stack Web Development (Next.js, React, Node.js) and AI/ML (fine-tuning models like BERT, data analytics).
    </Text>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      Beyond design and development, I’m driven by curiosity. I enjoy traveling and exploring new places, experiencing different cultures, and understanding the stories that shape them. My interests extend to reading self-improvement books that challenge my thinking and help me grow,
      while my fascination with geopolitics keeps me engaged with the forces shaping our world. Swimming is another passion of mine—it gives me a chance to reset, stay active, and find balance. I believe these experiences outside of technology broaden my perspective, inspire creativity, and influence the way I approach solving problems and building meaningful digital experiences.
    </Text>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      If you’re interested in the tech stack and tools I use, check out my <Link href="/uses">uses page</Link>.
    </Text>
  </Fragment>
);

export const Profile = ({ id, visible, sectionRef }) => {
  const [focused, setFocused] = useState(false);
  const titleId = `${id}-title`;

  return (
    <Section
      className={styles.profile}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible || focused} timeout={0}>
        {({ visible, nodeRef }) => (
          <div className={styles.content} ref={nodeRef}>
            <div className={styles.column}>
              <ProfileText visible={visible} titleId={titleId} />
              <Button
                secondary
                className={styles.button}
                data-visible={visible}
                href="/contact"
                icon="send"
              >
                Send me a message
              </Button>
            </div>
            <div className={styles.column}>
              <div className={styles.tag} aria-hidden>
                <Divider
                  notchWidth="64px"
                  notchHeight="8px"
                  collapsed={!visible}
                  collapseDelay={1000}
                />
                <div className={styles.tagText} data-visible={visible}>
                  About me
                </div>
              </div>
              <div className={styles.imageContainer}>
                <div className={styles.profileGlow} />
                <div className={styles.photoFrame}>
                  <Image
                    reveal
                    delay={100}
                    placeholder={profileImgPlaceholder}
                    srcSet={`${profileImg} 480w, ${profileImgLarge} 960w`}
                    width={960}
                    height={1280}
                    sizes={`(max-width: ${media.mobile}px) 100vw, 480px`}
                    alt="Krish Agrawal"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
};
