import { AdsMetrics } from '../backend';

export function calculateCostPerLead(metrics: AdsMetrics): number | null {
  const leads = Number(metrics.leads);
  if (leads === 0) return null;
  return metrics.spent / leads;
}

export function calculateAppointmentRate(metrics: AdsMetrics): number | null {
  const leads = Number(metrics.leads);
  if (leads === 0) return null;
  const appointments = Number(metrics.appointments);
  return (appointments / leads) * 100;
}

export function calculateConversionRate(metrics: AdsMetrics): number | null {
  const appointments = Number(metrics.appointments);
  if (appointments === 0) return null;
  const converted = Number(metrics.converted);
  return (converted / appointments) * 100;
}

export function calculateCostPerConversion(metrics: AdsMetrics): number | null {
  const converted = Number(metrics.converted);
  if (converted === 0) return null;
  return metrics.spent / converted;
}

export function formatCurrency(value: number | null): string {
  if (value === null) return 'N/A';
  return `$${value.toFixed(2)}`;
}

export function formatPercentage(value: number | null): string {
  if (value === null) return 'N/A';
  return `${value.toFixed(2)}%`;
}
