import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Project, FeaturedItem, Category } from '../backend';

export function useGetAllProjects() {
  const { actor, isFetching } = useActor();

  return useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProjects();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetProjectsByCategory(category: string | null) {
  const { actor, isFetching } = useActor();

  return useQuery<Project[]>({
    queryKey: ['projects', category],
    queryFn: async () => {
      if (!actor) return [];
      if (!category || category === 'all') {
        return actor.getAllProjects();
      }
      return actor.getProjectsByCategoryName(category.toLowerCase());
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetFeaturedSliderItems() {
  const { actor, isFetching } = useActor();

  return useQuery<FeaturedItem[]>({
    queryKey: ['featuredSliderItems'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFeaturedSliderItems();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCategories() {
  const { actor, isFetching } = useActor();

  return useQuery<string[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCategories();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitContactMessage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      email,
      message,
      category,
    }: {
      name: string;
      email: string;
      message: string;
      category: Category;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitContactMessage(name, email, message, category);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });
}
