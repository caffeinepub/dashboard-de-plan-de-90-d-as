import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { PHASES } from '@/constants/milestones';
import { useTasks } from '@/hooks/useTasks';
import { getPhaseProgress } from '@/utils/progressUtils';

interface PhaseNavigationProps {
  currentPhase: number;
  onPhaseChange: (phase: number) => void;
}

export function PhaseNavigation({ currentPhase, onPhaseChange }: PhaseNavigationProps) {
  const { milestones } = useTasks();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {PHASES.map((phase) => {
        const progress = getPhaseProgress(phase.number, milestones);
        const isActive = currentPhase === phase.number;

        return (
          <button
            key={phase.number}
            onClick={() => onPhaseChange(phase.number)}
            className={`text-left p-4 rounded-lg border-2 transition-all ${
              isActive
                ? 'border-primary bg-primary/5 shadow-md'
                : 'border-border hover:border-primary/50 hover:bg-accent'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-sm mb-1">
                    Fase {phase.number}: {phase.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">{phase.dateRange}</p>
                  <p className="text-xs text-muted-foreground">{phase.dayRange}</p>
                </div>
                <Badge
                  variant={progress.completedMilestones === progress.totalMilestones ? 'default' : 'outline'}
                  className="shrink-0"
                >
                  {progress.completedMilestones}/{progress.totalMilestones}
                </Badge>
              </div>
              <div className="space-y-1">
                <Progress value={progress.percentage} className="h-2" />
                <p className="text-xs text-muted-foreground text-right">{progress.percentage}%</p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
