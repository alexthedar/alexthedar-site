export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  achievements: string[];
  technologies: string[];
  keyMetric?: {
    before: string;
    after: string;
    description: string;
  };
}

export const experiences: Experience[] = [
  {
    id: 'hinge-health',
    company: 'Hinge Health',
    role: 'Senior Software Engineer',
    period: 'Dec 2022 – May 2025',
    location: 'Remote',
    achievements: [
      'Led multiple project teams (2–4 devs) using NestJS, Redis, GraphQL, REST, React Native, Redux, and TypeScript',
      'Boosted engagement 30%, reduced dev overhead, and enabled same-day updates by moving business logic server-side',
      'Designed a schema-driven NestJS microservice with REST APIs to enable product-owned UI'
    ],
    technologies: ['NestJS', 'Redis', 'GraphQL', 'REST', 'React Native', 'Redux', 'TypeScript'],
    keyMetric: {
      before: 'Baseline',
      after: '+30%',
      description: 'Engagement Boost'
    }
  },
  {
    id: 'lessen',
    company: 'Lessen',
    role: 'Backend Engineer',
    period: 'May 2022 – Dec 2022',
    location: 'Remote',
    achievements: [
      'Led development of a Koa and TypeScript BFF microservice with Kafka integration',
      'Built unit and integration tests with Jest, increasing code coverage from under 40% to over 90%',
      'Set up CI/CD pipeline to automate builds and deployments'
    ],
    technologies: ['Koa', 'TypeScript', 'Kafka', 'Jest', 'CI/CD'],
    keyMetric: {
      before: '40%',
      after: '90%',
      description: 'Test Coverage'
    }
  },
  {
    id: 'hinge-health-2',
    company: 'Hinge Health',
    role: 'Senior Software Engineer',
    period: 'Aug 2019 – May 2022',
    location: 'Remote',
    achievements: [
      'Built BFF APIs with NestJS, GraphQL, and REST',
      'Created a motion-tracking prototype using React Native and OpenCV',
      'Helped define company-wide spike workflows, ticket structures, and sprint planning'
    ],
    technologies: ['NestJS', 'GraphQL', 'REST', 'React Native', 'OpenCV']
  },
  {
    id: 'moovel',
    company: 'Moovel NA',
    role: 'Software Engineer',
    period: 'Jul 2018 – Aug 2019',
    location: 'Portland, OR',
    achievements: [
      'Built a React and Redux tool that ingested CSVs and used REST APIs and SQL to update client account data',
      'Cut fare change turnaround from ~1 month to 1 day by shifting control to product',
      'Refactored global state to Redux for better maintainability'
    ],
    technologies: ['React', 'Redux', 'REST', 'SQL'],
    keyMetric: {
      before: '30 days',
      after: '1 day',
      description: 'Turnaround Time'
    }
  },
  {
    id: 'jaguar',
    company: 'Jaguar Land Rover',
    role: 'Frontend Developer',
    period: 'Mar 2018 – May 2018',
    location: 'Portland, OR',
    achievements: [
      'Built a React frontend for an experimental in-car touchscreen app',
      'Integrated Google Maps and other APIs',
      'Collaborated directly with designer and PM to deliver location-aware UX'
    ],
    technologies: ['React', 'Node.js', 'Google Maps API']
  }
];