import { Milestone } from '../backend';
import { MILESTONES } from '@/constants/milestones';

export interface PhaseProgress {
  phase: number;
  totalMilestones: number;
  completedMilestones: number;
  percentage: number;
}

// Calculate phase progress based on milestone progress percentages
export function getPhaseProgress(phase: number, milestones: Milestone[]): PhaseProgress {
  const phaseMilestones = MILESTONES.filter((m) => m.phase === phase);
  const totalMilestones = phaseMilestones.length;
  
  if (totalMilestones === 0) {
    return {
      phase,
      totalMilestones: 0,
      completedMilestones: 0,
      percentage: 0,
    };
  }

  // Calculate average progress of all milestones in this phase
  let totalProgress = 0;
  let completedCount = 0;
  
  phaseMilestones.forEach((pm) => {
    const milestone = milestones.find((m) => Number(m.id) === pm.milestone);
    const progress = milestone ? Number(milestone.progress) : 0;
    totalProgress += progress;
    if (progress === 100) {
      completedCount++;
    }
  });

  const averageProgress = Math.round(totalProgress / totalMilestones);

  return {
    phase,
    totalMilestones,
    completedMilestones: completedCount,
    percentage: averageProgress,
  };
}

// Calculate overall progress based on all milestone progress percentages
export function getOverallProgress(milestones: Milestone[]): {
  completedMilestones: number;
  totalMilestones: number;
  percentage: number;
} {
  const totalMilestones = MILESTONES.length;
  
  if (totalMilestones === 0) {
    return {
      completedMilestones: 0,
      totalMilestones: 0,
      percentage: 0,
    };
  }

  // Calculate average progress of all milestones
  let totalProgress = 0;
  let completedCount = 0;
  
  MILESTONES.forEach((m) => {
    const milestone = milestones.find((bm) => Number(bm.id) === m.milestone);
    const progress = milestone ? Number(milestone.progress) : 0;
    totalProgress += progress;
    if (progress === 100) {
      completedCount++;
    }
  });

  const averageProgress = Math.round(totalProgress / totalMilestones);

  return {
    completedMilestones: completedCount,
    totalMilestones,
    percentage: averageProgress,
  };
}
