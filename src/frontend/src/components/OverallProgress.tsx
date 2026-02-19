import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { useTasks } from '@/hooks/useTasks';
import { getOverallProgress } from '@/utils/progressUtils';

export function OverallProgress() {
  const { milestones } = useTasks();
  const progress = getOverallProgress(milestones);

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-muted-foreground">Progreso General</h3>
            <span className="text-2xl font-bold text-primary">{progress.percentage}%</span>
          </div>
          <Progress value={progress.percentage} className="h-3" />
          <p className="text-xs text-muted-foreground text-center">
            {progress.completedMilestones} de {progress.totalMilestones} hitos completados
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
