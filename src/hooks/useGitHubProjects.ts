import { useState, useEffect } from 'react';
import { fetchGitHubProjects } from '../services/github';
import type { GitHubProject } from '../services/github';

interface UseGitHubProjectsReturn {
  projects: GitHubProject[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useGitHubProjects = (): UseGitHubProjectsReturn => {
  const [projects, setProjects] = useState<GitHubProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchGitHubProjects();
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch projects');
      console.error('Error fetching GitHub projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects
  };
};