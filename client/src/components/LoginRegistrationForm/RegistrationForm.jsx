import React from 'react';
import {Button, TextField} from '@mui/material';
import {useForm} from 'react-hook-form';
import ValidationError from '../ValidationError/ValidationError';
import {useTranslation} from 'react-i18next';

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const RegistrationForm = ({onRegister}) => {
    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    return (
        <form onSubmit={handleSubmit(onRegister)}>
            <TextField
                margin="normal"
                fullWidth
                id="email"
                label={t('email')}
                name="email"
                autoComplete="email"
                autoFocus
                {...register("email", {
                    required: {
                        value: true,
                        message: t('emailReq')
                    },
                    pattern: {
                        value: emailRegex,
                        message: t('emailInvalid')
                    }
                })}
                error={!!errors.email}
                FormHelperTextProps={{ component: ValidationError }}
                helperText={errors.email && errors.email.message}
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
            <TextField
                margin="normal"
                fullWidth
                id="firstName"
                label={t('fname')}
                name="firstName"
                {...register("firstName", {required: true})}
                error={!!errors.firstName}
                FormHelperTextProps={{ component: ValidationError }}
                helperText={errors.firstName && t('fnameReq')}
            />
            <TextField
                margin="normal"
                fullWidth
                id="lastName"
                label={t('lname')}
                name="lastName"
                {...register("lastName", {required: true})}
                error={!!errors.lastName}
                FormHelperTextProps={{ component: ValidationError }}
                helperText={errors.lastName && t('lnameReq')}
            />
            <Button type="submit" fullWidth variant="contained" color={'primary'} sx={{marginTop: 1}}>
                {t('register')}
            </Button>
        </form>
    );
};

export default RegistrationForm;
