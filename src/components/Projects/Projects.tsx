import React, { useState } from 'react';
import { useGitHubProjects } from '../../hooks/useGitHubProjects';
import type { GitHubProject } from '../../services/github';
import ProjectSkeleton from './ProjectSkeleton';
import { useIntersection } from '../../hooks/useIntersection';

interface ProjectCardProps {
  project: GitHubProject;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = React.memo(({ project, index }) => {
  const { ref, isIntersecting } = useIntersection({ threshold: 0.2 });


  // Format date to relative time
  const formatDate = (date: Date | undefined) => {
    if (!date) return 'Unknown';
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Updated today';
    if (days === 1) return 'Updated yesterday';
    if (days < 7) return `Updated ${days} days ago`;
    if (days < 30) return `Updated ${Math.floor(days / 7)} weeks ago`;
    if (days < 365) return `Updated ${Math.floor(days / 30)} months ago`;
    return `Updated ${Math.floor(days / 365)} years ago`;
  };

  // Get technologies from language and topics
  const technologies = (project.language ? [project.language] : []).concat(project.topics.slice(0, 3));

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`bg-white rounded-lg shadow-lg overflow-hidden border-t-4 border-chaos-blue
        transform transition-all duration-700 hover:shadow-xl h-full flex flex-col ${
        isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="p-6 flex flex-col flex-grow">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-calm-dark">{project.title}</h3>
          <div className="flex gap-2">
            {project.stars > 0 && (
              <span className="px-2 py-1 bg-calm-light text-calm-dark text-xs rounded-full flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                {project.stars}
              </span>
            )}
            {project.forks > 0 && (
              <span className="px-2 py-1 bg-calm-light text-calm-dark text-xs rounded-full flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"/>
                </svg>
                {project.forks}
              </span>
            )}
          </div>
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.slice(0, 4).map((tech, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-calm-light text-calm-dark text-xs rounded"
            >
              {tech}
            </span>
          ))}
          {technologies.length > 4 && (
            <span className="px-2 py-1 text-calm-gray text-xs">
              +{technologies.length - 4} more
            </span>
          )}
        </div>

        {/* Spacer to push footer to bottom */}
        <div className="flex-grow"></div>

        {/* Footer with links and metadata */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex gap-4">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-chaos-blue hover:underline flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
            {project.homepage && (
              <a
                href={project.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-chaos-purple hover:underline flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
                Live Demo
              </a>
            )}
          </div>
          <span className="text-xs text-calm-gray">
            Created {formatDate(project.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
});

const Projects: React.FC = () => {
  const { projects, loading, error, refetch } = useGitHubProjects();
  const [filter, setFilter] = useState<string>('all');
  const [showAll, setShowAll] = useState(false);

  // Get unique languages from all projects
  const allLanguages = Array.from(new Set(
    projects.map(p => p.language).filter((lang): lang is string => lang !== null && lang !== undefined)
  )).sort();

  // Filter projects based on selected filter
  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true;
    return project.language === filter;
  });

  // Limit projects shown initially
  const projectsToShow = showAll ? filteredProjects : filteredProjects.slice(0, 9);

  // Show skeleton loading state
  if (loading && projects.length === 0) {
    return (
      <section id="projects" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-calm-dark mb-4">
              My Public Repos
            </h2>
            <p className="text-lg text-calm-gray max-w-2xl mx-auto">
              Loading projects from GitHub...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <ProjectSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error && projects.length === 0) {
    return (
      <section id="projects" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-calm-dark mb-4">
              My Public Repos
            </h2>
            <p className="text-lg text-red-500 max-w-2xl mx-auto mb-4">
              Failed to load projects: {error}
            </p>
            <button
              onClick={() => refetch()}
              className="px-6 py-2 bg-calm-dark text-white rounded-lg hover:bg-chaos-purple transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-calm-dark mb-8">
            My Public Repos
          </h2>

          {/* Filter buttons */}
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'all'
                  ? 'bg-calm-dark text-white'
                  : 'bg-calm-light text-calm-dark hover:bg-calm-gray hover:text-white'
              }`}
            >
              All ({projects.length})
            </button>

            {/* Language-based filters */}
            {allLanguages.map(language => (
              <button
                key={language}
                onClick={() => setFilter(language)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === language
                    ? 'bg-calm-dark text-white'
                    : 'bg-calm-light text-calm-dark hover:bg-calm-gray hover:text-white'
                }`}
              >
                {language} ({projects.filter(p => p.language === language).length})
              </button>
            ))}
          </div>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsToShow.length > 0 ? (
            projectsToShow.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))
          ) : (
            <div className="col-span-full text-center text-calm-gray">
              No projects found in this category.
            </div>
          )}
        </div>

        {/* See More button */}
        {!showAll && filteredProjects.length > 9 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(true)}
              className="px-6 py-3 bg-calm-dark text-white rounded-lg hover:bg-chaos-purple transition-colors"
            >
              See More ({filteredProjects.length - 9} more projects)
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;