export interface Skill {
  name: string;
  years: number;
  category: 'frontend' | 'backend' | 'tools' | 'exploring';
  proficiency: 'expert' | 'advanced' | 'intermediate' | 'learning';
}

export const skills: Skill[] = [
  // Frontend - sorted by years descending
  { name: 'JavaScript', years: 8, category: 'frontend', proficiency: 'expert' },
  { name: 'CSS/Tailwind', years: 8, category: 'frontend', proficiency: 'advanced' },
  { name: 'React', years: 7, category: 'frontend', proficiency: 'expert' },
  { name: 'TypeScript', years: 6, category: 'frontend', proficiency: 'expert' },
  { name: 'Redux', years: 6, category: 'frontend', proficiency: 'expert' },
  { name: 'React Native', years: 5, category: 'frontend', proficiency: 'expert' },
  { name: 'Next.js', years: 2, category: 'frontend', proficiency: 'intermediate' },

  // Backend - sorted by years descending
  { name: 'Node.js', years: 7, category: 'backend', proficiency: 'expert' },
  { name: 'Express', years: 6, category: 'backend', proficiency: 'expert' },
  { name: 'PostgreSQL', years: 6, category: 'backend', proficiency: 'advanced' },
  { name: 'NestJS', years: 4, category: 'backend', proficiency: 'expert' },
  { name: 'GraphQL', years: 4, category: 'backend', proficiency: 'advanced' },
  { name: 'MongoDB', years: 4, category: 'backend', proficiency: 'advanced' },
  { name: 'Redis', years: 3, category: 'backend', proficiency: 'intermediate' },
  { name: 'Koa', years: 2, category: 'backend', proficiency: 'intermediate' },

  // Tools & DevOps - sorted by years descending
  { name: 'Git', years: 8, category: 'tools', proficiency: 'expert' },
  { name: 'Jest', years: 5, category: 'tools', proficiency: 'expert' },
  { name: 'CI/CD', years: 5, category: 'tools', proficiency: 'advanced' },
  { name: 'Docker', years: 4, category: 'tools', proficiency: 'advanced' },
  { name: 'AWS', years: 3, category: 'tools', proficiency: 'intermediate' },
  { name: 'GitHub Actions', years: 3, category: 'tools', proficiency: 'intermediate' },

  // Exploring - all have same years, keeping original order
  { name: 'Blockchain/Web3', years: 1, category: 'exploring', proficiency: 'learning' },
  { name: 'AI/ML Integration', years: 1, category: 'exploring', proficiency: 'learning' },
  { name: 'Rust', years: 1, category: 'exploring', proficiency: 'learning' },
  { name: 'Move Language', years: 1, category: 'exploring', proficiency: 'learning' },
];

export const skillCategories = {
  frontend: 'Frontend',
  backend: 'Backend',
  tools: 'Tools & DevOps',
  exploring: 'Currently Exploring'
};