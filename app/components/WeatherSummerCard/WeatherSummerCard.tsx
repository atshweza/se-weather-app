import React from 'react';

import getDayOfWeek from '@/utils/getDayOfWeek';
import { getWeatherIcon } from '@/utils/getWeatherIcon';

type WeatherSummerCardProps = {
  forecastDay?: ForecastDay;
  current?: Current;
  short?: boolean;
  size?: number;
};
const WeatherSummerCard: React.FC<WeatherSummerCardProps> = ({ forecastDay, current, short = false, size = 6 }) => {
  return (
    <>
      {forecastDay && (
        <div className="text-white font-bold text-center items-center">
          <h1>{getDayOfWeek(forecastDay.date, short)}</h1>
          <div className="w-full">{getWeatherIcon(forecastDay.day.condition.code, size)}</div>
          <div className="font-extralight">{forecastDay.day.avgtemp_c}</div>
        </div>
      )}
      {current && (
        <div className="text-white font-bold text-center items-center">
          <h1>{getDayOfWeek(current.last_updated, short)}</h1>
          <div className="w-full">{getWeatherIcon(current.condition.code, size, current.is_day)}</div>
          <div className="font-extralight">{current.temp_c}</div>
        </div>
      )}
    </>
  );
};
export default WeatherSummerCard;
