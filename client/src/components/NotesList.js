import React, {useEffect, useState} from 'react';
import {Grid, Container, Fab} from '@mui/material';
import Note from './Note';
import AddIcon from '@mui/icons-material/Add';
import DialogCreateNote from './DialogCreateNote';
import {useMutation} from 'react-query';
import {createNoteApi, fetchNotesByUser} from '../api/routes';
import {useDispatch, useSelector} from 'react-redux';

const NotesList = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const notes = useSelector((state) =>  state.notes.notesByUser);

    useEffect(() => {
        dispatch(fetchNotesByUser());
    }, [dispatch]);

    const { mutate: handleCreateNote } = useMutation(createNoteApi,{
        onSuccess: () => {
            setIsOpen(false)
            dispatch(fetchNotesByUser());
        },
        onError: (error) => {
            console.log("e", error);
        },
    });

    return (
        <Container maxWidth={false} sx={{ marginTop: 8 }}>
            <Grid container spacing={3}>
                {notes.map((note, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={2}>
                        <Note
                            id={note._id}
                            tag={note.tag}
                            title={note.title}
                            description={note.description}
                            firstName={note.firstName}
                            date={note.date}
                        />
                    </Grid>
                ))}
            </Grid>
            <Fab
                onClick={() => setIsOpen(true)}
                color="primary"
                aria-label="Add"
                sx={{
                    backgroundColor: '#334150',
                    position: 'fixed',
                    bottom: 60,
                    right: 80,
                }}
            >
                <AddIcon />
            </Fab>
            <DialogCreateNote
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                handleCreateNote={handleCreateNote}
            />
        </Container>
    );
};

export default NotesList;
