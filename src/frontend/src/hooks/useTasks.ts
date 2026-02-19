import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Task, TaskContent, Time, Milestone } from '../backend';
import { useEffect } from 'react';
import { MILESTONES } from '@/constants/milestones';

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
      console.log('📊 MILESTONES FETCHED: Fetching all milestones from backend');
      const milestones = await actor.getAllMilestones();
      console.log('📊 MILESTONES FETCHED:', milestones.length, 'milestones returned');
      return milestones;
    },
    enabled: !!actor,
    staleTime: 30000,
  });

  // Initialize milestones in backend if they don't exist
  useEffect(() => {
    const initializeMilestones = async () => {
      if (!actor || !milestonesQuery.data) return;
      
      console.log('🔧 Checking if milestones need initialization...');
      
      // If no milestones exist in backend, initialize all 18
      if (milestonesQuery.data.length === 0) {
        console.log('🚀 INITIALIZING MILESTONES: Backend has 0 milestones, creating all 18...');
        
        try {
          for (const milestone of MILESTONES) {
            console.log(`➕ Creating milestone ${milestone.milestone}: ${milestone.title}`);
            await actor.addMilestone(
              BigInt(milestone.milestone),
              milestone.title,
              milestone.content.description
            );
          }
          
          console.log('✅ All milestones initialized successfully');
          // Refetch to update the UI
          queryClient.invalidateQueries({ queryKey: ['milestones'] });
        } catch (error) {
          console.error('❌ Error initializing milestones:', error);
        }
      } else {
        console.log(`✅ Milestones already initialized: ${milestonesQuery.data.length} found`);
      }
    };

    initializeMilestones();
  }, [actor, milestonesQuery.data, queryClient]);

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
      if (!actor) {
        console.error('❌ MUTATION ERROR: Actor no disponible');
        throw new Error('Actor no disponible');
      }
      
      console.log('🔄 MUTATION STARTED:', { 
        milestoneId: Number(milestoneId), 
        progress: Number(progress) 
      });
      
      try {
        const result = await actor.updateMilestoneProgress(milestoneId, progress);
        console.log('✅ BACKEND RESPONSE:', result);
        
        if (!result) {
          console.error('❌ Backend returned false - milestone not found or update failed');
          throw new Error('No se encontró el hito o la actualización falló');
        }
        
        return result;
      } catch (error) {
        console.error('❌ MUTATION ERROR:', {
          error,
          message: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : undefined
        });
        throw error;
      }
    },
    onSuccess: (data, variables) => {
      console.log('✅ MUTATION SUCCESS:', { 
        result: data,
        milestoneId: Number(variables.milestoneId), 
        progress: Number(variables.progress) 
      });
      console.log('🔄 INVALIDATING CACHE: Triggering milestones refetch');
      queryClient.invalidateQueries({ queryKey: ['milestones'] });
      console.log('✅ CACHE INVALIDATED');
    },
    onError: (error, variables) => {
      console.error('❌ MUTATION ERROR CALLBACK:', {
        error,
        message: error instanceof Error ? error.message : 'Error desconocido',
        stack: error instanceof Error ? error.stack : undefined,
        milestoneId: Number(variables.milestoneId),
        progress: Number(variables.progress)
      });
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
