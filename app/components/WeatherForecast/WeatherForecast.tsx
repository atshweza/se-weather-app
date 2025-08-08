'use client';

import React, { useEffect, useState } from 'react';

import { useWeatherStore } from '@/strore/weatherStore';
import { useQuery } from '@tanstack/react-query';

import WeatherSummerCard from '../WeatherSummerCard/WeatherSummerCard';

async function fetchWeatherForecast(searchLocation: string) {
  const response = searchLocation ? await fetch(`/api/weather/forecast?q=${searchLocation}`) : await fetch('/api/weather/forecast');
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
}

async function fetchHistoricWeatherForecast(searchLocation: string) {
  const response = searchLocation ? await fetch(`/api/weather/historical?q=${searchLocation}`) : await fetch('/api/weather/historical');
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
}

export default function WeatherForecast() {
  const weatherForecast = useWeatherStore((state) => state.forecast);
  const setForecast = useWeatherStore((state) => state.setForecast);
  const setIsLoadingForecast = useWeatherStore((state) => state.setIsLoadingForecast);
  const searchText = useWeatherStore((state) => state.searchText);

  const {
    data: historicData,
    isLoading: isLoadingHistory,
    isError: isHistoricError,
    error: historicError,
  } = useQuery({
    queryKey: ['historical', searchText],
    queryFn: () => fetchHistoricWeatherForecast(searchText),
    refetchInterval: 3600000, // 1 hour in milliseconds
    refetchOnWindowFocus: false,
  });

  const {
    data: forecastData,
    isLoading: isLoadingForecast,
    isError: isForecastError,
    error: forecastError,
  } = useQuery({
    queryKey: ['forecast', searchText],
    queryFn: () => fetchWeatherForecast(searchText),
    refetchInterval: 3600000, // 1 hour in milliseconds
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (Array.isArray(historicData) && historicData.length > 0 && forecastData) {
      for (let index = 0; index < historicData.length; index++) {
        forecastData?.forecast?.forecastday?.push(historicData[index]?.forecast.forecastday?.[0]);
      }
      setForecast(forecastData);
    }
    setIsLoadingForecast(isLoadingForecast && isLoadingHistory);
  }, [forecastData, historicData, isLoadingForecast, isLoadingHistory]);

  return (
    <>
      {isLoadingForecast || isLoadingHistory ? (
        <div className="grid grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex flex-col items-center bg-foreground rounded p-2 space-y-2">
              <div className="w-8 h-3 bg-background rounded" />
              <div className="w-10 h-10 bg-background  rounded-full" />
              <div className="w-8 h-3 bg-background  rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-6 gap-4 max-h">
          {weatherForecast?.forecast &&
            weatherForecast?.forecast?.forecastday &&
            weatherForecast?.forecast.forecastday
              ?.sort((a: ForecastDay, b: ForecastDay) => a.date_epoch - b.date_epoch)
              ?.map((day: ForecastDay, index: number) => {
                if (weatherForecast?.current?.last_updated.includes(day.date)) return null;
                return <WeatherSummerCard key={`${index}_${day.date_epoch}`} forecastDay={day} short={true} />;
              })}
        </div>
      )}
    </>
  );
}
