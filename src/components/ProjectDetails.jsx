import './ProjectDetails.css';

const TechIcons = {
  flutter: {
    name: 'Flutter',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24">
        <path fill="#42A5F5" d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.357L14.314 0zm.014 11.072L7.857 17.53l6.47 6.47H21.7l-6.46-6.468 6.46-6.46h-7.37z"/>
        <path fill="#0D47A1" d="M7.857 17.53l3.769-3.769 3.768 3.769-3.768 3.769z"/>
        <path fill="#42A5F5" d="M7.857 17.53l3.769 3.769h7.37l-7.37-7.538z" fillOpacity=".8"/>
      </svg>
    ),
  },
  react: {
    name: 'React',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="#61DAFB">
        <circle cx="12" cy="12" r="2.5"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1" transform="rotate(120 12 12)"/>
      </svg>
    ),
  },
  mui: {
    name: 'MUI',
    icon: (
      <svg viewBox="0 0 36 36" width="24" height="24">
        <path fill="#1976D2" d="M0 18L9 12.5V23.5L0 18Z"/>
        <path fill="#42A5F5" d="M0 7L9 1.5V12.5L0 7Z"/>
        <path fill="#1976D2" d="M9 1.5L18 7V18L9 12.5V1.5Z"/>
        <path fill="#42A5F5" d="M9 12.5L18 18V29L9 23.5V12.5Z"/>
        <path fill="#1976D2" d="M18 7L27 1.5V12.5L18 18V7Z"/>
        <path fill="#42A5F5" d="M27 1.5L36 7V18L27 12.5V1.5Z"/>
        <path fill="#1976D2" d="M27 23.5L36 18V29L27 34.5V23.5Z"/>
        <path fill="#42A5F5" d="M27 12.5L36 18L27 23.5V12.5Z"/>
      </svg>
    ),
  },
  vite: {
    name: 'Vite',
    icon: (
      <svg viewBox="0 0 32 32" width="24" height="24">
        <defs>
          <linearGradient id="viteGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#41D1FF"/>
            <stop offset="100%" stopColor="#BD34FE"/>
          </linearGradient>
          <linearGradient id="viteGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFBD4F"/>
            <stop offset="100%" stopColor="#FF9800"/>
          </linearGradient>
        </defs>
        <path fill="url(#viteGrad1)" d="M29.8 6.8L16.6 29.7c-.3.5-1 .5-1.3 0L2.2 6.8c-.3-.6.1-1.3.8-1.2l13 2.2c.1 0 .2 0 .3 0l12.7-2.2c.7-.1 1.1.6.8 1.2z"/>
        <path fill="url(#viteGrad2)" d="M22.6 2L12.9 3.9c-.2 0-.3.2-.3.4l-1 9.6c0 .3.2.5.5.5l2.7-.5c.3-.1.6.2.5.5l-.8 3.9c-.1.3.2.6.5.5l1.7-.4c.3-.1.6.2.5.5l-1.2 6c-.1.4.4.7.7.4l.2-.2 7.2-14.4c.2-.3-.1-.7-.4-.6l-2.8.5c-.3.1-.6-.2-.5-.5l1.5-6.9c.1-.3-.2-.6-.5-.6z"/>
      </svg>
    ),
  },
  netlify: {
    name: 'Netlify',
    icon: (
      <svg viewBox="0 0 40 40" width="24" height="24">
        <path fill="#00C7B7" d="M23.3 20.5l-1.8-1.8c-.1-.1-.2-.1-.3-.1h-2.4c-.1 0-.2 0-.3.1l-1.8 1.8c-.1.1-.1.2-.1.3v2.4c0 .1 0 .2.1.3l1.8 1.8c.1.1.2.1.3.1h2.4c.1 0 .2 0 .3-.1l1.8-1.8c.1-.1.1-.2.1-.3v-2.4c0-.1 0-.2-.1-.3z"/>
        <path fill="#00C7B7" d="M28.2 15.4l-7.4-7.4c-.5-.5-1.3-.5-1.8 0l-1.5 1.5 2.3 2.3c.5-.2 1.1-.1 1.5.3.4.4.5 1 .3 1.5l2.2 2.2c.5-.2 1.1-.1 1.5.3.6.6.6 1.5 0 2.1-.6.6-1.5.6-2.1 0-.4-.4-.5-1-.3-1.5l-2.1-2.1v5.5c.1.1.3.2.4.3.6.6.6 1.5 0 2.1-.6.6-1.5.6-2.1 0-.6-.6-.6-1.5 0-2.1.2-.2.4-.3.6-.4v-5.6c-.2-.1-.4-.2-.6-.4-.4-.4-.5-1-.3-1.5l-2.3-2.3-6.1 6.1c-.5.5-.5 1.3 0 1.8l7.4 7.4c.5.5 1.3.5 1.8 0l7.4-7.4c.5-.5.5-1.3 0-1.8z"/>
      </svg>
    ),
  },
};

function ProjectDetails({ project }) {
  if (!project) return null;

  return (
    <div className="project-details">
      <h2 className="details-title">{project.title}</h2>

      <p className="details-description">{project.description}</p>

      <p className="details-secondary">{project.secondary}</p>

      <div className="built-with">
        <span className="built-with-label">Built with</span>
        <div className="tech-pills">
          {project.techStack.map((tech) => {
            const techData = TechIcons[tech];
            if (!techData) return null;
            return (
              <div className="tech-pill" key={tech}>
                {techData.icon}
                <span className="tech-pill-name">{techData.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      <a
        href={project.repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="open-source-btn"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        Open Source Repo
      </a>
    </div>
  );
}

export default ProjectDetails;
