import usesBackgroundPlaceholder from '~/assets/uses-background-placeholder.jpg';
import usesBackground from '~/assets/uses-background.mp4';
import { Footer } from '~/components/footer';
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectSection,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from '~/layouts/project';
import { baseMeta } from '~/utils/meta';
import styles from './uses.module.css';

import {
  SiNextdotjs, SiReact, SiTypescript, SiJavascript, SiTailwindcss, SiFramer,
  SiNodedotjs, SiExpress, SiAppwrite, SiPython, SiCplusplus, SiPytorch,
  SiHuggingface, SiStreamlit, SiScikitlearn, SiPandas, SiNumpy,
  SiFlask, SiMongodb, SiMysql, SiPrisma, SiGit, SiGithub,
  SiPostman, SiDocker, SiNpm, SiVercel, SiGithubactions,
  SiGoogle
} from 'react-icons/si';

import {
  FaJava, FaMagic, FaBrain, FaRobot, FaProjectDiagram, FaCubes,
  FaDatabase, FaSearch, FaCloud, FaLink, FaAws, FaCode,
  FaGraduationCap, FaAward, FaBriefcase, FaUsers
} from 'react-icons/fa';

import { TbApi, TbSparkles } from 'react-icons/tb';
import { BsLayersHalf } from 'react-icons/bs';

export const meta = () => {
  return baseMeta({
    title: 'Uses',
    description: 'A list of hardware and software I use to do my thing',
  });
};

const webDevTools = [
  { name: 'Next.js', icon: SiNextdotjs, desc: 'Production React framework with App Router and Server Components.', badge: 'Daily' },
  { name: 'React', icon: SiReact, desc: 'Modern component-based UI development.', badge: 'Daily' },
  { name: 'TypeScript', icon: SiTypescript, desc: 'Strictly typed JavaScript for robust codebases.', badge: 'Daily' },
  { name: 'JavaScript', icon: SiJavascript, desc: 'Core dynamic web scripting language.' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, desc: 'Utility-first utility styling framework.', badge: 'Daily' },
  { name: 'Framer Motion', icon: SiFramer, desc: 'Fluid layout and gesture animations.' },
  { name: 'Magic UI', icon: FaMagic, desc: 'Modern, high-performance UI components.', badge: 'Favorite' },
  { name: 'Zustand', icon: BsLayersHalf, desc: 'Simplistic state management for React.' },
  { name: 'Node.js', icon: SiNodedotjs, desc: 'JavaScript runtime built on Chrome V8 engine.', badge: 'Backend' },
  { name: 'Express.js', icon: SiExpress, desc: 'Minimalist web application framework for Node.', badge: 'Backend' },
  { name: 'Appwrite', icon: SiAppwrite, desc: 'Secure backend-as-a-service provider.', badge: 'Backend' },
  { name: 'REST APIs', icon: TbApi, desc: 'Clean, robust stateless endpoint architectures.', badge: 'Backend' }
];

const aiMlTools = [
  { name: 'Python', icon: SiPython, desc: 'Primary language for ML, scripting, and data.', badge: 'Daily' },
  { name: 'C++', icon: SiCplusplus, desc: 'Optimized performance for backend/algorithms.' },
  { name: 'Java', icon: FaJava, desc: 'Object-oriented software development.' },
  { name: 'PyTorch', icon: SiPytorch, desc: 'Deep learning framework for neural networks.', badge: 'AI' },
  { name: 'Hugging Face', icon: SiHuggingface, desc: 'Pre-trained transformer models & pipelines.', badge: 'AI' },
  { name: 'OpenAI Whisper', icon: FaBrain, desc: 'Advanced automatic speech recognition.', badge: 'AI' },
  { name: 'Streamlit', icon: SiStreamlit, desc: 'Rapid interactive dashboard application tool.' },
  { name: 'Scikit-learn', icon: SiScikitlearn, desc: 'Data mining, preprocessing, and machine learning.' },
  { name: 'Pandas', icon: SiPandas, desc: 'Data structures & analytics library.' },
  { name: 'NumPy', icon: SiNumpy, desc: 'Vectorized computing and multi-dimensional matrices.' },
  { name: 'Flask', icon: SiFlask, desc: 'Python micro web framework for REST interfaces.' },
  { name: 'NLP', icon: FaBrain, desc: 'Natural Language Processing and text utilities.', badge: 'AI' },
  { name: 'BERT', icon: SiGoogle, desc: 'Pre-trained NLP model for advanced text analysis.', badge: 'AI' }
];

const databaseTools = [
  { name: 'MongoDB', icon: SiMongodb, desc: 'NoSQL document store for JSON-like data.' },
  { name: 'MySQL', icon: SiMysql, desc: 'Relational database management system.' },
  { name: 'Oracle SQL', icon: FaDatabase, desc: 'Enterprise relational database systems.' },
  { name: 'Prisma ORM', icon: SiPrisma, desc: 'Next-generation type-safe Node/TS ORM.', badge: 'Favorite' }
];

const devTools = [
  { name: 'Git', icon: SiGit, desc: 'Distributed version control system.' },
  { name: 'GitHub', icon: SiGithub, desc: 'Collaborative development pipeline & hosting.', badge: 'Daily' },
  { name: 'VS Code', icon: FaCode, desc: 'Extensible, lightweight source code editor.', badge: 'Daily' },
  { name: 'Postman', icon: SiPostman, desc: 'API building, mocking, and request testing.', badge: 'Daily' },
  { name: 'Docker', icon: SiDocker, desc: 'Isolated system containerization environment.' },
  { name: 'npm', icon: SiNpm, desc: 'Package ecosystem package management.', badge: 'Daily' },
  { name: 'Vercel', icon: SiVercel, desc: 'Front-end deployment platform.', badge: 'Production' },
  { name: 'Render', icon: FaCloud, desc: 'Cloud application server hosting.' },
  { name: 'GitHub Actions', icon: SiGithubactions, desc: 'Automated CI/CD workflow pipelines.' },
  { name: 'AWS', icon: FaAws, desc: 'Amazon Web Services cloud computing suite.' }
];

const exploringTools = [
  { name: 'LLMs', icon: FaBrain, desc: 'Fine-tuning & prompting large language models.', badge: 'Learning' },
  { name: 'RAG', icon: FaSearch, desc: 'Retrieval-Augmented Generation architectures.', badge: 'Learning' },
  { name: 'AI Agents', icon: FaRobot, desc: 'Multi-agent reasoning and decision loops.', badge: 'Learning' },
  { name: 'LangChain', icon: FaLink, desc: 'Orchestrating workflows around language models.', badge: 'Learning' },
  { name: 'Vector DBs', icon: FaDatabase, desc: 'High-dimensional semantic embeddings search.', badge: 'Learning' },
  { name: 'Advanced System Design', icon: FaProjectDiagram, desc: 'Architecting fault-tolerant microservices.', badge: 'Learning' },
  { name: 'AWS Cloud', icon: FaAws, desc: 'Advanced hosting and infrastructure as code.', badge: 'Learning' },
  { name: 'Microservices', icon: FaCubes, desc: 'Decoupled, independently scalable service nodes.', badge: 'Learning' },
  { name: 'Generative AI', icon: TbSparkles, desc: 'Stable Diffusion, prompt flows, and transformer networks.', badge: 'Learning' }
];

const educationExperience = [
  {
    name: 'University & Degree',
    icon: FaGraduationCap,
    desc: 'MIT ADT University, Pune. Bachelor of Technology in Computer Science (School of Computing) (2023 – 2027).',
    badge: 'MIT ADT'
  },
  {
    name: 'Academic Performance',
    icon: FaAward,
    desc: 'Maintained a cumulative CGPA of 8.69 / 10 throughout my engineering coursework.',
    badge: 'CGPA: 8.69'
  },
  {
    name: 'Internship Experience',
    icon: FaBriefcase,
    desc: 'AI & Data Analytics Intern at AICTE, Shell India, and Edunet Foundation.',
    badge: 'Internship'
  },
  {
    name: 'Community Leadership',
    icon: FaUsers,
    desc: 'Core Tech Team Member at GeeksforGeeks Student Chapter.',
    badge: 'GeeksforGeeks'
  }
];

const TechCard = ({ name, icon: Icon, desc, badge, isExploring }) => (
  <div className={isExploring ? styles.exploringCard : styles.techCard}>
    <div className={styles.cardHeader}>
      <div className={styles.iconWrapper}>
        <Icon className={styles.techIcon} />
      </div>
      {badge && <span className={styles.badge} data-type={badge}>{badge}</span>}
    </div>
    <div className={styles.cardContent}>
      <h4 className={styles.cardTitle}>{name}</h4>
      {desc && <p className={styles.cardDescription}>{desc}</p>}
    </div>
  </div>
);

export const Uses = () => {
  return (
    <>
      <ProjectContainer className={styles.uses}>
        <ProjectBackground
          src={usesBackground}
          placeholder={usesBackgroundPlaceholder}
          opacity={0.7}
        />
        <ProjectHeader
          title="Uses"
          description="A somewhat comprehensive list of tools, apps, hardware, and more that I use on a daily basis to design and code things. And yeah, that is a Johnny Mnemonic GIF in the background."
        />

        {/* 1. Web Development & Backend */}
        <ProjectSection padding="none" className={styles.section}>
          <ProjectSectionContent>
            <ProjectTextRow stretch width="l">
              <ProjectSectionHeading>Web Development & Backend</ProjectSectionHeading>
              <ProjectSectionText>
                Build scalable, responsive, and performance-focused full-stack web applications using modern JavaScript technologies. Experienced with frontend architecture, backend APIs, authentication, databases, and cloud deployment.
              </ProjectSectionText>
              <div className={styles.techGrid}>
                {webDevTools.map(tool => (
                  <TechCard key={tool.name} {...tool} />
                ))}
              </div>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>

        {/* 2. Artificial Intelligence & Machine Learning */}
        <ProjectSection padding="none" className={styles.section}>
          <ProjectSectionContent>
            <ProjectTextRow stretch width="l">
              <ProjectSectionHeading>Artificial Intelligence & Machine Learning</ProjectSectionHeading>
              <ProjectSectionText>
                Develop AI-powered applications with a focus on Natural Language Processing, speech analysis, transformer models, and machine learning pipelines using Python and modern AI frameworks.
              </ProjectSectionText>
              <div className={styles.techGrid}>
                {aiMlTools.map(tool => (
                  <TechCard key={tool.name} {...tool} />
                ))}
              </div>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>

        {/* 3. Databases */}
        <ProjectSection padding="none" className={styles.section}>
          <ProjectSectionContent>
            <ProjectTextRow stretch width="l">
              <ProjectSectionHeading>Databases</ProjectSectionHeading>
              <ProjectSectionText>
                Store, retrieve, and manage data efficiently using relational and non-relational database management systems and ORMs.
              </ProjectSectionText>
              <div className={styles.techGrid}>
                {databaseTools.map(tool => (
                  <TechCard key={tool.name} {...tool} />
                ))}
              </div>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>

        {/* 4. Development Tools */}
        <ProjectSection padding="none" className={styles.section}>
          <ProjectSectionContent>
            <ProjectTextRow stretch width="l">
              <ProjectSectionHeading>Development Tools</ProjectSectionHeading>
              <ProjectSectionText>
                Optimize development workflow, testing, containerization, and automated deployments.
              </ProjectSectionText>
              <div className={styles.techGrid}>
                {devTools.map(tool => (
                  <TechCard key={tool.name} {...tool} />
                ))}
              </div>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>

        {/* 5. Currently Exploring */}
        <ProjectSection padding="none" className={styles.section}>
          <ProjectSectionContent>
            <ProjectTextRow stretch width="l">
              <ProjectSectionHeading>Currently Exploring</ProjectSectionHeading>
              <ProjectSectionText>
                Technologies and architectures I’m actively learning and exploring to expand my engineering capabilities.
              </ProjectSectionText>
              <div className={styles.techGrid}>
                {exploringTools.map(tool => (
                  <TechCard key={tool.name} isExploring {...tool} />
                ))}
              </div>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>

        {/* Highlighted Engineering Focus */}
        <ProjectSection padding="none" className={styles.section}>
          <ProjectSectionContent>
            <ProjectTextRow stretch width="l">
              <div className={styles.engineeringFocus}>
                <h3 className={styles.focusTitle}>Engineering Focus</h3>
                <p className={styles.focusText}>
                  I enjoy building AI-powered full-stack applications that combine modern web technologies with machine learning. My interests include Artificial Intelligence, Natural Language Processing, scalable backend systems, developer tools, and creating clean, performant user experiences. I continuously explore new technologies while focusing on writing maintainable, production-ready software.
                </p>
              </div>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>

        {/* 6. Education & Experience */}
        <ProjectSection padding="none" className={styles.section}>
          <ProjectSectionContent>
            <ProjectTextRow stretch width="l">
              <ProjectSectionHeading>Education & Experience</ProjectSectionHeading>
              <ProjectSectionText>
                My academic journey, professional internship milestones, and technical community leadership roles.
              </ProjectSectionText>
              <div className={styles.techGrid}>
                {educationExperience.map(item => (
                  <TechCard key={item.name} {...item} />
                ))}
              </div>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </>
  );
};
