import React, { JSX } from 'react';

import { BoltIcon, CloudIcon, SunIcon } from '@heroicons/react/16/solid';

export function getWeatherIcon(code: number, size: number): JSX.Element {
  switch (code) {
    case 1000: // Sunny
      return <SunIcon className="w-12 h-12 text-yellow-400 animate-spin-slow" fontSize={size} />;

    case 1003: // Partly cloudy
      return (
        <div className="relative w-12 h-12">
          <SunIcon className="absolute w-8 h-8 text-yellow-400 -top-1 -left-1 z-0 animate-spin-slow" fontSize={size} />
          <CloudIcon className="absolute w-10 h-10 text-blue-400 top-1 left-2 z-10" fontSize={size} />
        </div>
      );

    case 1006:
    case 1009: // Cloudy / Overcast
      return <CloudIcon className="w-12 h-12 text-blue-400" fontSize={size} />;

    case 1087:
    case 1273:
    case 1276: // Thunder
      return (
        <div className="relative w-12 h-12">
          <CloudIcon className="w-12 h-12 text-blue-500" fontSize={size} />
          <BoltIcon className="absolute w-6 h-6 text-yellow-300 bottom-0 right-0 animate-pulse" fontSize={size} />
        </div>
      );

    default:
      // Default: Two overlapping clouds
      return (
        <div className="relative w-12 h-12">
          <CloudIcon className="absolute w-10 h-10 top-0 left-0 animate-sway" style={{ color: 'var(--cloud-color-1)' }} />
          <CloudIcon className="absolute w-10 h-10 top-1 left-2 animate-sway" style={{ color: 'var(--cloud-color-2)', animationDelay: '0.5s' }} />
        </div>
      );
  }
}
