import React, {useEffect} from 'react';
import {
    Box,
     CircularProgress
} from '@mui/material';

import {useDispatch, useSelector} from 'react-redux';
import {getNote} from '../api/routes';
import {useNavigate, useParams} from 'react-router-dom';
import NoteDetail from '../components/NoteDetail';

const NoteDetailPage = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getNote(id));
    }, [dispatch, id]);

    const selectedNote = useSelector((state) => state.notes.currentNote);
    const isLoadingCurrentNote = useSelector((state) => state.notes.isLoadingCurrentNote);

    const handleBack = () => {
        navigate(-1)
    }

    if (isLoadingCurrentNote) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress sx={{color: '#334150'}} />
            </Box>
        );
    }

    return (
            <NoteDetail
                selectedNote={selectedNote}
                handleBack={handleBack}
            />
    );
};

export default NoteDetailPage;
