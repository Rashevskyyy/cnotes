import React from "react";
import {List, ListItemIcon, ListItemText} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import {Link} from "react-router-dom";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import {ListItemStyled} from './NavigationLinksStyle';
import {useTranslation} from 'react-i18next';

const NavigationLinks = () => {
    const {t} = useTranslation()
    return (
        <List>
            <ListItemStyled component={Link} to="/notes">
                <ListItemIcon>
                    <LockIcon/>
                </ListItemIcon>
                <ListItemText primary={t('yourNotes')}/>
            </ListItemStyled>
            <ListItemStyled component={Link} to="/publish">
                <ListItemIcon>
                    <BookmarkIcon/>
                </ListItemIcon>
                <ListItemText primary={t('publishLink')}/>
            </ListItemStyled>
        </List>
    );
};

export default NavigationLinks;
