import Header from './components/Header/Header';
import WeatherForecast from './components/WeatherForecast/WeatherForecast';

export default function Home() {
  return (
    <div className="">
      <Header />
      <main className="w-full p-4">
        <WeatherForecast />
      </main>
    </div>
  );
}
