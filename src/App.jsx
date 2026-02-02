import { useState, useRef } from 'react';
import Navbar from './components/Navbar';
import ImageCarousel from './components/ImageCarousel';
import ProjectDetails from './components/ProjectDetails';
import projects from './data/projects';
import './App.css';

function App() {
  const storageKey = 'madrigal:currentProject';
  const [currentProject, setCurrentProject] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved && projects[saved] ? saved : 'boostboard';
    } catch {
      return 'boostboard';
    }
  });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
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
      try {
        localStorage.setItem(storageKey, newProject);
      } catch {
        // Ignore persistence errors (private mode, disabled storage, etc.)
      }
      setShouldAnimate(true);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 300);
  };

  const getWrapperClass = () => {
    if (isTransitioning) return `content-wrapper transitioning-${transitionDirection}`;
    if (shouldAnimate) return 'content-wrapper animate-in';
    return 'content-wrapper';
  };

  return (
    <div className={`app theme-${project.theme}`}>
      <Navbar currentProject={currentProject} onProjectChange={handleProjectChange} />
      <main className="main-content">
        <div className={getWrapperClass()}>
          <ImageCarousel project={currentProject} />
          <ProjectDetails project={project} />
        </div>
      </main>
    </div>
  );
}

export default App;
