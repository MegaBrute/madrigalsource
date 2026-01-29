import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import miguelImg from '../assets/miguel.png';
import gmImg from '../assets/gm.png';
import './Navbar.css';

const projects = [
  { id: 'boostboard', name: 'BoostBoard', siteUrl: 'https://boostboard.app/' },
  { id: 'cdclite', name: 'CDC Lite', siteUrl: 'https://cdclite.netlify.app/' },
];

function Navbar({ currentProject, onProjectChange }) {
  const [showContactCard, setShowContactCard] = useState(false);
  const [iconAnimating, setIconAnimating] = useState(false);
  const prevProject = useRef(currentProject);

  const current = projects.find(p => p.id === currentProject) || projects[0];

  useEffect(() => {
    if (prevProject.current !== currentProject) {
      setIconAnimating(true);
      const timer = setTimeout(() => {
        setIconAnimating(false);
      }, 400);
      prevProject.current = currentProject;
      return () => clearTimeout(timer);
    }
  }, [currentProject]);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button
          className="profile-cta"
          onClick={() => setShowContactCard(!showContactCard)}
        >
          <img src={miguelImg} alt="Miguel Madrigal" className="profile-img" />
          <span className="profile-name">Miguel Madrigal</span>
        </button>
      </div>

      {showContactCard && createPortal(
        <>
          <div className="contact-card-overlay" onClick={() => setShowContactCard(false)} />
          <div className="contact-card">
            <div className="contact-card-header">
              <img src={miguelImg} alt="Miguel Madrigal" className="contact-card-img" />
              <h3>Miguel Madrigal</h3>
              <img src={gmImg} alt="" className="contact-card-gm" />
            </div>
            <div className="contact-card-links">
              <a
                href="https://www.linkedin.com/in/miguel-madrigal"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                LinkedIn
              </a>
              <a
                href="https://github.com/MegaBrute"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
              <span className="contact-email">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
                </svg>
                migueloscarmadrigal@gmail.com
              </span>
            </div>
          </div>
        </>,
        document.body
      )}

      <div className="navbar-center">
        <div className="project-tabs">
          {projects.map((project) => (
            <button
              key={project.id}
              className={`project-tab ${currentProject === project.id ? 'active' : ''} ${project.comingSoon ? 'coming-soon' : ''}`}
              onClick={() => !project.comingSoon && onProjectChange(project.id)}
              disabled={project.comingSoon}
            >
              {project.name}
              {project.comingSoon && <span className="coming-soon-badge">Soon</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="navbar-right">
        {current.siteUrl && (
          <a
            href={current.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`site-link ${iconAnimating ? 'icon-swap' : ''}`}
            title={`Visit ${current.name}`}
          >
            <img
              src={`https://www.google.com/s2/favicons?domain=${new URL(current.siteUrl).hostname}&sz=32`}
              alt={current.name}
              className="site-icon"
            />
          </a>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
