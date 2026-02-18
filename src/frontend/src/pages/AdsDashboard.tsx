import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAdsMetrics } from '@/hooks/useAdsMetrics';
import {
  calculateCostPerLead,
  calculateAppointmentRate,
  calculateConversionRate,
  calculateCostPerConversion,
  formatCurrency,
  formatPercentage,
} from '@/utils/adsCalculations';

export function AdsDashboard() {
  const { adsMetrics, isLoading, addAdsMetricsMutation } = useAdsMetrics();
  const [month, setMonth] = useState('');
  const [spent, setSpent] = useState('');
  const [leads, setLeads] = useState('');
  const [appointments, setAppointments] = useState('');
  const [converted, setConverted] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!month || !spent || !leads || !appointments || !converted) {
      alert('Por favor complete todos los campos');
      return;
    }

    addAdsMetricsMutation.mutate(
      {
        month,
        spent: parseFloat(spent),
        leads: BigInt(leads),
        appointments: BigInt(appointments),
        converted: BigInt(converted),
      },
      {
        onSuccess: () => {
          // Reset form
          setMonth('');
          setSpent('');
          setLeads('');
          setAppointments('');
          setConverted('');
        },
      }
    );
  };

  // Sort metrics by month (newest first)
  const sortedMetrics = [...adsMetrics].sort((a, b) => b.month.localeCompare(a.month));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard ADS</h1>
        <p className="mt-2 text-muted-foreground">
          Métricas mensuales de campañas publicitarias
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Agregar Métricas del Mes</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="space-y-2">
                <Label htmlFor="month">Mes</Label>
                <Input
                  id="month"
                  type="month"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="spent">Gastado ($)</Label>
                <Input
                  id="spent"
                  type="number"
                  step="0.01"
                  min="0"
                  value={spent}
                  onChange={(e) => setSpent(e.target.value)}
                  placeholder="0.00"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="leads">Leads</Label>
                <Input
                  id="leads"
                  type="number"
                  min="0"
                  value={leads}
                  onChange={(e) => setLeads(e.target.value)}
                  placeholder="0"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="appointments">Citas</Label>
                <Input
                  id="appointments"
                  type="number"
                  min="0"
                  value={appointments}
                  onChange={(e) => setAppointments(e.target.value)}
                  placeholder="0"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="converted">Convertidos</Label>
                <Input
                  id="converted"
                  type="number"
                  min="0"
                  value={converted}
                  onChange={(e) => setConverted(e.target.value)}
                  placeholder="0"
                  required
                />
              </div>
            </div>
            <Button type="submit" disabled={addAdsMetricsMutation.isPending}>
              {addAdsMetricsMutation.isPending ? 'Guardando...' : 'Agregar Métricas'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reporte de Métricas</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" />
                <p className="text-muted-foreground">Cargando métricas...</p>
              </div>
            </div>
          ) : sortedMetrics.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No hay métricas registradas aún
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mes</TableHead>
                    <TableHead className="text-right">Gastado</TableHead>
                    <TableHead className="text-right">Leads</TableHead>
                    <TableHead className="text-right">Citas</TableHead>
                    <TableHead className="text-right">Convertidos</TableHead>
                    <TableHead className="text-right">Costo/Lead</TableHead>
                    <TableHead className="text-right">Tasa Citas</TableHead>
                    <TableHead className="text-right">Tasa Conv.</TableHead>
                    <TableHead className="text-right">Costo/Conv.</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedMetrics.map((metric) => {
                    const costPerLead = calculateCostPerLead(metric);
                    const appointmentRate = calculateAppointmentRate(metric);
                    const conversionRate = calculateConversionRate(metric);
                    const costPerConversion = calculateCostPerConversion(metric);

                    // Format month for display
                    const [year, monthNum] = metric.month.split('-');
                    const monthDate = new Date(parseInt(year), parseInt(monthNum) - 1);
                    const monthDisplay = monthDate.toLocaleDateString('es-ES', {
                      month: 'long',
                      year: 'numeric',
                    });

                    return (
                      <TableRow key={metric.month}>
                        <TableCell className="font-medium capitalize">{monthDisplay}</TableCell>
                        <TableCell className="text-right">${metric.spent.toFixed(2)}</TableCell>
                        <TableCell className="text-right">{metric.leads.toString()}</TableCell>
                        <TableCell className="text-right">{metric.appointments.toString()}</TableCell>
                        <TableCell className="text-right">{metric.converted.toString()}</TableCell>
                        <TableCell className="text-right">{formatCurrency(costPerLead)}</TableCell>
                        <TableCell className="text-right">{formatPercentage(appointmentRate)}</TableCell>
                        <TableCell className="text-right">{formatPercentage(conversionRate)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(costPerConversion)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
