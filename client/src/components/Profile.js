import React, { useState } from 'react';
import {
    Avatar,
    Collapse,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
} from '@mui/material';
import { styled } from '@mui/system';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { logout } from "../store/slices/userSlice";

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    margin: theme.spacing(2),
}));

const CustomDivider = styled(Divider)({
    backgroundColor: '#455260',
    width: '75%',
    marginLeft: 'auto',
    marginRight: 'auto',
});

const WhiteText = styled(ListItemText)({
    color: '#ffffff',
});

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [profileOpen, setProfileOpen] = useState(false);
    const user = useSelector((state) => state.user);
    console.log('user', user)
    const handleProfileClick = () => {
        setProfileOpen(!profileOpen);
    };

    const handleLogout = () => {
        dispatch(logout())
        navigate("/login");
    }

    const handleGoSettings = () => {
        navigate("/settings");
    }

    return (
        <List>
            <ListItem button onClick={handleProfileClick}>
                <ListItemIcon>
                    <StyledAvatar>A</StyledAvatar>
                </ListItemIcon>
                <WhiteText primary={ user.user !== null ? `${user.user.firstName} ${user.user.lastName}` : "Имя пользователя" } />
                {profileOpen ? <ExpandLessIcon sx={{ color: '#ffffff' }}  /> : <ExpandMoreIcon sx={{ color: '#ffffff' }}  />}
            </ListItem>
            <CustomDivider />
            <Collapse in={profileOpen} timeout="auto" unmountOnExit>
                <List component="div">
                    <ListItem button>
                        <ListItemIcon>
                            <SettingsIcon sx={{ color: '#ffffff' }}  />
                        </ListItemIcon>
                        <WhiteText primary="Настройки" onClick={handleGoSettings} />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <LogoutIcon sx={{ color: '#ffffff' }}  />
                        </ListItemIcon>
                        <WhiteText primary="Выйти" onClick={handleLogout}  />
                    </ListItem>
                </List>
            </Collapse>
        </List>
    );
};

export default Profile;
