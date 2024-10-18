import useWeatherHistory from "@/stores/useWeatherHistory";
import WeatherHistoryItem from "./WeatherHistoryItem";

export default function WeatherHistoryList() {
  const weatherNameList = useWeatherHistory((state) => state.weatherNameList);

  return (
    <div className="rounded-2xl bg-[#ffffff40] dark:bg-[#00000045] p-4 mt-4">
      <h6 className="pb-4">Search History</h6>
      <div className="flex flex-col gap-4">
        {weatherNameList.map((weatherName) => (
          <WeatherHistoryItem key={weatherName} weatherName={weatherName} />
        ))}
        {weatherNameList.length === 0 && (
          <h6 className="italic text-zinc-500 dark:text-zinc-400">
            No search history found.
          </h6>
        )}
      </div>
    </div>
  );
}
