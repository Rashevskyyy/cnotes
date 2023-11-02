import React from 'react';
import {Button, TextField} from '@mui/material';
import {useForm} from 'react-hook-form';
import ValidationError from '../ValidationError/ValidationError';
import {useTranslation} from 'react-i18next';

const LoginForm = ({onLogin}) => {
    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    return (
        <form onSubmit={handleSubmit(onLogin)}>
            <TextField
                margin="normal"
                fullWidth
                id="email"
                label={t("email")}
                name="email"
                autoComplete="email"
                autoFocus
                {...register("email", {required: true})}
                error={!!errors.email}
                FormHelperTextProps={{ component: ValidationError }}
                helperText={errors.email && t("emailReq")}
            />
            <TextField
                margin="normal"
                fullWidth
                id="password"
                label={t('password')}
                name="password"
                type="password"
                {...register("password", {required: true})}
                error={!!errors.password}
                FormHelperTextProps={{ component: ValidationError }}
                helperText={errors.password && t('passwordReq')}
            />
            <Button type="submit" fullWidth variant="contained" color="primary" sx={{marginTop: 1}}>
                {t('login')}
            </Button>
        </form>
    );
};

export default LoginForm;
