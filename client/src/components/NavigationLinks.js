import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { styled } from '@mui/system';
import PublishIcon from '@mui/icons-material/Publish';
import LockIcon from '@mui/icons-material/Lock';
import { Link } from 'react-router-dom';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const WhiteText = styled(ListItemText)({
    color: '#ffffff',
});

const NavigationLinks = () => {
    return (
        <List>
            <ListItem component={Link} to="/publish">
                <ListItemIcon>
                    <BookmarkIcon sx={{ color: '#ffffff' }} />
                </ListItemIcon>
                <WhiteText primary="Publish" />
            </ListItem>
            <ListItem component={Link} to="/private">
                <ListItemIcon>
                    <LockIcon sx={{ color: '#ffffff' }} />
                </ListItemIcon>
                <WhiteText primary="Private" />
            </ListItem>
        </List>
    );
};

export default NavigationLinks;
