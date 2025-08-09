import React from 'react';

import useWeatherStore from '@/store/weatherStore';
import { useQuery } from '@tanstack/react-query';
import { act, render, screen } from '@testing-library/react';

import WeatherForecast from '../WeatherForecast';

jest.mock('@/store/weatherStore', () => {
  const actualStore = jest.requireActual('@/store/weatherStore').default;
  return {
    __esModule: true,
    default: actualStore,
  };
});

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}));
const mockUseQuery = useQuery as jest.Mock;

jest.mock('../../WeatherSummerCard/WeatherSummerCard', () => {
  return function MockWeatherSummerCard({ forecastDay }: { forecastDay: ForecastDay }) {
    return <div>Weather card for {forecastDay.date}</div>;
  };
});

const mockForecastData = {
  current: { last_updated_epoch: 1754690400, last_updated: '2025-08-09' },
  forecast: {
    forecastday: [
      { date: '2025-08-10', date_epoch: 1754776800 },
      { date: '2025-08-11', date_epoch: 1754863200 },
      { date: '2025-08-12', date_epoch: 1754949600 },
    ],
  },
};

const mockHistoricData = [
  {
    forecast: {
      forecastday: [{ date: '2025-08-06', date_epoch: 1754776800 }],
    },
  },
  {
    forecast: {
      forecastday: [{ date: '2025-08-07', date_epoch: 1754776800 }],
    },
  },
  {
    forecast: {
      forecastday: [{ date: '2025-08-08', date_epoch: 1754776800 }],
    },
  },
];

const mockMergeWeatherForecast = {
  current: { last_updated_epoch: 1754690400, last_updated: '2025-08-09' },
  forecast: {
    forecastday: [
      { date: '2025-08-06', date_epoch: 1754776800 },
      { date: '2025-08-07', date_epoch: 1754776800 },
      { date: '2025-08-08', date_epoch: 1754776800 },
      { date: '2025-08-10', date_epoch: 1754776800 },
      { date: '2025-08-11', date_epoch: 1754863200 },
      { date: '2025-08-12', date_epoch: 1754949600 },
    ],
  },
};

it('renders skeleton when loading', () => {
  act(() => {
    useWeatherStore.setState({
      forecast: undefined,
      searchText: '',
      previousSearchText: '',
      hasHydrated: true,
    });
  });

  mockUseQuery.mockImplementation(() => ({
    data: null,
    isLoading: true,
    isError: false,
    error: null,
  }));

  render(<WeatherForecast />);
  expect(document.querySelector('.grid.grid-cols-6.gap-4')).toBeInTheDocument();
});

test('renders both history and forecast cards together', async () => {
  act(() => {
    useWeatherStore.setState({
      forecast: mockMergeWeatherForecast as WeatherForecast,
      activeForecastDay: undefined,
      isLoadingForecast: false,
      units: { temperature: 'c', windSpeed: 'kph', pressure: 'mb', visibility: 'km', precipitation: 'mm' },
    });
  });

  mockUseQuery
    .mockReturnValueOnce(() => ({
      data: mockHistoricData,
      isLoading: false,
      isError: false,
    }))
    .mockReturnValueOnce(() => ({
      data: mockForecastData,
      isLoading: false,
      isError: false,
    }));

  render(<WeatherForecast />);

  // Historic cards
  expect(screen.getByText(/Weather card for 2025-08-06/)).toBeInTheDocument();
  expect(screen.getByText(/Weather card for 2025-08-07/)).toBeInTheDocument();
  expect(screen.getByText(/Weather card for 2025-08-08/)).toBeInTheDocument();

  // Forecast cards
  expect(screen.getByText(/Weather card for 2025-08-10/)).toBeInTheDocument();
  expect(screen.getByText(/Weather card for 2025-08-11/)).toBeInTheDocument();
  expect(screen.getByText(/Weather card for 2025-08-12/)).toBeInTheDocument();
});
