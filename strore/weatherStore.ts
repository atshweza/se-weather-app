import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  searchText: string;
  activeForecastDay: Current | undefined;
  setSearchText: (text: string) => void;
  setActiveForecastDay: (current: Current) => void;
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
      setSearchText: (text) => set({ searchText: text }),
      setActiveForecastDay: (current) => set({ activeForecastDay: current }),

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
