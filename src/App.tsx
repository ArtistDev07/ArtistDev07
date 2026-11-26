import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import RegisterPage from './components/RegisterPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(
    typeof window !== 'undefined' ? window.location.pathname || '/' : '/'
  );

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (path: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (currentPath === '/register' || currentPath === '/commission') {
    return <RegisterPage onNavigate={handleNavigate} />;
  }

  return <LandingPage onNavigate={handleNavigate} />;
}
