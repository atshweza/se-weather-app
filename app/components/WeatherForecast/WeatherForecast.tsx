'use client';

import React, { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

async function fetchWeatherForecast() {
  const response = await fetch('/api/weather/forecast');
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
}

async function fetchHistoricWeatherForecast() {
  const response = await fetch('/api/weather/historical');
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
}

export default function WeatherForecast() {
  const [mergedForecast, setMergedForecast] = useState<Forecast>();
  const {
    data: forecastData,
    isLoading: isLoadingForecast,
    isError: isForecastError,
    error: forecastError,
  } = useQuery({
    queryKey: ['forecast'],
    queryFn: fetchWeatherForecast,
  });
  const {
    data: historicData,
    isLoading: isLoadingHistory,
    isError: isHistoricError,
    error: historicError,
  } = useQuery({
    queryKey: ['historical'],
    queryFn: fetchHistoricWeatherForecast,
  });
  useEffect(() => {
    if (Array.isArray(historicData) && forecastData) {
      for (let index = 0; index < historicData.length; index++) {
        forecastData?.forecast?.forecastday.push(historicData[index]?.forecast.forecastday?.[0]);
      }
      setMergedForecast({ ...forecastData });
      console.log('forecastData', forecastData);
    }
  }, [forecastData, historicData]);

  return <div>{JSON.stringify(mergedForecast?.forecastday)}</div>;
}
