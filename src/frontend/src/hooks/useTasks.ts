import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Task, TaskContent, Time } from '../backend';

export function useTasks() {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();

  const tasksQuery = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTasks();
    },
    enabled: !!actor && !isFetching,
  });

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

  const completeTaskMutation = useMutation({
    mutationFn: async ({ taskId, completed }: { taskId: bigint; completed: boolean }) => {
      if (!actor) throw new Error('Actor no disponible');
      return actor.completeTask(taskId, completed);
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

  return {
    tasks: tasksQuery.data || [],
    isLoading: tasksQuery.isLoading,
    addTaskMutation,
    editTaskMutation,
    completeTaskMutation,
    addTaskNotesMutation,
  };
}
