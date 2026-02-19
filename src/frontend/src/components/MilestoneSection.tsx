import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { TaskCard } from '@/components/TaskCard';
import { MilestoneData } from '@/constants/milestones';
import { Task } from '../backend';
import { useTasks } from '@/hooks/useTasks';
import { toast } from 'sonner';

interface MilestoneSectionProps {
  milestone: MilestoneData;
  tasks: Task[];
}

export function MilestoneSection({ milestone, tasks }: MilestoneSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { updateMilestoneProgressMutation, milestoneProgress } = useTasks();
  const milestoneTasks = tasks.filter((t) => Number(t.milestone) === milestone.milestone);
  
  // Get progress from backend milestone data
  const currentProgress = milestoneProgress.get(milestone.milestone) || 0;
  
  // Store previous value for reverting on error
  const [previousProgress, setPreviousProgress] = useState(currentProgress);

  // Update previous progress when current progress changes from backend
  useEffect(() => {
    setPreviousProgress(currentProgress);
    console.log('📊 COMPONENT RE-RENDERED:', {
      milestoneId: milestone.milestone,
      currentProgress,
      title: milestone.title
    });
  }, [currentProgress, milestone.milestone, milestone.title]);

  const handleProgressChange = (value: number[]) => {
    const newProgress = value[0];
    
    console.log('🎯 SLIDER CHANGED:', { 
      milestoneId: milestone.milestone, 
      newProgress, 
      currentProgress,
      title: milestone.title
    });
    
    // Store current value before attempting update
    setPreviousProgress(currentProgress);
    
    console.log('🚀 CALLING MUTATION:', {
      milestoneId: milestone.milestone,
      progress: newProgress
    });
    
    updateMilestoneProgressMutation.mutate(
      {
        milestoneId: BigInt(milestone.milestone),
        progress: BigInt(newProgress),
      },
      {
        onSuccess: (result) => {
          console.log('✅ MUTATION SUCCESS CALLBACK:', { result, newProgress });
          if (result) {
            toast.success(`Progreso actualizado a ${newProgress}%`);
          } else {
            console.error('❌ Backend returned false');
            toast.error('No se pudo actualizar el progreso - hito no encontrado');
          }
        },
        onError: (error) => {
          console.error('❌ MUTATION ERROR CALLBACK:', error);
          const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
          toast.error(`Error: ${errorMessage}`);
          
          // Revert slider to previous value
          console.log('⏪ REVERTING SLIDER:', { 
            from: newProgress, 
            to: previousProgress 
          });
        },
      }
    );
  };

  return (
    <Card className={`${currentProgress === 100 ? 'border-primary/50 bg-primary/5' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{milestone.emoji}</span>
              <h3 className="text-lg font-semibold">
                {milestone.milestone}. {milestone.title}
              </h3>
              {currentProgress === 100 && (
                <Badge variant="default" className="ml-2">
                  Completado
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground ml-7">{milestone.dateRange}</p>
            <p className="text-xs text-muted-foreground ml-7">{milestone.dayRange}</p>
            
            {/* Manual Progress Slider */}
            <div className="mt-4 ml-7 space-y-2">
              <div className="flex items-center justify-between gap-4">
                <label className="text-sm font-medium text-muted-foreground">
                  Progreso del hito:
                </label>
                <span className="text-sm font-semibold text-primary min-w-[3rem] text-right">
                  {currentProgress}%
                </span>
              </div>
              <Slider
                value={[currentProgress]}
                onValueChange={handleProgressChange}
                max={100}
                step={5}
                className="w-full max-w-md"
                disabled={updateMilestoneProgressMutation.isPending}
              />
              {updateMilestoneProgressMutation.isPending && (
                <p className="text-xs text-muted-foreground">Guardando...</p>
              )}
              {updateMilestoneProgressMutation.isError && (
                <p className="text-xs text-destructive">
                  Error al guardar. Intenta de nuevo.
                </p>
              )}
            </div>

            {milestoneTasks.length > 0 && (
              <div className="flex items-center gap-2 mt-3 ml-7">
                <Badge variant="outline" className="text-xs">
                  {milestoneTasks.length} {milestoneTasks.length === 1 ? 'tarea' : 'tareas'}
                </Badge>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
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
