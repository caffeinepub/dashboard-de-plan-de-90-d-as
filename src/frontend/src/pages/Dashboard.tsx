import { useState, useEffect } from 'react';
import { Plus, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { PhaseNavigation } from '@/components/PhaseNavigation';
import { OverallProgress } from '@/components/OverallProgress';
import { MilestoneSection } from '@/components/MilestoneSection';
import { TaskDialog } from '@/components/TaskDialog';
import { useTasks } from '@/hooks/useTasks';
import { getMilestonesByPhase } from '@/constants/milestones';

export function Dashboard() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState(1);
  const { tasks, isLoading, isError, error, refetch } = useTasks();

  useEffect(() => {
    if (tasks.length > 0) {
      console.log('[Dashboard] Tasks loaded:', tasks.length);
    }
  }, [tasks]);

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

      <OverallProgress />

      <PhaseNavigation
        currentPhase={selectedPhase}
        onPhaseChange={setSelectedPhase}
      />

      {isError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error al cargar tareas</AlertTitle>
          <AlertDescription className="flex items-center justify-between">
            <span>
              {error instanceof Error ? error.message : 'No se pudieron cargar las tareas. Por favor, intenta de nuevo.'}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              className="ml-4 gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Reintentar
            </Button>
          </AlertDescription>
        </Alert>
      )}

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
