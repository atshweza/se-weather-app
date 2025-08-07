'use client';

import React from 'react';

import { useWeatherStore } from '@/strore/weatherStore';

import WeatherSummerCard from '../WeatherSummerCard/WeatherSummerCard';

const WeatherDetails = () => {
  const weatherForecast = useWeatherStore((state) => state.forecast);
  const activeForecastDay = useWeatherStore((state) => state.activeForecastDay);
  if (!weatherForecast) return <></>;
  const { current, location } = weatherForecast;
  return (
    <div className="flex flex-col text-white">
      <div className=" text-center font-extrabold">{`${location.name}, ${location.region}, ${location.country}`}</div>
      <div className="flex flex-row justify-between">
        <WeatherSummerCard current={activeForecastDay ? activeForecastDay : current} size={8} />
        <div className="flex flex-col  text-right">
          <div>
            <label>Wind:</label>
            <span>{activeForecastDay ? activeForecastDay.gust_kph : current?.gust_kph}</span>
          </div>
          <div>
            <label>Precip:</label>
            <span>{activeForecastDay ? activeForecastDay.precip_in : current?.precip_in}</span>
          </div>
          <div>
            <label>Pressure:</label>
            <span>{activeForecastDay ? activeForecastDay.pressure_in : current?.pressure_in}</span>
          </div>
          <div>
            <span>{activeForecastDay ? activeForecastDay.temp_c : current?.temp_c}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WeatherDetails;
