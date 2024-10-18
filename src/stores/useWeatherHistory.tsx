import { WeatherInfo } from "@/types/commonTypes";
import { create } from "zustand";

type WeatherHistoryStoreState = {
  selectedWeatherName: string | null;
  weatherRecord: Record<string, WeatherInfo>;
  // Ordered list
  weatherNameList: string[];
};

type WeatherHistoryStoreAction = {
  addWeather: (weather: WeatherInfo) => void;
  selectWeather: (name: string) => void;
  removeWeather: (name: string) => void;
};

const useWeatherHistory = create<
  WeatherHistoryStoreState & WeatherHistoryStoreAction
>((set) => ({
  selectedWeatherName: null,
  weatherRecord: {},
  weatherNameList: [],
  addWeather: (weather) =>
    set((state) => ({
      selectedWeatherName: weather.name,
      weatherRecord: {
        ...state.weatherRecord,
        [weather.name]: weather,
      },
      // `unshift` new weather at the front of the list
      weatherNameList:
        weather.name in state.weatherRecord
          ? [weather.name].concat(
              state.weatherNameList.filter((name) => name !== weather.name)
            )
          : [weather.name].concat(state.weatherNameList),
    })),
  selectWeather: (weatherName) =>
    set(() => ({
      selectedWeatherName: weatherName,
    })),
  removeWeather: (weatherName) =>
    set((state) => {
      if (weatherName in state.weatherRecord) {
        const { [weatherName]: _removed, ...weatherRecord } =
          state.weatherRecord;

        return {
          weatherRecord,
          weatherNameList: state.weatherNameList.filter(
            (name) => name !== weatherName
          ),
        };
      }
      return state;
    }),
}));

export default useWeatherHistory;
