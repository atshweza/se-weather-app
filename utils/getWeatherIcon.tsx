import React, { JSX } from 'react';

import { BoltIcon, CloudIcon, MoonIcon, SunIcon } from '@heroicons/react/16/solid';

export function getWeatherIcon(code: number, size: number, isDay = true): JSX.Element {
  const isLarge = size === 24;
  const containerSize = isLarge ? 'w-24 h-24' : 'w-12 h-12';
  const moonSize = isLarge ? 'w-14 h-14' : 'w-7 h-7';
  const sunSize = isLarge ? 'w-14 h-14' : 'w-7 h-7';
  const cloudSize = isLarge ? 'w-16 h-16' : 'w-8 h-8';
  const sunAndMoonPosition = isLarge ? 'top-2 left-2' : 'top-1 left-1';

  switch (code) {
    case 1000: // Clear
      return <div className={`relative ${containerSize} m-auto`}>{isDay ? <SunIcon className={`${sunSize} text-yellow-400 animate-spin-slow`} /> : <MoonIcon className={`${moonSize} text-yellow-400 animate-sway`} />}</div>;

    case 1003: // Partly Cloudy
      return (
        <div className={`relative ${containerSize} m-auto`}>
          {isDay ? <SunIcon className={`absolute ${sunSize} text-yellow-400 ${sunAndMoonPosition} animate-spin-slow`} /> : <MoonIcon className={`absolute ${moonSize} text-yellow-400 ${sunAndMoonPosition} z-0 -rotate-90`} />}
          <CloudIcon stroke="white" strokeWidth={1} className={`absolute ${cloudSize} ${!isDay ? 'animate-sway' : ''} text-blue-400 bottom-1 right-1 z-10`} />
        </div>
      );

    case 1006:
    case 1009: // Cloudy / Overcast
      return (
        <div className={`relative ${containerSize} m-auto`}>
          <CloudIcon stroke="white" strokeWidth={1} className={`${cloudSize} text-blue-400`} />
        </div>
      );

    case 1087:
    case 1273:
    case 1276: // Thunder
      return (
        <div className={`relative ${containerSize} m-auto`}>
          <CloudIcon stroke="white" strokeWidth={1} className={`${cloudSize} text-blue-500`} />
          <BoltIcon className="absolute w-5 h-5 text-yellow-300 bottom-0 right-0 animate-pulse" />
        </div>
      );

    default: // Default cloudy
      return (
        <div className={`relative ${containerSize} m-auto`}>
          <CloudIcon stroke="white" strokeWidth={1} className={`absolute ${cloudSize} top-0 left-0 text-blue-300 animate-sway`} />
          <CloudIcon stroke="white" strokeWidth={1} className={`absolute ${cloudSize} top-1 left-2 text-blue-500 animate-sway`} style={{ animationDelay: '0.5s' }} />
        </div>
      );
  }
}
