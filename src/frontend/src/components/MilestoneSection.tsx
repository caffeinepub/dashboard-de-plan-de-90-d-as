import { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2, Circle } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TaskCard } from '@/components/TaskCard';
import { MilestoneData } from '@/constants/milestones';
import { Task } from '../backend';
import { getMilestoneProgress } from '@/utils/progressUtils';
import { useTasks } from '@/hooks/useTasks';

interface MilestoneSectionProps {
  milestone: MilestoneData;
  tasks: Task[];
}

export function MilestoneSection({ milestone, tasks }: MilestoneSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { completeTaskMutation } = useTasks();
  const milestoneTasks = tasks.filter((t) => Number(t.milestone) === milestone.milestone);
  const progress = getMilestoneProgress(milestone.milestone, tasks);

  const handleMilestoneToggle = () => {
    // Toggle all tasks in this milestone
    const newCompletedState = !progress.isComplete;
    milestoneTasks.forEach((task) => {
      if (task.completed !== newCompletedState) {
        completeTaskMutation.mutate({
          taskId: task.id,
          completed: newCompletedState,
        });
      }
    });
  };

  return (
    <Card className={`${progress.isComplete ? 'border-primary/50 bg-primary/5' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div
            className="flex-1 cursor-pointer select-none"
            onClick={handleMilestoneToggle}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleMilestoneToggle();
              }
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              {progress.isComplete ? (
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground shrink-0" />
              )}
              <span className="text-2xl">{milestone.emoji}</span>
              <h3 className="text-lg font-semibold">
                {milestone.milestone}. {milestone.title}
              </h3>
              {progress.isComplete && (
                <Badge variant="default" className="ml-2">
                  Completado
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground ml-7">{milestone.dateRange}</p>
            <p className="text-xs text-muted-foreground ml-7">{milestone.dayRange}</p>
            {milestoneTasks.length > 0 && (
              <div className="flex items-center gap-2 mt-2 ml-7">
                <Badge variant="outline" className="text-xs">
                  {progress.completedTasks}/{progress.totalTasks} tareas
                </Badge>
                <div className="flex-1 bg-secondary rounded-full h-1.5 max-w-[200px]">
                  <div
                    className="bg-primary h-1.5 rounded-full transition-all"
                    style={{
                      width: `${
                        progress.totalTasks > 0
                          ? (progress.completedTasks / progress.totalTasks) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="shrink-0"
          >
            {isExpanded ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </Button>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="pt-0 space-y-4">
          <div className="prose prose-sm max-w-none">
            <p className="text-sm text-foreground mb-3">{milestone.content.description}</p>
            <ul className="space-y-1 text-sm">
              {milestone.content.items.map((item, idx) => (
                <li key={idx} className="text-foreground">
                  {item}
                </li>
              ))}
            </ul>
            {milestone.content.notes && milestone.content.notes.length > 0 && (
              <div className="mt-3 p-3 bg-muted rounded-md">
                <p className="text-xs font-semibold text-muted-foreground mb-1">Notas:</p>
                {milestone.content.notes.map((note, idx) => (
                  <p key={idx} className="text-xs text-muted-foreground">
                    • {note}
                  </p>
                ))}
              </div>
            )}
          </div>

          {milestoneTasks.length > 0 && (
            <div className="space-y-2 pt-4 border-t">
              <h4 className="text-sm font-semibold text-muted-foreground">Tareas</h4>
              {milestoneTasks.map((task) => (
                <TaskCard key={Number(task.id)} task={task} phaseNumber={milestone.phase} />
              ))}
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}
