import React from 'react';
import {Button, TextField} from '@mui/material';
import {useForm} from 'react-hook-form';
import ValidationError from '../ValidationError/ValidationError';

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const RegistrationForm = ({onRegister}) => {
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
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                {...register("email", {
                    required: {
                        value: true,
                        message: "Email is required"
                    },
                    pattern: {
                        value: emailRegex,
                        message: "Invalid email address"
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
                label="Password"
                name="password"
                type="password"
                {...register("password", {required: true})}
                error={!!errors.password}
                FormHelperTextProps={{ component: ValidationError }}
                helperText={errors.password && "Password is required"}
            />
            <TextField
                margin="normal"
                fullWidth
                id="firstName"
                label="First name"
                name="firstName"
                {...register("firstName", {required: true})}
                error={!!errors.firstName}
                FormHelperTextProps={{ component: ValidationError }}
                helperText={errors.firstName && "First name is required"}
            />
            <TextField
                margin="normal"
                fullWidth
                id="lastName"
                label="Last name"
                name="lastName"
                {...register("lastName", {required: true})}
                error={!!errors.lastName}
                FormHelperTextProps={{ component: ValidationError }}
                helperText={errors.lastName && "Last name is required"}
            />
            <Button type="submit" fullWidth variant="contained" color={'primary'} sx={{marginTop: 1}}>
                Register
            </Button>
        </form>
    );
};

export default RegistrationForm;
