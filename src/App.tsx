import React from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import Navigation from './components/Navigation/Navigation';
import Hero from './components/Hero/Hero';
import Impact from './components/Impact/Impact';
import Projects from './components/Projects/Projects';
import Timeline from './components/Timeline/Timeline';
import Skills from './components/Skills/Skills';
import Contact from './components/Contact/Contact';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <div id="hero">
          <Hero />
        </div>
        <Impact />
        <Projects />
        <Timeline />
        <Skills />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="bg-calm-dark text-white py-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-calm-light mb-2">
            © {new Date().getFullYear()} Alexandar Castaneda. Built with React + TypeScript.
          </p>
          <p className="text-xs text-calm-gray">
            Bringing calm from chaos since 2015.
          </p>
        </div>
      </footer>
    </div>
    </ErrorBoundary>
  );
};

export default App;