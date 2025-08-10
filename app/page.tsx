import Image from 'next/image';

import Header from './components/Header/Header';
import WeatherDetails from './components/WeatherDetails/WeatherDetails';
import WeatherForecast from './components/WeatherForecast/WeatherForecast';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-4 bg-foreground">
        <div className="flex flex-col gap-6 p-4 max-w-3xl mx-auto bg-background rounded border-[#608094] border-4">
          <WeatherDetails />
          <WeatherForecast />
        </div>
      </main>
      <footer className="mt-8 flex flex-col items-center gap-2 text-sm text-white">
        <span>
          Powered by{' '}
          <a href="https://www.weatherapi.com/" title="Free Weather API">
            WeatherAPI.com
          </a>
        </span>
        <span>© {new Date().getFullYear()} SE Weather App. All rights reserved.</span>
      </footer>
    </div>
  );
}
