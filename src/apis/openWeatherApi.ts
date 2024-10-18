import { WeatherInfo } from "@/types/commonTypes";
import { OpenWeatherApiResponse } from "@/types/openWeatherTypes";

/**
 * For the api spec, please view https://openweathermap.org/current#fields_json.
 * Please add your open weather api key as `VITE_OPEN_WEATHER_API_KEY` in your .env
 * @param {string} city
 */
export async function getWeatherByCity(
  city: string,
  { signal }: { signal?: AbortSignal } = {}
): Promise<
  | { success: true; data: WeatherInfo }
  | { success: false; errorMessage: string }
> {
  try {
    const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
    const searchParams = new URLSearchParams({
      q: city,
      /** @note api key should be from server or through api layer */
      appid: import.meta.env.VITE_OPEN_WEATHER_API_KEY,
      units: "metric",
    });
    const resp = await fetch(new URL(`${baseUrl}?${searchParams}`), { signal });
    const respData = (await resp.json()) as OpenWeatherApiResponse;

    if ("message" in respData) {
      /** @todo convert error message? */
      return {
        success: false,
        errorMessage: respData.message,
      };
    }
    return {
      success: true,
      data: {
        name: `${respData.name}, ${respData.sys.country}`,
        temp: Math.round(respData.main.temp),
        minTemp: Math.round(respData.main.temp_min),
        maxTemp: Math.round(respData.main.temp_max),
        humidity: respData.main.humidity,
        weatherTypeId: respData.weather[0].id,
        weatherType: respData.weather[0].main,
        timestamp: Date.now(),
      },
    };
  } catch (e) {
    return {
      success: false,
      errorMessage: (e as Error).message,
    };
  }
}
