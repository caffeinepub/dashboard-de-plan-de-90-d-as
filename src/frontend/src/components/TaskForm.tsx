import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTasks } from '@/hooks/useTasks';
import { Task, TaskContent } from '../backend';
import { dateToTime } from '@/utils/dateUtils';
import { PHASE_OPTIONS, MILESTONE_OPTIONS } from '@/constants/milestones';

interface TaskFormProps {
  mode: 'create' | 'edit';
  task?: Task;
  onSuccess: () => void;
}

export function TaskForm({ mode, task, onSuccess }: TaskFormProps) {
  const { addTaskMutation, editTaskMutation } = useTasks();
  const [phase, setPhase] = useState<string>(task ? String(task.phase) : '');
  const [milestone, setMilestone] = useState<string>(task ? String(task.milestone) : '');
  const [description, setDescription] = useState(task?.description || '');
  const [dueDate, setDueDate] = useState(
    task ? new Date(Number(task.dueTime / BigInt(1_000_000))).toISOString().split('T')[0] : ''
  );

  // Filter milestones based on selected phase
  const availableMilestones = phase
    ? MILESTONE_OPTIONS.filter((m) => m.phase === parseInt(phase))
    : [];

  // Reset milestone when phase changes
  useEffect(() => {
    if (phase && milestone) {
      const milestonePhase = MILESTONE_OPTIONS.find((m) => m.value === parseInt(milestone))?.phase;
      if (milestonePhase !== parseInt(phase)) {
        setMilestone('');
      }
    }
  }, [phase, milestone]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!phase || !milestone || !description || !dueDate) {
      alert('Por favor complete todos los campos');
      return;
    }

    const dueTime = dateToTime(new Date(dueDate));
    const taskContent: TaskContent = {
      phase: BigInt(phase),
      milestone: BigInt(milestone),
      details: { __kind__: 'businessModel', businessModel: { questions: [], answers: [] } },
    };

    if (mode === 'create') {
      addTaskMutation.mutate(
        {
          description,
          dueTime,
          phase: BigInt(phase),
          milestone: BigInt(milestone),
          notes: '',
          content: taskContent,
        },
        {
          onSuccess,
        }
      );
    } else if (task) {
      editTaskMutation.mutate(
        {
          taskId: task.id,
          newDescription: description,
          newDueTime: dueTime,
          newPhase: BigInt(phase),
          newMilestone: BigInt(milestone),
          newContent: taskContent,
        },
        {
          onSuccess,
        }
      );
    }
  };

  const isLoading = addTaskMutation.isPending || editTaskMutation.isPending;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="phase">Fase</Label>
        <Select value={phase} onValueChange={setPhase} required>
          <SelectTrigger id="phase">
            <SelectValue placeholder="Seleccionar fase" />
          </SelectTrigger>
          <SelectContent>
            {PHASE_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={String(option.value)}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="milestone">Hito</Label>
        <Select value={milestone} onValueChange={setMilestone} required disabled={!phase}>
          <SelectTrigger id="milestone">
            <SelectValue placeholder={phase ? 'Seleccionar hito' : 'Primero seleccione una fase'} />
          </SelectTrigger>
          <SelectContent>
            {availableMilestones.map((option) => (
              <SelectItem key={option.value} value={String(option.value)}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción de la tarea"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="dueDate">Fecha de vencimiento</Label>
        <Input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Guardando...' : mode === 'create' ? 'Crear Tarea' : 'Guardar Cambios'}
        </Button>
      </div>
    </form>
  );
}
