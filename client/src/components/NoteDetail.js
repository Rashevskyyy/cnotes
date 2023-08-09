import React, { useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

const NoteDetail = (props) => {
  const { selectedNote, handleBack, handleCreateComment, handleUpdateNote } =
    props;

  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: {
      title: selectedNote.title || "",
      tag: selectedNote.tag || "",
      description: selectedNote.description || "",
    },
  });

  const onSubmit = (data) => {
    handleUpdateNote(data);
  };

  const onSubmitComment = (data) => {
    handleCreateComment({ commentText: data.commentText });
    reset();
  };

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
        <Typography variant="body1">
          <strong>{selectedNote.title}</strong>
        </Typography>
        <Box elevation={3} sx={{ padding: "1rem" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container xs={6} spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Title"
                      sx={{ marginBottom: 2 }}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                  <InputLabel id="tag-label">Tag</InputLabel>
                  <Controller
                    name="tag"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onChange={field.onChange}
                        labelId="tag-label"
                        label="Tag"
                      >
                        <MenuItem value="Management">Management</MenuItem>
                        <MenuItem value="Development">Development</MenuItem>
                        <MenuItem value="Design">Design</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Description"
                      multiline={true}
                      sx={{ marginBottom: 2 }}
                      minRows={5}
                      maxRows={10}
                      {...field}
                    />
                  )}
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
                  type="submit"
                  sx={{ backgroundColor: "#334150" }}
                >
                  Сохранить
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
        <Divider />
        <Paper elevation={5} sx={{ padding: "1rem" }}>
          <Box sx={{ marginTop: 2 }}>
            <Typography sx={{ marginBottom: 1 }} variant="h5">
              Комментарии:
            </Typography>
            <Box elevation={3} sx={{ padding: "1rem" }}>
              {selectedNote.comments && selectedNote.comments.length > 0 ? (
                  selectedNote.comments.map((comment, index) => (
                      <Box key={index} sx={{ marginBottom: 2 }}>
                        <Typography variant="body1">
                          <strong>
                            {comment.firstName} {comment.lastName}:
                          </strong>{" "}
                          {comment.text}
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
            </Box>
            <Box elevation={3} sx={{ padding: "0 1rem" }}>
              <Box sx={{ marginTop: 2 }}>
                <form onSubmit={handleSubmit(onSubmitComment)}>
                  <TextField
                      fullWidth
                      label="Напишите ваш комментарий"
                      variant="outlined"
                      multiline
                      rows={4}
                      {...register("commentText")}
                  />
                  <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{ marginTop: 1, backgroundColor: "#334150" }}
                  >
                    Добавить комментарий
                  </Button>
                </form>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Paper>
    </Box>
  );
};

export default NoteDetail;
