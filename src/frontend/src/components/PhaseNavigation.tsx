import { PHASES } from '@/constants/milestones';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Task } from '../backend';
import { getPhaseProgress } from '@/utils/progressUtils';

interface PhaseNavigationProps {
  selectedPhase: number;
  onPhaseChange: (phase: number) => void;
  tasks: Task[];
}

export function PhaseNavigation({ selectedPhase, onPhaseChange, tasks }: PhaseNavigationProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
        Fases del Proyecto
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {PHASES.map((phase) => {
          const progress = getPhaseProgress(phase.number, tasks);
          const isActive = selectedPhase === phase.number;

          return (
            <Button
              key={phase.number}
              variant={isActive ? 'default' : 'outline'}
              className={`h-auto p-4 flex flex-col items-start gap-2 ${
                isActive ? 'ring-2 ring-ring ring-offset-2' : ''
              }`}
              onClick={() => onPhaseChange(phase.number)}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-lg font-bold">Fase {phase.number}</span>
                <Badge variant={isActive ? 'secondary' : 'outline'} className="text-xs">
                  {progress.completedMilestones}/{progress.totalMilestones}
                </Badge>
              </div>
              <div className="text-left w-full">
                <p className="text-xs font-medium line-clamp-2">{phase.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{phase.dateRange}</p>
                <p className="text-xs text-muted-foreground">{phase.dayRange}</p>
              </div>
              <div className="w-full bg-secondary rounded-full h-1.5 mt-1">
                <div
                  className="bg-primary h-1.5 rounded-full transition-all"
                  style={{ width: `${progress.percentage}%` }}
                />
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
