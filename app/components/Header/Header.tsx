import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import SearchInput from '../SearchInput/SearchInput';

export default function Header() {
  return (
    <header className="flex flex-row justify-between items-center w-full p-4 text-white">
      <Link href={'/'}>
        <div className="flex flex-row items-center gap-1">
          <Image src="/logo/SE-logo.png" alt="Weather Icon" width={32} height={32} className="object-contain" />
          <div className="flex flex-row text-base leading-none">
            <span className="my-auto font-semibold">SE</span>
            <span className="my-auto hidden lg:inline font-light">-Weather App</span>
          </div>
        </div>
      </Link>
      <SearchInput />
    </header>
  );
}
