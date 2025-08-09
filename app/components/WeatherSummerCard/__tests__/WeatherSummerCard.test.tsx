import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import WeatherSummerCard from '../WeatherSummerCard';

// Mock store
const mockSetActiveForecastDay = jest.fn();
jest.mock('@/store/weatherStore', () => ({
  __esModule: true,
  default: jest.fn((selector) => selector({ setActiveForecastDay: mockSetActiveForecastDay })),
}));

// Mock utils
jest.mock('@/utils/formatters', () => ({
  formatTemperature: jest.fn(() => '20°C'),
}));

jest.mock('@/utils/getWeatherIcon', () => ({
  getWeatherIcon: jest.fn(() => <span>Sunny Icon</span>),
}));
jest.mock('@/utils/mapForecastDayToCurrent', () => ({
  __esModule: true,
  default: jest.fn(() => ({ mapped: true })),
}));

describe('WeatherSummerCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders forecastDay and calls setActiveForecastDay on click', () => {
    const forecastDay = {
      date: '2025-08-11',
      day: {
        condition: { code: 1000 },
        avgtemp_c: 20,
        avgtemp_f: 68,
      },
    } as ForecastDay;
    jest.mock('@/utils/getDayOfWeek', () => ({
      __esModule: true,
      default: jest.fn(() => 'Monday'),
    }));
    render(<WeatherSummerCard forecastDay={forecastDay} />);

    expect(screen.getByText('Monday')).toBeInTheDocument();
    expect(screen.getByText('Sunny Icon')).toBeInTheDocument();
    expect(screen.getByText('20°C')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Monday'));
    expect(mockSetActiveForecastDay).toHaveBeenCalledWith({ mapped: true });
  });

  it('renders current weather when current prop is provided', () => {
    const current = {
      last_updated: '2025-08-11',
      condition: { code: 1000, text: 'Sunny' },
      is_day: 1,
    } as unknown as Current;

    jest.mock('@/utils/getDayOfWeek', () => ({
      __esModule: true,
      default: jest.fn(() => 'Monday'),
    }));

    render(<WeatherSummerCard current={current} />);

    expect(screen.getByText('Monday')).toBeInTheDocument();
    expect(screen.getByText('Sunny Icon')).toBeInTheDocument();
    expect(screen.getByText('Sunny')).toBeInTheDocument();
  });

  it('renders forecastDay weather when forecastDay prop is provided', () => {
    const forecastDay = {
      date: '2025-08-11',
      day: {
        condition: { code: 1000 },
        avgtemp_c: 20,
        avgtemp_f: 68,
      },
    } as ForecastDay;
    jest.mock('@/utils/getDayOfWeek', () => ({
      __esModule: true,
      default: jest.fn(() => 'Mon'),
    }));
    render(<WeatherSummerCard forecastDay={forecastDay} short={true} />);

    expect(screen.getByText('Mon')).toBeInTheDocument();
    expect(screen.getByText('Sunny Icon')).toBeInTheDocument();
    expect(screen.getByText('20°C')).toBeInTheDocument();
  });
});
