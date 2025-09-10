import React, { useEffect, useRef } from 'react';

const AngularWrapper: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadAngularApp = async () => {
      if (containerRef.current) {
        const appRootElement = document.createElement('app-root');
        containerRef.current.appendChild(appRootElement);
        const bootstrap = (await import('angularApp/App'))?.bootstrap;

        if (typeof bootstrap === 'function') {
          bootstrap(containerRef.current);
        } else {
          console.error('bootstrap is not a function');
        }
      }
    };

    loadAngularApp();
  }, []);

  return <div ref={containerRef}></div>;
};

export default AngularWrapper;
