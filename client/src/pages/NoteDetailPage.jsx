import React, { useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { createNoteCommentApi, getNote, updateNoteApi } from "../api/routes";
import { useNavigate, useParams } from "react-router-dom";
import NoteDetail from "../components/Notes/NoteDetail/NoteDetail";
import { useMutation } from "react-query";

const NoteDetailPage = () => {
  const { id: noteId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getNote(noteId));
  }, [dispatch, noteId]);

  const selectedNote = useSelector((state) => state.notes.currentNote);
  const isLoadingCurrentNote = useSelector(
    (state) => state.notes.isLoadingCurrentNote
  );

  const handleBack = () => {
    navigate(-1);
  };

  const { mutate: handleCreateComment } = useMutation(
    ({ commentText }) => createNoteCommentApi(noteId, { text: commentText }),
    {
      onSuccess: () => {
        dispatch(getNote(noteId));
      },
      onError: (error) => {
        console.log("e", error);
      },
    }
  );

  const { mutate: handleUpdateNote } = useMutation(
    (formData) => updateNoteApi(noteId, formData),
    {
      onSuccess: () => {
        dispatch(getNote(noteId));
      },
      onError: (error) => {
        console.log("e", error);
      },
    }
  );

  if (isLoadingCurrentNote) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <NoteDetail
      handleCreateComment={handleCreateComment}
      handleUpdateNote={handleUpdateNote}
      selectedNote={selectedNote}
      handleBack={handleBack}
    />
  );
};

export default NoteDetailPage;
