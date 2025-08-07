import { useWeatherStore } from '@/strore/weatherStore';

export function formatTemperature(tempC: number, tempF: number): string {
  const unit = useWeatherStore.getState().units.temperature;
  return `${unit === 'f' ? Math.round(tempF) : Math.round(tempC)}°${unit.toUpperCase()}`;
}

export function formatWindSpeed(kph: number, mph: number): string {
  const unit = useWeatherStore.getState().units.windSpeed;
  return `${unit === 'mph' ? mph.toFixed(1) : kph.toFixed(1)} ${unit}`;
}

export function formatPressure(mb: number, inches: number): string {
  const unit = useWeatherStore.getState().units.pressure;
  return `${unit === 'in' ? inches.toFixed(2) : mb.toFixed(0)} ${unit}`;
}

export function formatPrecip(mm: number, inches: number): string {
  const unit = useWeatherStore.getState().units.precipitation;
  return `${unit === 'in' ? inches.toFixed(2) : mm.toFixed(1)} ${unit}`;
}
