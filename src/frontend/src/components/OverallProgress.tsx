import { Task } from '../backend';
import { getOverallProgress } from '@/utils/progressUtils';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2 } from 'lucide-react';

interface OverallProgressProps {
  tasks: Task[];
}

export function OverallProgress({ tasks }: OverallProgressProps) {
  const progress = getOverallProgress(tasks);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Progreso General</h3>
            <p className="text-sm text-muted-foreground">
              {progress.completedMilestones} de {progress.totalMilestones} hitos completados
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-primary">{progress.percentage}%</div>
          <p className="text-xs text-muted-foreground">Completado</p>
        </div>
      </div>
      <Progress value={progress.percentage} className="h-3" />
    </div>
  );
}
