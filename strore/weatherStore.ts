import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  searchText: string;
  currentDay: Current | undefined;
  setSearchText: (text: string) => void;
  setCurrentDay: (current: Current) => void;
}

interface WeatherForecastState {
  forecast: Forecast | undefined;
  setForecastForDay: (forecast: Forecast) => void;
  getForecastForDay: () => Forecast | undefined;
}

type WeatherStore = AppState & WeatherForecastState;

export const useWeatherStore = create<WeatherStore>()(
  persist(
    (set, get) => ({
      searchText: '',
      currentDay: undefined,
      setSearchText: (text) => set({ searchText: text }),
      setCurrentDay: (current) => set({ currentDay: current }),

      forecast: undefined,
      setForecastForDay: (data) =>
        set((state) => ({
          forecast: data,
        })),
      getForecastForDay: () => get().forecast,
    }),
    {
      name: 'weather-forecast-store',
      partialize: (state) => ({
        forecast: state.forecast,
      }),
    }
  )
);
