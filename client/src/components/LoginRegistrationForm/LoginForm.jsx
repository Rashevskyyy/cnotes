import React from 'react';
import {Button, Checkbox, FormControlLabel, TextField} from '@mui/material';
import {useForm} from 'react-hook-form';
import ValidationError from '../ValidationError/ValidationError';

const LoginForm = ({onLogin}) => {
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
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                {...register("email", {required: true})}
                error={!!errors.email}
                FormHelperTextProps={{ component: ValidationError }}
                helperText={errors.email && "Email is required"}
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
            <Button type="submit" fullWidth variant="contained" color="primary" sx={{marginTop: 1}}>
                Login
            </Button>
        </form>
    );
};

export default LoginForm;
