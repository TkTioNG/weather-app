import "./App.css";
import SearchBar from "@/components/SearchBar";
import WeatherDisplay from "@/components/WeatherDisplay";
import WeatherHistoryList from "@/components/WeatherHistoryList";

function App() {
  return (
    <div className="text-white">
      <SearchBar />
      <div className="rounded-2xl bg-[#00000040] border-none relative px-4 py-4 mt-24 sm:px-8 sm:py-8 sm:mt-16">
        <WeatherDisplay />
        <WeatherHistoryList />
      </div>
    </div>
  );
}

export default App;
