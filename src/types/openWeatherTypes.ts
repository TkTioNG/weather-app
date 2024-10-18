export type OpenWeatherSuccessResponse = {
  cod: number;
  name: string;
  sys: {
    country: string;
  };
  weather: {
    id: number;
    main: string;
  }[];
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
};

export type OpenWeatherFailedResponse = {
  code: number;
  message: string;
};

export type OpenWeatherApiResponse =
  | OpenWeatherSuccessResponse
  | OpenWeatherFailedResponse;
