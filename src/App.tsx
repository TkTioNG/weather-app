import "./App.css";
import SearchBar from "@/components/SearchBar";
import WeatherDisplay from "@/components/WeatherDisplay";
import WeatherHistoryList from "@/components/WeatherHistoryList";
import { ThemeProvider } from "@/theme-provider";

function App() {
  return (
    <ThemeProvider>
      <div className="text-black dark:text-white">
        <SearchBar />
        <div className="rounded-2xl bg-[#ffffff40] border border-white dark:bg-[#00000040] dark:border-none relative px-4 py-4 mt-24 sm:px-8 sm:py-8 sm:mt-16">
          <WeatherDisplay />
          <WeatherHistoryList />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
