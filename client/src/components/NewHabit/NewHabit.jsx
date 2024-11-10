import * as React from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Fab,
} from "@mui/material";
import { Add, Close } from "@mui/icons-material";

const NewHabit = (props) => {
  const {
    ref,
    showNewCard,
    handleAdd,
    handleCancel,
    newCard,
    handleSave,
    handleNewCardChange,
  } = props;
  return (
    <div ref={ref}>
      {showNewCard && (
        <Card className="m-4 p-4">
          <CardContent>
            <Typography
              className="w-full text-center !mb-4"
              variant="h5"
              component="h5"
            >
              Enter New Habit Details
            </Typography>
            <TextField
              label="Title"
              value={newCard.title}
              name="title"
              onChange={handleNewCardChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Description"
              value={newCard.description}
              name="description"
              onChange={handleNewCardChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Days"
              type="number"
              value={newCard.totalDays}
              name="totalDays"
              onChange={handleNewCardChange}
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              className="w-full !mt-4 text-center"
              onClick={() => handleSave()}
            >
              Save
            </Button>
          </CardContent>
        </Card>
      )}
      <div
        className={`w-full flex ${
          showNewCard ? "justify-center" : "justify-start mt-10 mx-4"
        }`}
      >
        <Fab
          color="primary"
          aria-label="add"
          onClick={showNewCard ? handleCancel : handleAdd}
        >
          {showNewCard ? <Close /> : <Add />}
        </Fab>
      </div>
    </div>
  );
};

export default NewHabit;
