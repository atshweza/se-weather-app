import Header from './components/Header/Header';
import WeatherDetails from './components/WeatherDetails/WeatherDetails';
import WeatherForecast from './components/WeatherForecast/WeatherForecast';

export default function Home() {
  return (
    <div className="">
      <Header />
      <main className="w-full h-[100vh] p-4 bg-foreground">
        <div className="flex flex-col gap-6 p-4 max-w-3xl mx-auto bg-background rounded border-[#608094] border-4">
          <WeatherDetails />
          <WeatherForecast />
        </div>
      </main>
    </div>
  );
}
