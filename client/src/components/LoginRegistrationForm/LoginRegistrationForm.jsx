import React from "react";
import {useForm} from "react-hook-form";
import {
    Box, Button, Checkbox, FormControlLabel, Link, Tabs,
    TextField, Typography,
} from "@mui/material";
import AppBar from '@mui/material/AppBar';
import {CenteredContainer, StyledTab, TabContent} from './LoginRegistrationFormStyle';

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            <Link color="inherit" href="https://rashevskyi-oleksii.xyz">
                Created by Oleksii Rashevskyi
                {" "}
                {new Date().getFullYear()}
                {"."}
            </Link>
        </Typography>
    );
}

const TabPanel = ({children, value, index, ...other}) => {
    return (
        <TabContent
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{pt: 2, pb: 2}}>
                    {children}
                </Box>
            )}
        </TabContent>
    );
}

const LoginRegistrationForm = ({onLogin, onRegister, value, setValue}) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm();

    const handleChange = (event, newValue) => {
        setValue(newValue);
        reset();
    };

    return (
        <CenteredContainer component="main" maxWidth="xs">
                <AppBar position="static" component={TabContent}>
                    <Tabs value={value} onChange={handleChange} aria-label="login and register tabs" >
                        <StyledTab label="Login" id="simple-tab-0" aria-controls="simple-tabpanel-0" />
                        <StyledTab label="Register" id="simple-tab-1" aria-controls="simple-tabpanel-1"  />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
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
                        helperText={errors.password && "Password is required"}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Remember me"
                    />
                    <Button type="submit" fullWidth variant="contained" color="primary">
                        Login
                    </Button>
                    </form>

                </TabPanel>
                <TabPanel value={value} index={1}>
                    <form onSubmit={handleSubmit(onRegister)}>
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
                        helperText={errors.password && "Password is required"}
                    />
                    <Button type="submit" fullWidth variant="contained" color={'primary'}>
                        Register
                    </Button>
                    </form>
                </TabPanel>
                <Copyright/>
        </CenteredContainer>
    );
};

export default LoginRegistrationForm;
