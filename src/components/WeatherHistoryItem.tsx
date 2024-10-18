import useWeatherHistory from "@/stores/useWeatherHistory";
import React, { memo } from "react";
import { Button } from "./ui/button";
import { MagnifyingGlassIcon, TrashIcon } from "@radix-ui/react-icons";
import dayjs from "dayjs";

function HistoryItemButton({
  label,
  children,
  onClick,
}: {
  label?: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Button
      variant="default"
      size="icon"
      className="rounded-full p-0 bg-transparent border border-zinc-400"
      onClick={onClick}
      aria-label={label}
    >
      {children}
    </Button>
  );
}

function WeatherHistoryItem({ weatherName }: { weatherName: string }) {
  const weatherInfo = useWeatherHistory(
    (state) => state.weatherRecord[weatherName]
  );
  const selectWeather = useWeatherHistory((state) => state.selectWeather);
  const removeWeather = useWeatherHistory((state) => state.removeWeather);

  return (
    <div className="rounded-2xl bg-indigo-950 p-4 flex gap-3">
      <div className="flex flex-1 flex-col sm:flex-row sm:justify-between sm:items-center truncate">
        <p>{weatherInfo.name}</p>
        <p className="text-zinc-400 truncate sm:text-sm">
          {dayjs(weatherInfo.timestamp).format("DD-MM-YYYY hh:mma")}
        </p>
      </div>
      <div className="flex gap-3 items-center">
        <HistoryItemButton
          label={`View ${weatherInfo.name} weather`}
          onClick={() => selectWeather(weatherInfo.name)}
        >
          <MagnifyingGlassIcon className="h-4 w-4 text-zinc-400" />
        </HistoryItemButton>
        <HistoryItemButton
          label={`Remove ${weatherInfo.name} weather record`}
          onClick={() => removeWeather(weatherInfo.name)}
        >
          <TrashIcon className="h-4 w-4 text-zinc-400" />
        </HistoryItemButton>
      </div>
    </div>
  );
}

export default memo(WeatherHistoryItem);
