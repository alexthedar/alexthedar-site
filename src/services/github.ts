// GitHub API types
export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  size: number;
  archived: boolean;
  fork: boolean;
}

export interface GitHubProject {
  id: number;
  name: string;
  title: string;
  description: string;
  url: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  forks: number;
  topics: string[];
  createdAt: Date;
  lastUpdated: Date;
}

// Cache configuration
const CACHE_KEY = 'github_projects_cache_v4'; // Updated to force cache refresh
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

interface CacheData {
  timestamp: number;
  data: GitHubProject[];
}

// Projects to exclude (forks, archived, etc.)
const EXCLUDED_REPOS = ['alexthedar-site']; // Don't show this portfolio repo


// Transform GitHub repo to our project format
function transformRepo(repo: GitHubRepo): GitHubProject | null {
  // Skip forks, archived repos, and excluded repos
  if (repo.fork || repo.archived || EXCLUDED_REPOS.includes(repo.name)) {
    return null;
  }

  const project: GitHubProject = {
    id: repo.id,
    name: repo.name,
    title: formatTitle(repo.name),
    description: repo.description || 'No description available',
    url: repo.html_url,
    homepage: repo.homepage,
    language: repo.language,
    topics: repo.topics || [],
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    createdAt: new Date(repo.created_at),
    lastUpdated: new Date(repo.pushed_at || repo.updated_at)
  };

  return project;
}

// Format repo name to readable title
function formatTitle(name: string): string {
  return name
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Get cached data if valid
function getCachedData(): GitHubProject[] | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const { timestamp, data }: CacheData = JSON.parse(cached);
    const now = Date.now();

    // Check if cache is still valid
    if (now - timestamp < CACHE_DURATION) {
      // Parse dates from cached data
      return data.map(project => ({
        ...project,
        createdAt: new Date(project.createdAt),
        lastUpdated: new Date(project.lastUpdated)
      }));
    }
  } catch (error) {
    console.error('Error reading cache:', error);
  }

  return null;
}

// Save data to cache
function setCachedData(data: GitHubProject[]): void {
  try {
    const cacheData: CacheData = {
      timestamp: Date.now(),
      data
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Error saving to cache:', error);
  }
}

// Main function to fetch GitHub projects
export async function fetchGitHubProjects(username: string = 'alexthedar'): Promise<GitHubProject[]> {
  // Check cache first
  const cachedData = getCachedData();
  if (cachedData) {
    return cachedData;
  }

  try {
    const allRepos: GitHubRepo[] = [];
    let page = 1;
    const perPage = 100; // Max allowed by GitHub

    // Fetch all pages of repositories
    while (true) {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}&sort=updated&direction=desc`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const repos: GitHubRepo[] = await response.json();

      if (repos.length === 0) break;

      allRepos.push(...repos);

      // Check if we got less than perPage (meaning it's the last page)
      if (repos.length < perPage) break;

      page++;
    }

    // Transform repos to projects
    const projects = allRepos
      .map(transformRepo)
      .filter((project): project is GitHubProject => project !== null);

    // Sort projects by last updated
    projects.sort((a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime());

    // Cache the data
    setCachedData(projects);

    return projects;
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);

    // If fetch fails, try to return cached data even if expired
    const expiredCache = getCachedData();
    if (expiredCache) {
      // Using expired cache due to fetch error
      return expiredCache;
    }

    // Return empty array as last resort
    return [];
  }
}

// Clear cache function (useful for forcing refresh)
export function clearGitHubCache(): void {
  localStorage.removeItem(CACHE_KEY);
}