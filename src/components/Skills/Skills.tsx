import React from 'react';
import { skills, skillCategories } from '../../data/skills';
import { useIntersection } from '../../hooks/useIntersection';

interface SkillItemProps {
  skill: typeof skills[0];
}

const SkillItem: React.FC<SkillItemProps> = React.memo(({ skill }) => {
  // Calculate width based on years with scaled progression
  const getBarWidth = (years: number) => {
    if (years >= 7) return 'w-full';
    if (years >= 5) return 'w-5/6';
    if (years >= 3) return 'w-2/3';
    if (years >= 2) return 'w-1/2';
    return 'w-2/5';
  };

  // Color intensity based on years - all positive/professional colors
  const getBarColor = (years: number) => {
    if (years >= 7) return 'bg-chaos-blue';
    if (years >= 5) return 'bg-chaos-purple';
    if (years >= 3) return 'bg-calm-dark opacity-80';
    return 'bg-calm-dark opacity-60';
  };

  return (
    <div className="group">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-calm-dark">
          {skill.name}
        </span>
        <span className="text-xs text-calm-gray">
          {skill.years} {skill.years === 1 ? 'year' : 'years'}
        </span>
      </div>
      <div className="h-1.5 bg-calm-light rounded-full overflow-hidden">
        <div
          className={`h-full ${getBarColor(skill.years)} ${getBarWidth(skill.years)}
            transition-all duration-1000 ease-out`}
        />
      </div>
    </div>
  );
});

SkillItem.displayName = 'SkillItem';

interface SkillCategoryProps {
  category: keyof typeof skillCategories;
  categorySkills: typeof skills;
  index: number;
}

const SkillCategory: React.FC<SkillCategoryProps> = ({ category, categorySkills, index }) => {
  const { ref, isIntersecting } = useIntersection({ threshold: 0.2 });

  const categoryIcons = {
    frontend: (
      <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
      </svg>
    ),
    backend: (
      <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>
      </svg>
    ),
    tools: (
      <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
      </svg>
    ),
    exploring: (
      <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M13 10V3L4 14h7v7l9-11h-7z"></path>
      </svg>
    ),
  };

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`bg-white rounded-lg shadow-lg p-6 transform transition-all duration-700 ${
        isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-calm-light rounded-lg text-chaos-blue">
          {categoryIcons[category]}
        </div>
        <h3 className="text-xl font-bold text-calm-dark">{skillCategories[category]}</h3>
      </div>

      <div className="space-y-4">
        {categorySkills.map((skill, i) => (
          <SkillItem key={i} skill={skill} />
        ))}
      </div>
    </div>
  );
};

const Skills: React.FC = () => {
  const categories = Object.keys(skillCategories) as (keyof typeof skillCategories)[];

  return (
    <section id="skills" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-calm-dark mb-4">
            Technical Arsenal
          </h2>
          <p className="text-lg text-calm-gray max-w-2xl mx-auto">
            8+ years of building with modern technologies. Always learning, always improving.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <SkillCategory
              key={category}
              category={category}
              categorySkills={skills.filter(s => s.category === category)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;