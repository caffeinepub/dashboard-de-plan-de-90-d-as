import { Task } from '../backend';
import { MILESTONES } from '@/constants/milestones';

export interface PhaseProgress {
  phase: number;
  totalMilestones: number;
  completedMilestones: number;
  percentage: number;
}

export interface MilestoneProgress {
  milestone: number;
  totalTasks: number;
  completedTasks: number;
  isComplete: boolean;
}

// Calculate if a milestone is complete (all tasks have completed === true)
export function isMilestoneComplete(milestone: number, tasks: Task[]): boolean {
  const milestoneTasks = tasks.filter((t) => Number(t.milestone) === milestone);
  if (milestoneTasks.length === 0) return false;
  return milestoneTasks.every((t) => t.completed === true);
}

// Calculate milestone progress
export function getMilestoneProgress(milestone: number, tasks: Task[]): MilestoneProgress {
  const milestoneTasks = tasks.filter((t) => Number(t.milestone) === milestone);
  const completedTasks = milestoneTasks.filter((t) => t.completed === true).length;
  
  return {
    milestone,
    totalTasks: milestoneTasks.length,
    completedTasks,
    isComplete: milestoneTasks.length > 0 && completedTasks === milestoneTasks.length,
  };
}

// Calculate phase progress
export function getPhaseProgress(phase: number, tasks: Task[]): PhaseProgress {
  const phaseMilestones = MILESTONES.filter((m) => m.phase === phase);
  const completedMilestones = phaseMilestones.filter((m) =>
    isMilestoneComplete(m.milestone, tasks)
  ).length;

  return {
    phase,
    totalMilestones: phaseMilestones.length,
    completedMilestones,
    percentage: phaseMilestones.length > 0 
      ? Math.round((completedMilestones / phaseMilestones.length) * 100)
      : 0,
  };
}

// Calculate overall progress
export function getOverallProgress(tasks: Task[]) {
  const totalMilestones = MILESTONES.length;
  const completedMilestones = MILESTONES.filter((m) =>
    isMilestoneComplete(m.milestone, tasks)
  ).length;

  return {
    totalMilestones,
    completedMilestones,
    percentage: totalMilestones > 0 
      ? Math.round((completedMilestones / totalMilestones) * 100)
      : 0,
  };
}
