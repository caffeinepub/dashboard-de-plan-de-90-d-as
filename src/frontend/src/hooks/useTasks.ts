import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Task, TaskContent, Time, Milestone } from '../backend';

export function useTasks() {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();

  const tasksQuery = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTasks();
    },
    enabled: !!actor,
    staleTime: 30000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const milestonesQuery = useQuery<Milestone[]>({
    queryKey: ['milestones'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllMilestones();
    },
    enabled: !!actor,
    staleTime: 30000,
  });

  // Create a map of milestone ID to progress percentage
  const milestoneProgress = new Map<number, number>();
  if (milestonesQuery.data) {
    milestonesQuery.data.forEach((m) => {
      milestoneProgress.set(Number(m.id), Number(m.progress));
    });
  }

  const addTaskMutation = useMutation({
    mutationFn: async ({
      description,
      dueTime,
      phase,
      milestone,
      notes,
      content,
    }: {
      description: string;
      dueTime: Time;
      phase: bigint;
      milestone: bigint;
      notes: string;
      content: TaskContent;
    }) => {
      if (!actor) throw new Error('Actor no disponible');
      return actor.addTask(description, dueTime, phase, milestone, notes, content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const editTaskMutation = useMutation({
    mutationFn: async ({
      taskId,
      newDescription,
      newDueTime,
      newPhase,
      newMilestone,
      newContent,
    }: {
      taskId: bigint;
      newDescription: string;
      newDueTime: Time;
      newPhase: bigint;
      newMilestone: bigint;
      newContent: TaskContent;
    }) => {
      if (!actor) throw new Error('Actor no disponible');
      return actor.editTask(taskId, newDescription, newDueTime, newPhase, newMilestone, newContent);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const addTaskNotesMutation = useMutation({
    mutationFn: async ({ taskId, notes }: { taskId: bigint; notes: string }) => {
      if (!actor) throw new Error('Actor no disponible');
      return actor.addTaskNotes(taskId, notes);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const updateMilestoneProgressMutation = useMutation({
    mutationFn: async ({ milestoneId, progress }: { milestoneId: bigint; progress: bigint }) => {
      if (!actor) throw new Error('Actor no disponible');
      return actor.updateMilestoneProgress(milestoneId, progress);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['milestones'] });
    },
  });

  return {
    tasks: tasksQuery.data || [],
    milestones: milestonesQuery.data || [],
    milestoneProgress,
    isLoading: tasksQuery.isLoading || isFetching,
    isError: tasksQuery.isError,
    error: tasksQuery.error,
    refetch: tasksQuery.refetch,
    addTaskMutation,
    editTaskMutation,
    addTaskNotesMutation,
    updateMilestoneProgressMutation,
  };
}
