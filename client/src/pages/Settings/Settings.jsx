import React, {useState} from "react";
import {IconButton, InputAdornment, Paper, TextField} from "@mui/material";
import {useMutation} from "react-query";
import {updatePassword, updateUserInfo} from "../../api/routes";
import {useDispatch, useSelector} from "react-redux";
import {updateUserInfoState} from "../../store/slices/userSlice";
import {InputContainer, SettingsContainer, StyledButton} from './SettingsStyled';
import {toast} from 'react-toastify';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {useTranslation} from 'react-i18next';

const Settings = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation()
    const user = useSelector((state) => state.user);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [firstName, setFirstName] = useState(user.user?.firstName);
    const [lastName, setLastName] = useState(user.user?.lastName);

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const {mutate: handleNameChange} = useMutation(
        (userInfo) =>
            updateUserInfo(user.user._id, userInfo.firstName, userInfo.lastName),
        {
            onSuccess: (data) => {
                dispatch(updateUserInfoState({firstName, lastName}));
                toast.success(data.message)
            },
            onError: (error) => {
                toast.error(error.response.data.error)
            },
        }
    );

    const {mutate: handleChangePassword} = useMutation(
        (userPasswords) =>
            updatePassword(userPasswords.currentPassword, userPasswords.newPassword),
        {
            onSuccess: (data) => {
                setCurrentPassword('')
                setNewPassword('')
                toast.success(data.message)
            },
            onError: (error) => {
                toast.error(error.response.data.error)
            },
        }
    );

    return (
        <SettingsContainer component={Paper} maxWidth="xs">
            <InputContainer>
                <TextField
                    type={showPassword ? "text" : "password"}
                    label={t('currentPassword')}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </InputContainer>

            <InputContainer>
                <TextField
                    type={showPassword ? "text" : "password"}
                    label={t('newPassword')}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </InputContainer>

            <StyledButton onClick={() => handleChangePassword({currentPassword, newPassword})} variant="contained">
                {t('changePassword')}
            </StyledButton>

            <InputContainer>
                <TextField
                    label={t('fname')}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    fullWidth
                />
            </InputContainer>

            <InputContainer>
                <TextField
                    label={t('lname')}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    fullWidth
                />
            </InputContainer>

            <StyledButton
                onClick={() => handleNameChange({firstName, lastName})}
                variant="contained"
            >
                {t('save')}
            </StyledButton>
        </SettingsContainer>
    );
};

export default Settings;
