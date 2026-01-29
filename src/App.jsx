import { useState, useRef } from 'react';
import Navbar from './components/Navbar';
import ImageCarousel from './components/ImageCarousel';
import ProjectDetails from './components/ProjectDetails';
import './App.css';

// Project configurations
export const projects = {
  boostboard: {
    id: 'boostboard',
    name: 'BoostBoard',
    siteUrl: 'https://boostboard.app/',
    theme: 'green',
    title: 'BoostBoard',
    description: 'Lightweight presence boards for sharing multiple links on dedicated pages. Live avatars, activity state, and frictionless chat keep collaborators in sync.',
    secondary: 'Share up to 5 links per board with real-time presence.',
    techStack: ['react', 'mui', 'vite', 'netlify'],
    repoUrl: 'https://github.com/MegaBrute',
  },
  cdclite: {
    id: 'cdclite',
    name: 'CDC Lite',
    siteUrl: 'https://cdclite.netlify.app/',
    theme: 'blue',
    title: 'CDC Lite',
    description: 'A lightweight, interactive visualization of CDC health data across US states and territories. Explore disease statistics with an intuitive map interface.',
    secondary: 'View health metrics by region with filtering and detailed breakdowns.',
    techStack: ['flutter', 'netlify'],
    repoUrl: 'https://github.com/MegaBrute',
  },
};

function App() {
  const [currentProject, setCurrentProject] = useState('boostboard');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState('left');
  const pendingProject = useRef(null);
  const project = projects[currentProject];

  const projectKeys = Object.keys(projects);

  const handleProjectChange = (newProject) => {
    if (newProject === currentProject || isTransitioning) return;

    const currentIndex = projectKeys.indexOf(currentProject);
    const newIndex = projectKeys.indexOf(newProject);
    setTransitionDirection(newIndex > currentIndex ? 'left' : 'right');

    pendingProject.current = newProject;
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentProject(newProject);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 300);
  };

  return (
    <div className={`app theme-${project.theme}`}>
      <Navbar currentProject={currentProject} onProjectChange={handleProjectChange} />
      <main className="main-content">
        <div className={`content-wrapper ${isTransitioning ? `transitioning-${transitionDirection}` : ''}`}>
          <ImageCarousel project={currentProject} />
          <ProjectDetails project={project} />
        </div>
      </main>
    </div>
  );
}

export default App;
