import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const CompletedHabit = (props) => {
    const {handleCompletedHabit, habit} = props;
  return (
    <Dialog open={true} onClose={()=> handleCompletedHabit(habit)}>
      <DialogTitle>Congratulations!</DialogTitle>
      <DialogContent>
        <p>You've completd this habit. Great job!</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={()=> handleCompletedHabit(habit)} color="primary">
          Yay
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CompletedHabit;
