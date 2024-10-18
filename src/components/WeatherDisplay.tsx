import useWeatherHistory from "@/stores/useWeatherHistory";
import cloudLogo from "@/assets/cloud.png";
import sunLogo from "@/assets/sun.png";
import dayjs from "dayjs";
import { useEffect } from "react";
import { getWeatherByCity } from "@/apis/openWeatherApi";

export default function WeatherDisplay() {
  const selectedWeather = useWeatherHistory(
    (state) =>
      state.selectedWeatherName &&
      state.weatherRecord[state.selectedWeatherName]
  );
  const addWeather = useWeatherHistory((state) => state.addWeather);

  useEffect(() => {
    let controller: AbortController | null = null;
    if (
      selectedWeather &&
      !dayjs(selectedWeather.timestamp).isSame(dayjs(), "day")
    ) {
      const cityName = selectedWeather.name;
      controller = new AbortController();
      async function updateOutdatedWeather() {
        const weatherResp = await getWeatherByCity(cityName, {
          signal: controller?.signal,
        });

        if (weatherResp.success) {
          addWeather(weatherResp.data);
        }
      }
      updateOutdatedWeather();
    }
    return () => {
      if (controller) {
        controller.abort();
      }
    };
  }, [selectedWeather, addWeather]);

  /** @refer https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2 */
  const isSunny = !selectedWeather || selectedWeather.weatherTypeId === 800;

  return (
    <div className="flex">
      <img
        src={isSunny ? sunLogo : cloudLogo}
        className="absolute w-36 -top-14 right-2 sm:w-56 sm:-top-16 sm:right-4"
        alt={isSunny ? "Sunny day icon" : "Cloudy day icon"}
      />
      {selectedWeather ? (
        <>
          <div className="sm:flex-1">
            <h6>Today's Weather</h6>
            <h3 className="text-7xl sm:text-8xl font-bold text-purple-800 dark:text-white">
              {selectedWeather.temp}&deg;
            </h3>
            <p>
              H: {selectedWeather.maxTemp}&deg; L: {selectedWeather.minTemp}
              &deg;
            </p>
            <div className="flex justify-between text-zinc-500 dark:text-white">
              <p className="font-bold">{selectedWeather.name}</p>
              <p className="hidden sm:block">
                {dayjs(selectedWeather.timestamp).format("DD-MM-YYYY hh:mma")}
              </p>
              <p className="hidden sm:block">
                Humidity: {selectedWeather.humidity}&#37;
              </p>
              <p className="hidden sm:block">{selectedWeather.weatherType}</p>
            </div>
          </div>
          <div className="flex flex-1 flex-col-reverse items-end truncate sm:hidden text-zinc-500 dark:text-white">
            <p className="text-right w-full truncate">
              {dayjs(selectedWeather.timestamp).format("DD-MM-YYYY hh:mma")}
            </p>
            <p className="text-right w-full truncate">
              Humidity: {selectedWeather.humidity}&#37;
            </p>
            <p className="text-right w-full truncate">
              {selectedWeather.weatherType}
            </p>
          </div>
        </>
      ) : (
        <div className="sm:flex-1">
          <h6>Today's Weather</h6>
          <h3 className="text-8xl font-bold text-purple-800 dark:text-white">
            -&deg;
          </h3>
          <p className="italic text-zinc-500 dark:text-zinc-400">
            Please type a city on search bar above to display its current
            weather.
          </p>
        </div>
      )}
    </div>
  );
}
