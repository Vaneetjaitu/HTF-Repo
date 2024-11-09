import React from "react";
import HabitCard from "../HabitCard/HabitCard";

const CompletedHabitList = (props) => {
  const {completedHabits, handleComplete, handleDelete, handleEdit} = props;
  return (
    <>
      <h3 className="mx-4 my-2">Completed Habits</h3>
      <div className="grid grid-cols-1 gap-4">
        {completedHabits.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onComplete={handleComplete}
          />
        ))}
      </div>
    </>
  );
};

export default CompletedHabitList;
