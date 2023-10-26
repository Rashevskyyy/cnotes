import React, {useState} from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useSelector} from 'react-redux';
import ValidationError from '../ValidationError/ValidationError';


const NoteDetail = (props) => {
  const { selectedNote, handleBack, handleCreateComment, handleUpdateNote } = props;
  const [isInputClicked, setIsInputClicked] = useState(false);
  const user = useSelector((state) => state.user);
  const isAuthor = user && selectedNote ? user?.user?._id === selectedNote?.userId : false

  const getTagColor = (tag) => {
    switch (tag) {
      case "Management":
        return "#f44336";
      case "Development":
        return "#2196f3";
      case "Design":
        return "#4caf50";
      default:
        return "#9e9e9e";
    }
  };

  const tagColor = getTagColor(selectedNote.tag);

  const { formState: {errors, isDirty} , register, handleSubmit, reset, control } = useForm({
    mode: 'onBlur',
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


  const handleInputClick = () => {
    setIsInputClicked(true);
  };

  return (
      <Box p={2}>
        <Button
            variant="contained"
            onClick={handleBack}
            sx={{
              padding: "1rem",
              marginBottom: 2,
              backgroundColor: "#334150",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
        >
          <ArrowBackIcon />
        </Button>
        <Paper elevation={3}>
          <Box elevation={3} sx={{ padding: "1rem" }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                {isAuthor ? (
                    <>
                        <Grid item xs={1} sx={{display: 'flex', alignItems: "center" }}>
                          <Typography variant="body1" sx={{ color: "#888", display: 'flex', alignItems: "center" }}>
                            Title
                          </Typography>
                        </Grid>
                    <Grid item xs={11}>
                       <TextField
                           fullWidth
                           variant="outlined"
                           error={Boolean(errors.title)}
                           {...register("title", {
                             required: {
                               value: true,
                               message: 'This field is required'
                             }
                           })}
                       />
                      {errors.title && <ValidationError>{errors.title.message}</ValidationError>}
                    </Grid>
                  <Grid item xs={1} sx={{display: 'flex', alignItems: "center" }}>
                <Typography variant="body1" sx={{ color: "#888", display: 'flex', alignItems: "center" }}>
                  Tag
                </Typography>
              </Grid>
              <Grid item xs={11}>
                <FormControl fullWidth variant="outlined">
                  <Controller
                      name="tag"
                      control={control}
                      render={({ field }) => (
                          <Select
                              {...field}
                          >
                            <MenuItem value="Management">Management</MenuItem>
                            <MenuItem value="Development">Development</MenuItem>
                            <MenuItem value="Design">Design</MenuItem>
                          </Select>
                      )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={1} sx={{display: 'flex', alignItems: "center" }}>
                <Typography variant="body1" sx={{ color: "#888", }}>
                  Description
                </Typography>
              </Grid>
              <Grid item xs={11}>
                  <TextField
                       fullWidth
                       multiline
                       rows={5}
                       variant="outlined"
                       error={Boolean(errors.description)}
                       {...register("description", {
                         required: {
                           value: true,
                           message: 'This field is required'
                         },
                         maxLength: {
                           value: 300,
                           message: "Max length is 300"
                         },
                       })}
                   />
                {errors.description && <ValidationError>{errors.description.message}</ValidationError>}
              </Grid>
              </>
                ) : (
                    <>
                      <Grid item xs={1} sx={{display: 'flex', alignItems: "center" }}>
                        <Typography variant="body1" sx={{ color: "#888", display: 'flex', alignItems: "center" }}>
                          Title
                        </Typography>
                      </Grid>

                      <Grid item xs={11}>
                        <Typography variant="body1">
                          {selectedNote.title}
                        </Typography>
                      </Grid>
                      <Grid item xs={1} sx={{display: 'flex', alignItems: "center" }}>
                        <Typography variant="body1" sx={{ color: "#888", display: 'flex', alignItems: "center" }}>
                          Tag
                        </Typography>
                      </Grid>

                      <Grid item xs={11}>
                        <Typography variant="body1" sx={{color: tagColor, fontWeight: "bold"}}>
                          <span
                              style={{
                                display: "inline-block",
                                width: "8px",
                                height: "8px",
                                borderRadius: "50%",
                                backgroundColor: tagColor,
                                marginRight: "8px",
                              }}
                          ></span>
                          {selectedNote.tag}
                        </Typography>
                      </Grid>

                      <Grid item xs={1} sx={{display: 'flex', alignItems: "center" }}>
                        <Typography variant="body1" sx={{ color: "#888", display: 'flex', alignItems: "center" }}>
                          Description
                        </Typography>
                      </Grid>

                      <Grid item xs={11}>
                        <Typography variant="body1">
                          {selectedNote.description}
                        </Typography>
                      </Grid>
                    </>
              )}

                <Grid item xs={1} sx={{display: 'flex', alignItems: "center" }}>
                  <Typography variant="body1" sx={{ color: "#888", display: 'flex', alignItems: "center" }}>
                    Author
                  </Typography>
                </Grid>

                <Grid item xs={11}>
                  <Typography variant="body1">
                    {selectedNote.firstName + ' ' + selectedNote.lastName}
                  </Typography>
                </Grid>

                <Grid item xs={1} sx={{display: 'flex', alignItems: "center" }}>
                  <Typography variant="body1" sx={{ color: "#888", display: 'flex', alignItems: "center" }}>
                    Date
                  </Typography>
                </Grid>
                <Grid item xs={11}>
                  <Typography variant="body1" >
                    {selectedNote.date}
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: "right" }}>
                  {isAuthor ? (
                      <Button
                          variant="contained"
                          type="submit"
                          disabled={!isDirty}
                          sx={{ backgroundColor: "#334150", color: "#fff" }}
                      >
                        Сохранить
                      </Button>
                      )
                      : null
                  }
                </Grid>
              </Grid>
            </form>
          </Box>
          <Box sx={{ backgroundColor: '#f6f8fa' }}>
            <Box sx={{ padding: "1rem" }}>
              <Typography variant="h5" sx={{ marginBottom: 1 }}>
                Комментарии:
              </Typography>
              <Box elevation={3}>
                {selectedNote.comments && selectedNote.comments.length > 0 ? (
                    selectedNote.comments.map((comment, index) => (
                        <Box key={index} sx={{ marginBottom: 1 }}>
                          <Typography variant="body1" sx={{marginLeft: '2rem'}}>
                            <strong>
                              {comment.firstName} {comment.lastName}:
                            </strong>{" "}
                            {comment.text}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" sx={{marginLeft: '2rem'}}>
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
            </Box>
            <Divider />
            <Box elevation={3} sx={{ padding: "1rem" }}>
              <form onSubmit={handleSubmit(onSubmitComment)}>
              <Box sx={{ marginTop: 2 }}>
                  <TextField
                      fullWidth
                      label="Напишите ваш комментарий"
                      variant="outlined"
                      multiline
                      rows={isInputClicked ? 4 : 1}
                      onFocus={handleInputClick}
                      onBlur={() => setIsInputClicked(false)}
                      {...register("commentText")}
                  />
                  <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{ marginTop: 1, backgroundColor: "#334150", color: "#fff" }}
                  >
                    Добавить комментарий
                  </Button>
              </Box>
              </form>
            </Box>
          </Box>
        </Paper>
      </Box>
  );
};

export default NoteDetail;
