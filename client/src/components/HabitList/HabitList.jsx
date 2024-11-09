import * as React from "react";
import axios from "axios";
import HabitCard from "../HabitCard/HabitCard";
import NewHabit from "../NewHabit/NewHabit";
import EditHabit from "../EditHabit/EditHabit";
import CompletedHabit from "../CompletedHabit/CompletedHabit";

const HabitList = () => {
  const [habits, setHabits] = React.useState([]);
  const [showNewCard, setShowNewCard] = React.useState(false);
  const [newCard, setNewCard] = React.useState({
    title: "",
    description: "",
    totalDays: 0,
  });
  const [editHabit, setEditHabit] = React.useState(null);
  const [completedHabit, setCompletedHabit] = React.useState(null);

  React.useEffect(() => {
    fetchHabits();
  }, []);

  const url = "http://localhost:3000/api/v1/habits/";

  const fetchHabits = async () => {
    try {
      const response = await axios.get(`${url}`);
      setHabits(response.data);
    } catch (error) {
      console.error("Error while fetching habits: ", error);
    }
  };

  const handleAdd = () => {
    setShowNewCard(true);
  };

  const handleEdit = (habit) => {
    setEditHabit(habit);
  };

  const handleDelete = async (habit) => {
    try {
      await axios.delete(`${url}${habit._id}`);
      fetchHabits();
    } catch (error) {
      console.error("Error deleting habit:", error);
    }
  };

  const handleComplete = async (habit) => {
    if (habit.totalDays - habit.streakCount === 1) {
      setCompletedHabit(habit);
    } else {
      try {
        const currentDate = new Date().toISOString();
        await axios.patch(`${url}${habit._id}`, {
          ...habit,
          streakCount: habit.streakCount + 1,
          date: currentDate,
        });
        fetchHabits();
      } catch (error) {
        console.error("Error completing habit:", error);
      }
    }
  };

  const handleSave = async () => {
    try {
      await axios.post(`${url}`, {
        ...newCard,
        userId: "667b688052b65d1e5e7011ae",
      });
      setShowNewCard(false);
      setNewCard({ title: "", description: "", totalDays: 0 });
      setEditHabit(null);
      fetchHabits();
    } catch (error) {
      console.error("Error while saving habit: ", error);
    }
  };

  const handleNewCardChange = (e) => {
    const { name, value } = e.target;
    setNewCard({ ...newCard, [name]: value });
  };

  const handleCancel = () => {
    setShowNewCard(false);
    setNewCard({ title: "", description: "", totalDays: 0 });
  };

  const handleEditSave = async () => {
    try {
      await axios.patch(`${url}${editHabit._id}`, editHabit);
      setEditHabit(null);
      fetchHabits();
    } catch (error) {
      console.error("Error updating habit:", error);
    }
  };

  const handleCompletedHabit = async (habit) => {
    console.log(habit);
    try {
      const currentDate = new Date().toISOString();
      await axios.put(`${url}${habit._id}`, {
        ...habit,
        streakCount: habit.streakCount + 1,
        date: currentDate,
      });
      fetchHabits();
      setCompletedHabit(null);
    } catch (error) {
      console.error("Error completing habit:", error);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditHabit({ ...editHabit, [name]: value });
  };

  return (
    <div className="m-4 h-full">
      <div className="w-full">
        <h3 className="mx-4 my-2">Your Habits</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {habits.map((habit) => {
            return (
              <HabitCard
                key={habit._id}
                habit={habit}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onComplete={handleComplete}
              />
            );
          })}
        </div>
      </div>
      {completedHabit && (
        <CompletedHabit
          habit={completedHabit}
          handleCompletedHabit={handleCompletedHabit}
        />
      )}
      <div className="w-1/2">
        <h3 className="mx-4 my-2">
          Add New Habit by clicking the below plus icon
        </h3>
        <NewHabit
          showNewCard={showNewCard}
          handleAdd={handleAdd}
          handleCancel={handleCancel}
          newCard={newCard}
          handleSave={handleSave}
          handleNewCardChange={handleNewCardChange}
        />
      </div>
      <EditHabit
        editHabit={editHabit}
        setEditHabit={setEditHabit}
        handleEditChange={handleEditChange}
        handleEditSave={handleEditSave}
      />
    </div>
  );
};

export default HabitList;
