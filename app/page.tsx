import Header from './components/Header/Header';
import WeatherForecast from './components/WeatherForecast/WeatherForecast';

export default function Home() {
  return (
    <div className="">
      <Header />
      <main className="w-full h-[92vh] p-4 bg-foreground">
        <WeatherForecast />
      </main>
    </div>
  );
}
