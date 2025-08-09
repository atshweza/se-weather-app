'use client';

import React from 'react';

import useWeatherStore from '@/store/weatherStore';
import { formatPrecip, formatPressure, formatTemperature, formatWindSpeed } from '@/utils/formatters';

import WeatherSummerCard from '../WeatherSummerCard/WeatherSummerCard';

const WeatherDetails = () => {
  const weatherForecast = useWeatherStore((state) => state.forecast);
  const activeForecastDay = useWeatherStore((state) => state.activeForecastDay);
  const isLoadingForecast = useWeatherStore((state) => state.isLoadingForecast);

  return (
    <>
      {!isLoadingForecast && weatherForecast ? (
        <div className="flex flex-col text-white">
          <div className=" text-center font-extrabold">{`${weatherForecast?.location.name}, ${weatherForecast?.location.region}, ${weatherForecast?.location.country}`}</div>
          <div className="flex flex-row justify-between py-4">
            <WeatherSummerCard current={activeForecastDay ? activeForecastDay : weatherForecast?.current} size={24} />
            <div className="flex flex-col-reverse md:flex-row md:justify-between md:w-[60%]">
              <div className="text-4xl my-auto font-extralight">{weatherForecast && <span>{formatTemperature(activeForecastDay ? activeForecastDay.temp_c : weatherForecast?.current?.temp_c, activeForecastDay ? activeForecastDay.temp_f : weatherForecast?.current?.temp_f)}</span>}</div>
              <div className="flex flex-col gap-0.5  text-right">
                <div className="flex flex-row gap-1">
                  <label>Wind:</label>
                  {weatherForecast && <span>{formatWindSpeed(activeForecastDay ? activeForecastDay.gust_kph : weatherForecast?.current?.gust_kph, activeForecastDay ? activeForecastDay.gust_mph : weatherForecast?.current?.gust_mph)}</span>}
                </div>
                <div className="flex flex-row gap-1 ">
                  <label>Precip:</label>
                  {weatherForecast && <span>{formatPrecip(activeForecastDay ? activeForecastDay.precip_mm : weatherForecast?.current?.precip_mm, activeForecastDay ? activeForecastDay.precip_in : weatherForecast?.current?.precip_in)}</span>}
                </div>
                <div className="flex flex-row gap-1 ">
                  <label>Pressure:</label>
                  {weatherForecast && <span>{formatPressure(activeForecastDay ? activeForecastDay.pressure_mb : weatherForecast?.current?.pressure_mb, activeForecastDay ? activeForecastDay.pressure_in : weatherForecast?.current?.pressure_in)}</span>}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 items-center">
          <div className="w-64 h-3 bg-foreground rounded" />
          <div className="flex flex-row justify-between py-4 w-full">
            <div className="flex flex-col items-center bg-foreground rounded p-2 space-y-2">
              <div className="w-24 h-3 bg-background rounded" />
              <div className="w-14 h-14 bg-background  rounded-full" />
              <div className="w-24 h-3 bg-background  rounded" />
            </div>
            <div className="w-24 h-12  bg-foreground rounded" />
            <div className="flex flex-col items-center  rounded p-2 space-y-2">
              <div className="w-24 h-3 bg-foreground rounded" />
              <div className="w-24 h-3 bg-foreground rounded" />
              <div className="w-24 h-3 bg-foreground  rounded" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default WeatherDetails;
