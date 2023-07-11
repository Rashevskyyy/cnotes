import React, {useEffect} from 'react';
import {
    Divider,
    Box,
    Grid,
    Typography,
    Paper, Button, CircularProgress
} from '@mui/material';

import {useDispatch, useSelector} from 'react-redux';
import {getNote} from '../api/routes';
import {useNavigate, useParams} from 'react-router-dom';

const NoteDetailPage = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getNote(id));
    }, [dispatch, id]);

    const selectedNote = useSelector((state) => state.notes.currentNote);
    const isLoadingCurrentNote = useSelector((state) => state.notes.isLoadingCurrentNote);
    console.log('selectedNote', selectedNote)
    const handleBack = () => {
        navigate('/notes')
    }

    if (isLoadingCurrentNote) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress sx={{color: '#334150'}} />
            </Box>
        );
    }

    return (
        <>
            <Box p={2}>
                <Button variant="contained" onClick={handleBack} sx={{ padding: '1rem', marginBottom: 2, backgroundColor: '#334150' }}>
                    Назад
                </Button>
                <Paper elevation={3} sx={{ padding: '1rem' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h5" component="div">
                                {selectedNote.title}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">
                                <strong>Tag:</strong> {selectedNote.tag}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">
                                <strong>Description:</strong> {selectedNote.description}
                            </Typography>
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
                    </Grid>
                </Paper>
            </Box>
        </>
    );
};

export default NoteDetailPage;
