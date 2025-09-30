export const PERSONAL_INFO = {
  name: 'Alex Castaneda',
  email: 'alexthedar@gmail.com',
  phone: '310-895-0240',
  phoneFormatted: '+13108950240',
  github: 'alexthedar',
  githubUrl: 'https://github.com/alexthedar',
  linkedin: 'alexandarcastaneda',
  linkedinUrl: 'https://www.linkedin.com/in/alexandarcastaneda',
  location: 'Portland, OR',
  remote: true,
  status: 'Available'
} as const;

export const CONTACT_LINKS = {
  email: `mailto:${PERSONAL_INFO.email}`,
  phone: `tel:${PERSONAL_INFO.phoneFormatted}`,
  github: PERSONAL_INFO.githubUrl,
  linkedin: PERSONAL_INFO.linkedinUrl,
  location: `https://www.google.com/maps/search/${encodeURIComponent(PERSONAL_INFO.location)}`
} as const;