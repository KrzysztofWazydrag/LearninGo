export interface LearningPath {
  id: string;
  title: string;
  description: string;
  totalModules: number;
  completedModules: number;
  estimatedHours: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
}

export interface StudySession {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  completed: boolean;
  progress: number; // 0-100
  resources: Resource[];
}

export interface Resource {
  id: string;
  title: string;
  type: 'video' | 'article' | 'lab' | 'quiz';
  url: string;
  duration?: string;
  free: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  category: 'streak' | 'completion' | 'skill' | 'time';
}

export const cybersecurityLearningPaths: LearningPath[] = [
  {
    id: 'owasp-fundamentals',
    title: 'OWASP Top 10 Fundamentals',
    description: 'Master the most critical web application security risks',
    totalModules: 10,
    completedModules: 3,
    estimatedHours: 25,
    difficulty: 'Beginner',
    category: 'Web Security',
  },
  {
    id: 'network-security',
    title: 'Network Security Essentials',
    description: 'Learn network protocols, firewalls, and intrusion detection',
    totalModules: 8,
    completedModules: 1,
    estimatedHours: 30,
    difficulty: 'Intermediate',
    category: 'Network Security',
  },
  {
    id: 'penetration-testing',
    title: 'Ethical Hacking & Penetration Testing',
    description: 'Hands-on penetration testing with TryHackMe labs',
    totalModules: 15,
    completedModules: 0,
    estimatedHours: 50,
    difficulty: 'Advanced',
    category: 'Penetration Testing',
  },
];

export const freeResources: Resource[] = [
  {
    id: 'owasp-guide',
    title: 'OWASP Top 10 Official Guide',
    type: 'article',
    url: 'https://owasp.org/www-project-top-ten/',
    free: true,
  },
  {
    id: 'tryhackme-intro',
    title: 'TryHackMe Introduction to Cyber Security',
    type: 'lab',
    url: 'https://tryhackme.com/path/outline/introtocyber',
    duration: '8 hours',
    free: true,
  },
  {
    id: 'cybrary-network',
    title: 'Network+ Training',
    type: 'video',
    url: 'https://www.cybrary.it/course/comptia-network-plus/',
    duration: '40 hours',
    free: true,
  },
  {
    id: 'sans-reading',
    title: 'SANS Reading Room',
    type: 'article',
    url: 'https://www.sans.org/reading-room/',
    free: true,
  },
];

export const studySessions: StudySession[] = [
  {
    id: 'injection-attacks',
    title: 'SQL Injection Fundamentals',
    description: 'Learn how SQL injection attacks work and how to prevent them',
    duration: 45,
    difficulty: 'Beginner',
    completed: false,
    progress: 65,
    resources: [
      {
        id: 'portswigger-sqli',
        title: 'PortSwigger SQL Injection Labs',
        type: 'lab',
        url: 'https://portswigger.net/web-security/sql-injection',
        free: true,
      },
    ],
  },
  {
    id: 'xss-prevention',
    title: 'Cross-Site Scripting (XSS) Prevention',
    description: 'Understand XSS vulnerabilities and defense mechanisms',
    duration: 60,
    difficulty: 'Intermediate',
    completed: false,
    progress: 0,
    resources: [
      {
        id: 'owasp-xss',
        title: 'OWASP XSS Prevention Cheat Sheet',
        type: 'article',
        url: 'https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html',
        free: true,
      },
    ],
  },
];

export const userAchievements: Achievement[] = [
  {
    id: 'first-week',
    title: 'First Week Complete',
    description: 'Completed your first week of consistent learning',
    icon: 'calendar-check',
    unlockedAt: '2024-01-08',
    category: 'streak',
  },
  {
    id: 'owasp-starter',
    title: 'OWASP Explorer',
    description: 'Started your OWASP Top 10 learning journey',
    icon: 'shield-check',
    unlockedAt: '2024-01-05',
    category: 'completion',
  },
];

export const cvTemplates = [
  {
    id: 'modern-tech',
    name: 'Modern Tech',
    description: 'Clean, modern design perfect for tech roles',
    preview: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg',
  },
  {
    id: 'cybersecurity-pro',
    name: 'Cybersecurity Professional',
    description: 'Professional template highlighting security expertise',
    preview: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg',
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Simple, elegant design that focuses on content',
    preview: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
  },
];