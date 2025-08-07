import Image from 'next/image';
import React from 'react';

import SearchInput from '../SeachInput/SearchInput';

export default function Header() {
  return (
    <header className="flex flex-row justify-between h-[8vh] w-full p-4 text-white">
      <div className="flex flex-row gap-0.5">
        <Image src="/logo/SE-logo.png" alt="Weather Icon" width={41} height={41} />
        <div className="flex flex-row">
          <span className="my-auto">SE</span>
          <span className="my-auto hidden lg:block">-Weather App</span>
        </div>
      </div>
      <SearchInput />
    </header>
  );
}
