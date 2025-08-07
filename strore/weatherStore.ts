import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import detectUnitsFromBrowser from '@/utils/detectUnitsFromBrowser';

interface AppState {
  searchText: string;
  activeForecastDay: Current | undefined;
  units: Units;
  setSearchText: (text: string) => void;
  setActiveForecastDay: (current: Current) => void;
  setUnits: (units: Partial<Units>) => void;
}

interface WeatherForecastState {
  forecast: WeatherForecast | undefined;
  setForecast: (forecast: WeatherForecast) => void;
  getForecast: () => WeatherForecast | undefined;
}

type WeatherStore = AppState & WeatherForecastState;

export const useWeatherStore = create<WeatherStore>()(
  persist(
    (set, get) => ({
      searchText: '',
      activeForecastDay: undefined,
      units: detectUnitsFromBrowser(),
      setSearchText: (text) => set({ searchText: text }),
      setActiveForecastDay: (current) => set({ activeForecastDay: current }),
      setUnits: (newUnits) =>
        set((state) => ({
          units: {
            ...state.units,
            ...newUnits,
          },
        })),
      forecast: undefined,
      setForecast: (data) =>
        set((state) => ({
          forecast: data,
        })),
      getForecast: () => get().forecast,
    }),
    {
      name: 'weather-forecast-store',
      partialize: (state) => ({
        forecast: state.forecast,
      }),
    }
  )
);
