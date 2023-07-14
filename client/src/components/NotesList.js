import React, { useEffect, useState } from 'react';
import { Grid, Container, Fab } from '@mui/material';
import Note from './Note';
import AddIcon from '@mui/icons-material/Add';
import DialogCreateNote from './DialogCreateNote';
import { useMutation } from 'react-query';
import { createNoteApi, fetchAllNotes, fetchNotesByUser } from '../api/routes';
import { useDispatch, useSelector } from 'react-redux';
import {useHref, useParams} from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const NotesList = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const href = useHref();
    const notes = useSelector((state) => state.notes.notesByUser);
    const allNotes = useSelector((state) => state.notes.notes);

    useEffect(() => {
        if (href === "/notes") {
            dispatch(fetchNotesByUser());
        }
        if (href === "/publish") {
            dispatch(fetchAllNotes());
        }
    }, [dispatch, href]);

    const { mutate: handleCreateNote } = useMutation(createNoteApi, {
        onSuccess: () => {
            setIsOpen(false);
            dispatch(fetchNotesByUser());
            dispatch(fetchAllNotes());
        },
        onError: (error) => {
            console.log("e", error);
        },
    });

    return (
        <Container maxWidth={false} sx={{ marginTop: 8 }}>
            <Grid container spacing={3}>
                <AnimatePresence>
                    {href === "/publish"
                        ? allNotes.map((note, index) => (
                                <Grid item xs={12} sm={6} md={4} lg={2}>
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
                        ))
                        : notes.map((note, index) => (
                                <Grid item xs={12} sm={6} md={4} lg={2}>
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
                </AnimatePresence>
            </Grid>
            <motion.div
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                style={{ position: 'fixed', bottom: 60, right: 80 }}
            >
                <Fab
                    onClick={() => setIsOpen(true)}
                    color="primary"
                    aria-label="Add"
                    sx={{
                        backgroundColor: '#334150',
                    }}
                >
                    <AddIcon />
                </Fab>
            </motion.div>
            <DialogCreateNote
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                handleCreateNote={handleCreateNote}
            />
        </Container>
    );
};

export default NotesList;
