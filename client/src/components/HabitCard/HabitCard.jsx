import * as React from "react";
import { Card, CardContent, IconButton, Typography } from "@mui/material";
import { Edit, Delete, CheckCircle } from "@mui/icons-material";
import TreeComponent from "../TreeComponent/TreeComponent";

const HabitCard = (props) => {
  const { habit, onEdit, onDelete, onComplete } = props;
  return (
    <Card className="m-4 p-4" disabled={habit.totalDays === habit.streakCount}>
      <CardContent>
        <Typography
          className="w-full text-center !mb-4"
          variant="h5"
          component="h5"
        >
          {habit.title}
        </Typography>
        <Typography
          variant="body2"
          className="w-full text-center"
          color="textSecondary"
        >
          {habit.description}
        </Typography>
        <TreeComponent
          totalDays={habit.totalDays}
          streakCount={habit.streakCount}
        />
        {habit.totalDays === habit.streakCount ? (
          <Typography variant="h6" color="primary">
            Congratulations! You've completed this habit.
          </Typography>
        ) : (
          <div className="flex justify-center space-x-2 mt-4">
            <IconButton onClick={() => onEdit(habit)}>
              <Edit />
            </IconButton>
            <IconButton onClick={() => onDelete(habit)}>
              <Delete />
            </IconButton>
            <IconButton onClick={() => onComplete(habit)}>
              <CheckCircle className={habit.istodayDone ? "completed" : ""} />
            </IconButton>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HabitCard;
