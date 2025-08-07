'use client';

import React from 'react';

import { useWeatherStore } from '@/strore/weatherStore';
import { formatPrecip, formatPressure, formatTemperature, formatWindSpeed } from '@/utils/formatters';

import WeatherSummerCard from '../WeatherSummerCard/WeatherSummerCard';

const WeatherDetails = () => {
  const weatherForecast = useWeatherStore((state) => state.forecast);
  const activeForecastDay = useWeatherStore((state) => state.activeForecastDay);
  if (!weatherForecast) return <></>;
  const { current, location } = weatherForecast;
  return (
    <div className="flex flex-col text-white">
      <div className=" text-center font-extrabold">{`${location.name}, ${location.region}, ${location.country}`}</div>
      <div className="flex flex-row justify-between py-4">
        <WeatherSummerCard current={activeForecastDay ? activeForecastDay : current} size={8} />
        <div className="text-4xl my-auto font-extralight">
          <span>{formatTemperature(activeForecastDay ? activeForecastDay.temp_c : current?.temp_c, activeForecastDay ? activeForecastDay.temp_f : current?.temp_f)}</span>
        </div>
        <div className="flex flex-col gap-0.5  text-right">
          <div className="flex flex-row gap-1">
            <label>Wind:</label>
            <span>{formatWindSpeed(activeForecastDay ? activeForecastDay.gust_kph : current?.gust_kph, activeForecastDay ? activeForecastDay.gust_mph : current?.gust_mph)}</span>
          </div>
          <div className="flex flex-row gap-1 ">
            <label>Precip:</label>
            <span>{formatPrecip(activeForecastDay ? activeForecastDay.precip_mm : current?.precip_mm, activeForecastDay ? activeForecastDay.precip_in : current?.precip_in)}</span>
          </div>
          <div className="flex flex-row gap-1 ">
            <label>Pressure:</label>
            <span>{formatPressure(activeForecastDay ? activeForecastDay.pressure_mb : current?.pressure_mb, activeForecastDay ? activeForecastDay.pressure_in : current?.pressure_in)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WeatherDetails;
