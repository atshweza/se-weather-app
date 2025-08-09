import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import detectUnitsFromBrowser from '@/utils/detectUnitsFromBrowser';

interface AppState {
  searchText: string;
  previousSearchText: string;
  activeForecastDay: Current | undefined;
  units: Units;
  isLoadingForecast: boolean;
  hasHydrated: boolean;
  setSearchText: (text: string) => void;
  setPreviousSearchText: (text: string) => void;
  setActiveForecastDay: (current: Current) => void;
  setUnits: (units: Partial<Units>) => void;
  setIsLoadingForecast: (isLoading: boolean) => void;
  setHasHydrated: () => void;
}

interface WeatherForecastState {
  forecast: WeatherForecast | undefined;
  setForecast: (forecast: WeatherForecast) => void;
  getForecast: () => WeatherForecast | undefined;
}

type WeatherStore = AppState & WeatherForecastState;
const useWeatherStore = create<WeatherStore>()(
  persist(
    (set, get) => ({
      searchText: '',
      previousSearchText: '',
      activeForecastDay: undefined,
      units: detectUnitsFromBrowser(),
      isLoadingForecast: false,
      hasHydrated: false,
      setHasHydrated: () => set({ hasHydrated: true }),
      setSearchText: (text) => {
        set({ searchText: text });
      },
      setPreviousSearchText: (text) => {
        set({ previousSearchText: text });
      },
      setIsLoadingForecast: (isLoading) => set({ isLoadingForecast: isLoading }),
      setUnits: (newUnits) =>
        set((state) => ({
          units: {
            ...state.units,
            ...newUnits,
          },
        })),
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
        previousSearchText: state.previousSearchText,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated?.();
      },
    }
  )
);
export default useWeatherStore;
