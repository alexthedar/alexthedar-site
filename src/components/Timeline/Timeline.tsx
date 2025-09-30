import React from 'react';
import { experiences } from '../../data/experience';
import { useIntersection } from '../../hooks/useIntersection';

interface TimelineNodeProps {
  experience: typeof experiences[0];
  index: number;
  isLast: boolean;
}

const TimelineNode: React.FC<TimelineNodeProps> = ({ experience, index, isLast }) => {
  const { ref, isIntersecting } = useIntersection({ threshold: 0.2 });
  const isLeft = index % 2 === 0;

  // Color gradient from purple (film) to blue (tech) based on index
  const nodeColor = index === 0
    ? 'bg-chaos-purple'
    : index === experiences.length
    ? 'bg-chaos-blue'
    : 'bg-gradient-to-r from-chaos-purple to-chaos-blue';

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`relative flex items-center ${
        isLeft ? 'md:flex-row-reverse' : ''
      } mb-12 md:mb-16`}
    >
      {/* Content */}
      <div
        className={`w-full md:w-1/2 ${
          isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'
        } transform transition-all duration-700 ${
          isIntersecting ? 'translate-x-0 opacity-100' : `${
            isLeft ? 'translate-x-8' : '-translate-x-8'
          } opacity-0`
        }`}
      >
        <div className={`bg-white rounded-lg shadow-lg p-6 ${
          isLeft ? 'md:ml-auto md:text-left' : 'md:mr-auto md:text-right'
        } max-w-md`}>
          <div className="mb-2">
            <h3 className="text-xl font-bold text-calm-dark">{experience.company}</h3>
            <p className="text-chaos-blue font-medium">{experience.role}</p>
          </div>

          <p className="text-sm text-calm-gray mb-3">
            {experience.period} • {experience.location}
          </p>

          <ul className="text-sm text-calm-dark space-y-1">
            {experience.achievements.slice(0, 2).map((achievement, i) => (
              <li key={i}>
                • {achievement}
              </li>
            ))}
          </ul>

          <div className={`flex flex-wrap gap-1 mt-3 ${
            isLeft ? 'md:justify-start' : 'md:justify-end'
          }`}>
            {experience.technologies.slice(0, 3).map((tech, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-calm-light text-calm-dark text-xs rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Line & Node */}
      <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 flex flex-col items-center">
        <div
          className={`w-4 h-4 ${nodeColor} rounded-full ring-4 ring-white z-10 transition-all duration-700 ${
            isIntersecting ? 'scale-100' : 'scale-0'
          }`}
        />
        {!isLast && (
          <div className="w-0.5 h-24 md:h-32 bg-gradient-to-b from-chaos-purple to-chaos-blue opacity-30" />
        )}
      </div>

      {/* Year indicator */}
      <div
        className={`absolute left-16 md:left-1/2 transform md:-translate-x-1/2 -translate-y-8 ${
          isIntersecting ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-700`}
      >
        <span className="px-3 py-1 bg-white text-calm-gray text-xs rounded-full shadow">
          {experience.period.match(/\d{4}/)?.[0] || ''}
        </span>
      </div>
    </div>
  );
};

const Timeline: React.FC = () => {
  // Add film school as the starting point and reverse order (oldest first)
  const fullTimeline = [
    {
      id: 'ucla',
      company: 'UCLA',
      role: 'B.F.A. & M.F.A. Film/Theater',
      period: '1991 – 2007',
      location: 'Los Angeles, CA',
      achievements: [
        'Studied storytelling, narrative structure, and visual composition',
        'Developed creative problem-solving and project management skills'
      ],
      technologies: ['Film', 'Theater', 'Storytelling'] as string[]
    },
    ...experiences.slice().reverse()
  ];

  return (
    <section id="timeline" className="py-20 px-6 bg-gradient-to-b from-calm-light to-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-calm-dark mb-4">
            From Film to Full-Stack
          </h2>
          <p className="text-lg text-calm-gray max-w-2xl mx-auto">
            A unique journey bringing creative storytelling to technical excellence
          </p>
        </div>

        {/* Journey summary at the top */}
        <div className="text-center mb-16 p-8 bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
          <p className="text-lg text-calm-gray">
            <span className="text-chaos-purple font-bold">2007:</span> Film & Theater →{' '}
            <span className="text-chaos-amber font-bold">2015:</span> Code School →{' '}
            <span className="text-chaos-blue font-bold">2025:</span> Senior Engineer
          </p>
          <p className="mt-2 text-sm text-calm-gray">
            Bringing narrative clarity to complex systems for over 8 years
          </p>
        </div>

        <div className="relative">
          {/* Gradient line background (mobile) */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-chaos-purple via-purple-500 to-chaos-blue opacity-20 md:hidden" />

          {/* Timeline nodes */}
          {fullTimeline.map((exp, index) => (
            <TimelineNode
              key={exp.id}
              experience={exp}
              index={index}
              isLast={index === fullTimeline.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;