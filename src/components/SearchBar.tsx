import { useForm } from "react-hook-form";
import useWeatherHistory from "@/stores/useWeatherHistory";
import { getWeatherByCity } from "@/apis/openWeatherApi";
import { Button } from "./ui/button";
import { MagnifyingGlassIcon, ReloadIcon } from "@radix-ui/react-icons";
import ThemeToggle from "./ThemeToogle";
import { ErrorMessage } from "@hookform/error-message";

export default function SearchBar() {
  const {
    register,
    formState: { isSubmitting, errors },
    handleSubmit,
    setError,
    resetField,
  } = useForm();
  const addWeather = useWeatherHistory((state) => state.addWeather);

  const checkWeather = async (data: Record<string, string>) => {
    /** @todo through react-query? */
    const weatherResp = await getWeatherByCity(data.city);

    if (!weatherResp.success) {
      setError(
        "city",
        { type: "custom", message: weatherResp.errorMessage },
        { shouldFocus: true }
      );
      return;
    }
    addWeather(weatherResp.data);
    resetField("city");
  };

  return (
    <div className="flex gap-3">
      <ThemeToggle />
      <form className="flex flex-1 gap-3" onSubmit={handleSubmit(checkWeather)}>
        <fieldset className="flex-1 relative">
          <label htmlFor="city" className="sr-only">
            City
          </label>
          <input
            {...register("city", { required: "City name is required" })}
            id="city"
            placeholder="City"
            className="flex-1 rounded-lg h-8 w-full px-2 text-sm bg-[#ffffff40] dark:bg-indigo-950"
            aria-invalid={!!errors.city}
            aria-errormessage={"err-city"}
          />
          <ErrorMessage
            errors={errors}
            name="city"
            render={({ message }) => (
              <p
                id="err-city"
                className="text-red-600 dark:text-red-500 text-sm pl-2 pt-1 absolute max-w-full"
              >
                {message.charAt(0).toUpperCase() + message.slice(1)}
              </p>
            )}
          />
        </fieldset>
        <Button
          variant="default"
          size="icon"
          type="submit"
          className="rounded-lg p-0 bg-purple-900 dark:bg-violet-950"
          disabled={isSubmitting}
          aria-disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ReloadIcon className="h-5 w-5 text-white animate-spin" />
          ) : (
            <MagnifyingGlassIcon className="h-5 w-5 text-white" />
          )}
        </Button>
      </form>
    </div>
  );
}
