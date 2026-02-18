import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PhaseNavigation } from '@/components/PhaseNavigation';
import { OverallProgress } from '@/components/OverallProgress';
import { MilestoneSection } from '@/components/MilestoneSection';
import { TaskDialog } from '@/components/TaskDialog';
import { useTasks } from '@/hooks/useTasks';
import { getMilestonesByPhase } from '@/constants/milestones';

export function Dashboard() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState(1);
  const { tasks, isLoading } = useTasks();

  const phaseMilestones = getMilestonesByPhase(selectedPhase);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Plan de Vuelo - 90 Días
          </h1>
          <p className="mt-2 text-muted-foreground">
            Sistema completo de generación de leads para abogados en Utah
          </p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)} size="lg" className="gap-2">
          <Plus className="h-5 w-5" />
          Agregar Tarea
        </Button>
      </div>

      <OverallProgress tasks={tasks} />

      <PhaseNavigation
        selectedPhase={selectedPhase}
        onPhaseChange={setSelectedPhase}
        tasks={tasks}
      />

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" />
            <p className="text-muted-foreground">Cargando tareas...</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            Fase {selectedPhase}: Hitos y Tareas
          </h2>
          {phaseMilestones.map((milestone) => (
            <MilestoneSection
              key={milestone.milestone}
              milestone={milestone}
              tasks={tasks}
            />
          ))}
        </div>
      )}

      <TaskDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        mode="create"
      />
    </div>
  );
}
