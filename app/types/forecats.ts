interface Day {
  maxtemp_c: number;
  maxtemp_f: number;
  mintemp_c: number;
  mintemp_f: number;
  avgtemp_c: number;
  avgtemp_f: number;
  maxwind_mph: number;
  maxwind_kph: number;
  totalprecip_mm: number;
  totalprecip_in: number;
  totalsnow_cm?: number;
  avgvis_km: number;
  avgvis_miles: number;
  avghumidity: number;
  condition: Condition;
  uv?: number;
  air_quality?: AirQuality;
}

interface Astro {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moon_phase: string;
  moon_illumination: string;
}

interface Hour {
  time_epoch: number;
  time: string;
  temp_c: number;
  temp_f: number;
  is_day: 1 | 0;
  condition: Condition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  windchill_c?: number;
  windchill_f?: number;
  heatindex_c?: number;
  heatindex_f?: number;
  dewpoint_c?: number;
  dewpoint_f?: number;
  will_it_rain?: number; // 1 or 0
  will_it_snow?: number; // 1 or 0
  vis_km: number;
  vis_miles: number;
  gust_mph: number;
  gust_kph: number;
  uv?: number;
  air_quality?: AirQuality;
}

interface ForecastDay {
  date: string;
  date_epoch: number;
  day: Day;
  astro: Astro;
  hour?: Hour[];
}

interface Forecast {
  forecastday: ForecastDay[];
}

interface ForecastResponse {
  location: Location;
  forecast: Forecast;
}
