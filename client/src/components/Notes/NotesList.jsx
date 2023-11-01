import React, { useEffect, useState } from "react";
import {Grid, Container, Fab, Box, CircularProgress} from "@mui/material";
import Note from "./Note";
import AddIcon from "@mui/icons-material/Add";
import DialogCreateNote from "../DialogCreateNote/DialogCreateNote";
import { useMutation } from "react-query";
import { createNoteApi, fetchAllNotes, fetchNotesByUser } from "../../api/routes";
import { useDispatch, useSelector } from "react-redux";
import {useHref, useLocation} from "react-router-dom";
import {styled} from '@mui/system';

const FabStyled = styled(Fab)(({theme}) => ({
    backgroundColor: theme.palette.primary.main,
    position: "fixed",
    bottom: 60,
    right: 80,
}));

const NotesList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const href = useHref();
  const notes = useSelector((state) => state.notes.notes);
  const isLoading = useSelector(
      (state) => state.notes.isLoadingNotes
  );

  const { mutate: handleCreateNote } = useMutation(createNoteApi, {
    onSuccess: () => {
      setIsOpen(false);
      dispatch(fetchNotesByUser({}));
    },
    onError: (error) => {
      console.log("e", error);
    },
  });

    if (isLoading) {
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
    <Container maxWidth={false} sx={{ marginTop: 8 }}>
      <Grid container spacing={3}>
        {notes.map((note, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={note._id}>
            <Note
              idNote={note._id}
              tag={note.tag}
              title={note.title}
              description={note.description}
              firstName={note.firstName}
              date={note.date}
              href={href}
              index={index}
            />
          </Grid>
        ))}
      </Grid>
      <FabStyled
        onClick={() => setIsOpen(true)}
        color="primary"
        aria-label="Add"
      >
        <AddIcon />
      </FabStyled>
      <DialogCreateNote
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleCreateNote={handleCreateNote}
      />
    </Container>
  );
};

export default NotesList;
