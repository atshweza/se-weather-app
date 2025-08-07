import React from 'react';

import SearchInput from '../SeachInput/SearchInput';

export default function Header() {
  return (
    <header className="flex flex-row justify-between h-[8vh] w-full p-4 text-white">
      <div>SE-Weather App</div>
      <SearchInput />
    </header>
  );
}
