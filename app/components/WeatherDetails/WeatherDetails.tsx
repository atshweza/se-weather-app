'use client';

import React from 'react';

import { useWeatherStore } from '@/strore/weatherStore';

import WeatherSummerCard from '../WeatherSummerCard/WeatherSummerCard';

const WeatherDetails = () => {
  const weatherForecast = useWeatherStore((state) => state.forecast);
  if (!weatherForecast) return <></>;
  const { current, location } = weatherForecast;
  return (
    <div className="flex flex-col text-white">
      <div className=" text-center font-extrabold">{`${location.name}, ${location.region}, ${location.country}`}</div>
      <div className="flex flex-row justify-between">
        <WeatherSummerCard current={current} size={8} />
        <div className="flex flex-col  text-right">
          <div>
            <label>Wind:</label>
            <span>{current?.gust_kph}</span>
          </div>
          <div>
            <label>Precip:</label>
            <span>{current?.gust_kph}</span>
          </div>
          <div>
            <label>Pressure:</label>
            <span>{current?.pressure_in}</span>
          </div>
          <div>
            <span>{current?.temp_c}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WeatherDetails;
