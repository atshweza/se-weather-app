import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  searchText: string;
  currentDay: Current | undefined;
  setSearchText: (text: string) => void;
  setCurrentDay: (current: Current) => void;
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
      currentDay: undefined,
      setSearchText: (text) => set({ searchText: text }),
      setCurrentDay: (current) => set({ currentDay: current }),

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
