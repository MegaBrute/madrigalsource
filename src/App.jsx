import { useState, useRef } from 'react';
import Navbar from './components/Navbar';
import ImageCarousel from './components/ImageCarousel';
import ProjectDetails from './components/ProjectDetails';
import projects from './data/projects';
import './App.css';
import gmImg from './assets/gm.png';

function App() {
  const exitDurationMs = 300;
  const enterDurationMs = 400;
  const overlayFadeMs = 200;
  const storageKey = 'madrigal:currentProject';
  const splashKey = 'madrigal:gmSplashShown';
  const [currentProject, setCurrentProject] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved && projects[saved] ? saved : 'boostboard';
    } catch {
      return 'boostboard';
    }
  });
  const [nextTheme, setNextTheme] = useState(null);
  const [transitionPhase, setTransitionPhase] = useState('idle');
  const [showSplash, setShowSplash] = useState(() => {
    try {
      return !localStorage.getItem(splashKey);
    } catch {
      return true;
    }
  });
  const [splashNonce, setSplashNonce] = useState(0);
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
    setNextTheme(projects[newProject]?.theme || null);
    setTransitionPhase('in');
    setShouldAnimate(false);

    pendingProject.current = newProject;
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentProject(newProject);
      try {
        localStorage.setItem(storageKey, newProject);
      } catch {
        // Ignore persistence errors (private mode, disabled storage, etc.)
      }
      setIsTransitioning(false);
      setShouldAnimate(true);
      setTransitionPhase('out');
      setTimeout(() => {
        setShouldAnimate(false);
      }, enterDurationMs);
      setTimeout(() => {
        setNextTheme(null);
        setTransitionPhase('idle');
      }, overlayFadeMs);
    }, exitDurationMs);
  };

  const getWrapperClass = () => {
    if (isTransitioning) return `content-wrapper transitioning-${transitionDirection}`;
    if (shouldAnimate) return 'content-wrapper animate-in';
    return 'content-wrapper';
  };

  const handleSplashEnd = () => {
    setShowSplash(false);
    try {
      localStorage.setItem(splashKey, 'true');
    } catch {
      // Ignore persistence errors (private mode, disabled storage, etc.)
    }
  };

  const triggerSplash = () => {
    setShowSplash(true);
    setSplashNonce((prev) => prev + 1);
  };

  return (
    <div className={`app theme-${project.theme}`}>
      <div
        className={`theme-transition ${nextTheme ? `theme-${nextTheme}` : ''} ${isTransitioning ? `phase-${transitionPhase}` : ''}`}
        aria-hidden="true"
      />
      {showSplash && (
        <div className="gm-splash" onAnimationEnd={handleSplashEnd} key={splashNonce}>
          <img
            src={gmImg}
            alt="Graffiti welcome"
            className="gm-splash-img"
            onClick={triggerSplash}
          />
        </div>
      )}
      <Navbar
        currentProject={currentProject}
        onProjectChange={handleProjectChange}
        onTriggerSplash={triggerSplash}
      />
      <main className="main-content">
        <div className={getWrapperClass()} key={currentProject}>
          <ImageCarousel project={currentProject} />
          <ProjectDetails project={project} />
        </div>
      </main>
    </div>
  );
}

export default App;
