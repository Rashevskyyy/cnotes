import React from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const NoteDetail = (props) => {
  const { selectedNote, handleBack } = props;
  console.log('selectedNote', selectedNote)
  return (
    <Box p={2}>
      <Button
        variant="contained"
        onClick={handleBack}
        sx={{ padding: "1rem", marginBottom: 2, backgroundColor: "#334150" }}
      >
        Назад
      </Button>
      <Paper elevation={3} sx={{ padding: "1rem" }}>
        <Paper elevation={3} sx={{ padding: "1rem" }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Title"
              sx={{ marginBottom: 2 }}
              defaultValue={selectedNote.title}
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel id="tag-label">Tag</InputLabel>
              <Select
                defaultValue={selectedNote.tag}
                labelId="tag-label"
                label="Tag"
              >
                <MenuItem value="Management">Management</MenuItem>
                <MenuItem value="Development">Development</MenuItem>
                <MenuItem value="Design">Design</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Description"
              sx={{ marginBottom: 2 }}
              defaultValue={selectedNote.description}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>First Name:</strong> {selectedNote.firstName}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Last Name:</strong> {selectedNote.lastName}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Date:</strong> {selectedNote.date}
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ float: "right" }}>
            <Button
              variant="contained"
              onClick={handleBack}
              sx={{ backgroundColor: "#334150" }}
            >
              Сохранить
            </Button>
          </Grid>
        </Grid>
        </Paper>

        <Box sx={{ marginTop: 2 }}>
          <Typography sx={{ marginBottom: 1 }} variant="h5">Комментарии:</Typography>
          <Paper elevation={3} sx={{ padding: "1rem" }}>
            {selectedNote.comments && selectedNote.comments.length > 0 ? (
                selectedNote.comments.map((comment, index) => (
                    <Box key={index} sx={{ marginBottom: 2 }}>
                      <Typography variant="body1">
                        <strong>{comment.firstName} {comment.lastName}:</strong> {comment.text}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {comment.date}
                      </Typography>
                    </Box>
                ))
            ) : (
                <Typography variant="body2" color="textSecondary">
                  Нет комментариев для этой заметки.
                </Typography>
            )}
          </Paper>
          <Box sx={{ marginTop: 2 }}>
            <TextField
                fullWidth
                label="Напишите ваш комментарий"
                variant="outlined"
                multiline
                rows={4}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={() => {}}
                sx={{ marginTop: 1, backgroundColor: "#334150" }}
            >
              Добавить комментарий
            </Button>
          </Box>
        </Box>


      </Paper>
    </Box>
  );
};

export default NoteDetail;
