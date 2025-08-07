'use client';

import React, { useState } from 'react';

import { useWeatherStore } from '@/strore/weatherStore';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';

export default function SearchInput() {
  const [input, setInput] = useState<string>('');
  const setSearchText = useWeatherStore((state) => state.setSearchText);
  return (
    <div className="flex flex-row gap-2">
      <MagnifyingGlassIcon className="size-8 text-white font-bold -scale-x-100" />
      <input
        data-testid="search-input"
        type="text"
        placeholder="Search by City..."
        className="p-2 rounded border w-full max-w-sm"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && input && input.length > 3) {
            setSearchText(input);
          }
        }}
      />
    </div>
  );
}
