import HeaderComponent from "./components/HeaderComponent/HeaderComponent";
import HabitList from "./components/HabitList/HabitList";
import "./App.css";

function App() {
  return (
    <div className="bg-gray-300 h-full overflow-y-auto">
      <HeaderComponent
        className="bg-blue-500 text-white p-4 text-center"
        heading="Digital Habit Tracker"
      />
      <HabitList/>
    </div>
  );
}

export default App;
