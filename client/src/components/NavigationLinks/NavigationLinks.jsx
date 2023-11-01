import React from "react";
import {List, ListItemIcon, ListItemText} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import {Link} from "react-router-dom";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import {ListItemStyled} from './NavigationLinksStyle';
import {fetchNotesByUser} from '../../api/routes';
import {useDispatch} from 'react-redux';

const NavigationLinks = () => {
    const dispatch = useDispatch();

    const handleNotes = () => {
        dispatch(fetchNotesByUser());
    }

    return (
        <List>
            <ListItemStyled component={Link} to="/notes">
                <ListItemIcon>
                    <LockIcon/>
                </ListItemIcon>
                <ListItemText primary="Your notes"/>
            </ListItemStyled>
            <ListItemStyled component={Link} to="/publish">
                <ListItemIcon>
                    <BookmarkIcon/>
                </ListItemIcon>
                <ListItemText primary="Publish"/>
            </ListItemStyled>
        </List>
    );
};

export default NavigationLinks;
