import React, { useState } from "react";
import {Avatar, Box, Button, Container, TextField} from '@mui/material';
import {styled} from '@mui/system';
import {useMutation} from 'react-query';
import {updateUserAvatar, updateUserInfo, uploadAvatar} from '../api/routes';
import {useDispatch, useSelector} from 'react-redux';
import {updateUserInfoState} from '../store/slices/userSlice';

const SettingsContainer = styled(Container)(({ theme }) => ({
    marginTop: theme.spacing(4),
}));

const InputContainer = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(2),
}));

const AvatarContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
    marginBottom: theme.spacing(2),
}));

const Settings = () => {
    const [avatar, setAvatar] = useState(""); // хранение URL-адреса текущего аватара
    const [newAvatar, setNewAvatar] = useState(""); // хранение нового аватара, загруженного пользователем
    const [currentPassword, setCurrentPassword] = useState(""); // хранение текущего пароля
    const [newPassword, setNewPassword] = useState(""); // хранение нового пароля
    const [firstName, setFirstName] = useState(""); // хранение имени пользователя
    const [lastName, setLastName] = useState(""); // хранение фамилии пользователя
    const dispatch = useDispatch();

    const user = useSelector(state => state.user)
    console.log('user', user)
    // функция для загрузки нового аватара
    const handleAvatarChange = async (e) => {
        if (e.target.files[0]) {
            const formData = new FormData();
            formData.append("avatar", e.target.files[0]);

            try {
                const response = await uploadAvatar(formData);
                setNewAvatar(URL.createObjectURL(e.target.files[0]));
                handleAvatarChange.mutate(formData);
            } catch (error) {
                console.error("Ошибка при загрузке аватара", error);
            }
        }
    };

    const handleSaveAvatar = async () => {
        if (newAvatar) {
            try {
                // await updateUserAvatar(userId, newAvatar); // замените `userId` на идентификатор пользователя
                setAvatar(newAvatar);
            } catch (error) {
                console.error("Ошибка при сохранении аватара", error);
            }
        }
    };

    // функция для изменения пароля
    const handlePasswordChange = () => {
        // здесь вы можете добавить логику для проверки текущего пароля и изменения пароля
        console.log("Current password:", currentPassword);
        console.log("New password:", newPassword);
    };

    const { mutate: handleNameChange } = useMutation(
        (userInfo) => updateUserInfo(user.user._id, userInfo.firstName, userInfo.lastName),
        {
            onSuccess: (data) => {
                console.log("User info updated successfully");
                dispatch(updateUserInfoState({ firstName, lastName }));
            },
            onError: (error) => {
                console.error("Error updating user info", error);
            },
        }
    );

    return (
        <SettingsContainer maxWidth="xs">
            <AvatarContainer>
                <Avatar src={newAvatar || avatar} />
                <input type="file" accept="image/*" onChange={handleAvatarChange} />
                <Button onClick={handleSaveAvatar}>Сохранить аватар</Button>
            </AvatarContainer>

            <InputContainer>
                <TextField
                    type="password"
                    label="Текущий пароль"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    fullWidth
                />
            </InputContainer>

            <InputContainer>
                <TextField
                    type="password"
                    label="Новый пароль"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    fullWidth
                />
            </InputContainer>

            <StyledButton onClick={handlePasswordChange} variant="contained">
                Сменить пароль
            </StyledButton>

            <InputContainer>
                <TextField
                    label="Имя"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    fullWidth
                />
            </InputContainer>

            <InputContainer>
                <TextField
                    label="Фамилия"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    fullWidth
                />
            </InputContainer>

            <StyledButton onClick={() => handleNameChange({ firstName, lastName })} variant="contained">
                Сохранить имя и фамилию
            </StyledButton>

        </SettingsContainer>
    );
}

export default Settings;
