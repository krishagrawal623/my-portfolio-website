import intelliqTexture from '~/assets/intelliq-homepage.jpg';
import bertSentimentTexture from '~/assets/bert-sentiment-homepage.jpg';
import voiceCoachTexture from '~/assets/voice-coach-homepage.jpg';
import { Footer } from '~/components/footer';
import { baseMeta } from '~/utils/meta';
import { Intro } from './intro';
import { Profile } from './profile';
import { ProjectSummary } from './project-summary';
import { useEffect, useRef, useState } from 'react';
import config from '~/config.json';
import styles from './home.module.css';

// Prefetch draco decoader wasm
export const links = () => {
  return [
    {
      rel: 'prefetch',
      href: '/draco/draco_wasm_wrapper.js',
      as: 'script',
      type: 'text/javascript',
      importance: 'low',
    },
    {
      rel: 'prefetch',
      href: '/draco/draco_decoder.wasm',
      as: 'fetch',
      type: 'application/wasm',
      importance: 'low',
    },
  ];
};

export const meta = () => {
  return baseMeta({
    title: 'Developer + Engineer',
    description: `Portfolio of ${config.name} — a developer working on full-stack web and mobile apps, AI/ML, and software engineering.`,
  });
};

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const details = useRef();

  useEffect(() => {
    const sections = [intro, projectOne, projectTwo, projectThree, details];

    const sectionObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const section = entry.target;
          if (entry.isIntersecting) {
            setVisibleSections(prevSections => {
              if (prevSections.includes(section)) return prevSections;
              return [...prevSections, section];
            });

            if (section.id) {
              let activeHash = section.id;
              if (activeHash === 'project-2' || activeHash === 'project-3') {
                activeHash = 'project-1';
              }
              window.history.replaceState(null, null, `#${activeHash}`);
              window.dispatchEvent(new Event('hashchange'));
            }
          } else {
            setVisibleSections(prevSections => prevSections.filter(s => s !== section));
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Intro
        id="intro"
        sectionRef={intro}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="IntelliQ Q&A Platform"
        description="A full-stack Question & Answer platform inspired by Stack Overflow, built with Next.js 16, TypeScript, Appwrite, and Tailwind CSS."
        buttonText="View project"
        buttonLink="https://github.com/krishagrawal623/stackoverflow-appwrite"
        model={{
          type: 'browser',
          url: 'stackoverflow-appwrite.vercel.app',
          alt: 'IntelliQ Q&A platform dashboard',
          textures: [
            {
              src: intelliqTexture,
              srcSet: `${intelliqTexture} 800w, ${intelliqTexture} 1920w`,
              placeholder: intelliqTexture,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={2}
        title="Sentiment Analysis using BERT"
        description="An NLP system using fine-tuned BERT for sentiment classification, featuring a FastAPI backend and React frontend."
        buttonText="View website"
        buttonLink="https://bert-model.vercel.app"
        model={{
          type: 'browser',
          url: 'bert-sentiment.vercel.app',
          alt: 'Sentiment Analysis using BERT visualization',
          textures: [
            {
              src: bertSentimentTexture,
              srcSet: `${bertSentimentTexture} 800w, ${bertSentimentTexture} 1920w`,
              placeholder: bertSentimentTexture,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-3"
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={3}
        title="AI Voice Interview Coach"
        description="An AI-powered interview practice application using Streamlit, Whisper for speech transcription, and NLP tone analysis."
        buttonText="View website"
        buttonLink="https://voice-interview-bot.streamlit.app"
        model={{
          type: 'stack',
          alt: 'AI Voice Interview Coach dashboard',
          textures: [
            {
              src: voiceCoachTexture,
              srcSet: `${voiceCoachTexture} 800w, ${voiceCoachTexture} 1920w`,
              placeholder: voiceCoachTexture,
            },
          ],
        }}
      />
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  );
};
