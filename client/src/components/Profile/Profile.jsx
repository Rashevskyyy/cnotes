import React, { useState } from "react";
import {
  Collapse,
  List,
  ListItemIcon, ListItemText,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/userSlice";
import {CustomDivider, ListItemStyled, StyledAvatar} from './ProfileStyle';
import {useTranslation} from 'react-i18next';
import ReactAvatar from 'react-avatar';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {t} = useTranslation()
  const [profileOpen, setProfileOpen] = useState(false);
  const user = useSelector((state) => state.user);

  const handleProfileClick = () => {
    setProfileOpen(!profileOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleGoSettings = () => {
    navigate("/settings");
  };

  return (
    <List>
      <ListItemStyled button onClick={handleProfileClick}>
        <ListItemIcon>
          <ReactAvatar name={user.user ? user.user.firstName + ' ' + user.user.lastName  : 'А'} size="40" round={true} style={{margin: "16px"}} />
        </ListItemIcon>
        <ListItemText
          primary={
            user.user !== null || undefined
              ? `${user.user.firstName} ${user.user.lastName}`
              : "Имя пользователя"
          }
        />
        {profileOpen ? (
          <ExpandLessIcon />
        ) : (
          <ExpandMoreIcon />
        )}
      </ListItemStyled>
      <CustomDivider />
      <Collapse in={profileOpen} timeout="auto" unmountOnExit>
        <List component="div">
          <ListItemStyled button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary={t('settings')} onClick={handleGoSettings} />
          </ListItemStyled>
          <ListItemStyled button>
            <ListItemIcon>
              <LogoutIcon  />
            </ListItemIcon>
            <ListItemText primary={t('exit')} onClick={handleLogout} />
          </ListItemStyled>
        </List>
      </Collapse>
    </List>
  );
};

export default Profile;
