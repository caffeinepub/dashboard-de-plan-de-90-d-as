import { useState } from 'react';
import { Edit2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { TaskDialog } from '@/components/TaskDialog';
import { useTasks } from '@/hooks/useTasks';
import { Task } from '../backend';
import { formatDate, calculateDayNumber } from '@/utils/dateUtils';

interface TaskCardProps {
  task: Task;
  phaseNumber: number;
}

export function TaskCard({ task, phaseNumber }: TaskCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [notesValue, setNotesValue] = useState(task.notes || '');
  const { addTaskNotesMutation } = useTasks();

  const handleNotesBlur = () => {
    if (notesValue !== task.notes) {
      addTaskNotesMutation.mutate({
        taskId: task.id,
        notes: notesValue,
      });
    }
  };

  const dayNumber = calculateDayNumber(task.dueTime);

  return (
    <>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-1 min-w-0 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {task.description}
                  </p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                    <span>Vencimiento: {formatDate(task.dueTime)}</span>
                    <span>•</span>
                    <span>Día {dayNumber} de 90</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditDialogOpen(true)}
                    className="h-8 w-8 p-0"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t">
                <label className="text-xs font-semibold text-muted-foreground">
                  Notas internas del equipo:
                </label>
                <Textarea
                  value={notesValue}
                  onChange={(e) => setNotesValue(e.target.value)}
                  onBlur={handleNotesBlur}
                  placeholder="Agregar notas internas..."
                  className="min-h-[80px] text-sm"
                  disabled={addTaskNotesMutation.isPending}
                />
                {addTaskNotesMutation.isPending && (
                  <p className="text-xs text-muted-foreground">Guardando...</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <TaskDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        mode="edit"
        task={task}
      />
    </>
  );
}
