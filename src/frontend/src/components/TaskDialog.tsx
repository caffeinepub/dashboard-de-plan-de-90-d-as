import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { TaskForm } from '@/components/TaskForm';
import { Task } from '../backend';

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'create' | 'edit';
  task?: Task;
}

export function TaskDialog({ open, onOpenChange, mode, task }: TaskDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Agregar Nueva Tarea' : 'Editar Tarea'}
          </DialogTitle>
        </DialogHeader>
        <TaskForm
          mode={mode}
          task={task}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
