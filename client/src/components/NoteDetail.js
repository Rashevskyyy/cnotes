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
    </Box>
  );
};

export default NoteDetail;
