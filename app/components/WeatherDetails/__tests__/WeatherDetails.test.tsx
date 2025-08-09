import useWeatherStore from '@/store/weatherStore';
import { act, render, screen } from '@testing-library/react';

import WeatherDetails from '../WeatherDetails';

const mockForecast = {
  location: { name: 'Cape Town', region: 'Western Cape', country: 'South Africa' },
  current: {
    last_updated_epoch: 1673620200,
    last_updated: '2023-01-13 06:30',
    temp_c: 20,
    temp_f: 68,
    gust_kph: 15,
    gust_mph: 9.3,
    precip_mm: 0.2,
    precip_in: 0.01,
    pressure_mb: 1015,
    pressure_in: 29.97,
    condition: {
      text: 'Clear',
      icon: '',
      code: 1000,
    },
  },
  forecast: {},
};

const mockSelectForecast = {
  location: { name: 'Cape Town', region: 'Western Cape', country: 'South Africa' },
  current: {
    last_updated_epoch: 1673620200,
    last_updated: '2023-01-14 06:30',
    temp_c: 25,
    temp_f: 77,
    gust_kph: 15,
    gust_mph: 9.3,
    precip_mm: 0.2,
    precip_in: 0.01,
    pressure_mb: 1015,
    pressure_in: 29.97,
    condition: {
      text: 'Clear',
      icon: '',
      code: 1000,
    },
  },
  forecast: {},
};

const setupWeather = (state: Partial<ReturnType<typeof useWeatherStore.getState>>) => {
  act(() => {
    useWeatherStore.setState({
      forecast: mockForecast as WeatherForecast,
      activeForecastDay: undefined,
      isLoadingForecast: false,
      units: {
        temperature: 'c',
        windSpeed: 'kph',
        pressure: 'mb',
        visibility: 'km',
        precipitation: 'mm',
      },
      ...state,
    });
  });
};

describe('WeatherDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setupWeather({});
  });

  afterEach(() => {
    act(() => {
      useWeatherStore.setState(useWeatherStore.getInitialState());
    });
  });

  it('renders loading skeleton when isLoadingForecast is true', () => {
    setupWeather({ forecast: undefined, isLoadingForecast: true });
    render(<WeatherDetails />);
    expect(document.querySelector('.flex.flex-col.gap-4.items-center')).toBeInTheDocument();
  });

  it('renders forecast details when data is available in metric ', () => {
    render(<WeatherDetails />);
    expect(screen.getByText(/Cape Town, Western Cape, South Africa/)).toBeInTheDocument();
    expect(screen.getByText(/20°C/)).toBeInTheDocument();
    expect(screen.getByText(/15.0 kph/)).toBeInTheDocument();
    expect(screen.getByText(/0.2 mm/)).toBeInTheDocument();
    expect(screen.getByText(/1015 mb/)).toBeInTheDocument();
  });

  it('renders forecast details when data is available in imperial ', () => {
    setupWeather({
      units: {
        temperature: 'f',
        windSpeed: 'mph',
        pressure: 'in',
        visibility: 'miles',
        precipitation: 'in',
      },
    });
    render(<WeatherDetails />);
    expect(screen.getByText(/Cape Town, Western Cape, South Africa/)).toBeInTheDocument();
    expect(screen.getByText(/68°F/)).toBeInTheDocument();
    expect(screen.getByText(/9.3 mph/)).toBeInTheDocument();
    expect(screen.getByText(/0.01 in/)).toBeInTheDocument();
    expect(screen.getByText(/29.97 in/)).toBeInTheDocument();
  });

  it('renders forecast details with correct overview for current weather', () => {
    render(<WeatherDetails />);
    expect(screen.getByText(/Cape Town, Western Cape, South Africa/)).toBeInTheDocument();
    expect(screen.getByText(/20°C/)).toBeInTheDocument();
    expect(screen.getByText(/15.0 kph/)).toBeInTheDocument();
    expect(screen.getByText(/0.2 mm/)).toBeInTheDocument();
    expect(screen.getByText(/1015 mb/)).toBeInTheDocument();
    expect(screen.getByText(/Clear/)).toBeInTheDocument();
    expect(screen.getByText(/Friday/)).toBeInTheDocument();
  });

  it('renders update forecast details on selection', () => {
    render(<WeatherDetails />);
    expect(screen.getByText(/Cape Town, Western Cape, South Africa/)).toBeInTheDocument();
    expect(screen.getByText(/20°C/)).toBeInTheDocument();
    expect(screen.getByText(/15.0 kph/)).toBeInTheDocument();
    expect(screen.getByText(/0.2 mm/)).toBeInTheDocument();
    expect(screen.getByText(/1015 mb/)).toBeInTheDocument();
    expect(screen.getByText(/Clear/)).toBeInTheDocument();
    expect(screen.getByText(/Friday/)).toBeInTheDocument();

    act(() => {
      useWeatherStore.setState({
        activeForecastDay: mockSelectForecast.current as Current,
      });
    });
    expect(screen.getByText(/Cape Town, Western Cape, South Africa/)).toBeInTheDocument();
    expect(screen.getByText(/25°C/)).toBeInTheDocument();
    expect(screen.getByText(/15.0 kph/)).toBeInTheDocument();
    expect(screen.getByText(/0.2 mm/)).toBeInTheDocument();
    expect(screen.getByText(/1015 mb/)).toBeInTheDocument();
    expect(screen.getByText(/Clear/)).toBeInTheDocument();
    expect(screen.getByText(/Saturday/)).toBeInTheDocument();
  });
});
