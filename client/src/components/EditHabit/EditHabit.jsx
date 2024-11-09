import React from "react";
import {
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
  } from "@mui/material";

const EditHabit = (props) => {
    const {editHabit, setEditHabit, handleEditChange, handleEditSave} = props;
  return (
    <>
      {editHabit && (
        <Dialog open={true} onClose={() => setEditHabit(null)}>
          <DialogTitle>Edit Habit</DialogTitle>
          <DialogContent>
            <TextField
              label="Title"
              name="title"
              value={editHabit.title}
              onChange={handleEditChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Description"
              name="description"
              value={editHabit.description}
              onChange={handleEditChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Total Days"
              name="totalDays"
              value={editHabit.totalDays}
              onChange={handleEditChange}
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditHabit(null)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleEditSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default EditHabit;
