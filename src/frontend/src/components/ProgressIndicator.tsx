import { CheckCircle2, Clock, Circle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ProgressIndicatorProps {
  completed: boolean;
}

export function ProgressIndicator({ completed }: ProgressIndicatorProps) {
  if (completed) {
    return (
      <Badge variant="default" className="gap-1 bg-track-web/20 text-track-web border-track-web/30">
        <CheckCircle2 className="h-3 w-3" />
        Completado
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className="gap-1">
      <Circle className="h-3 w-3" />
      Pendiente
    </Badge>
  );
}
