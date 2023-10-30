import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
    Box, Button, Checkbox, Container, FormControlLabel, Link, Tab, Tabs,
    TextField, Typography,
} from "@mui/material";
import AppBar from '@mui/material/AppBar';
import {CenteredContainer, StyledTab, StyledTabs, TabContent} from './LoginRegistrationFormStyle';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      <Link color="inherit" href="https://rashevskyi-oleksii.xyz">
        Created by Alexey Rashevskyi
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const TabPanel = ({ children, value, index, ...other }) => {
    return (
        <TabContent
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </TabContent>
    );
}

const LoginRegistrationForm = ({ onSubmit }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
      <CenteredContainer component="main" maxWidth="xs" >
          <AppBar position="static" component={TabContent}>
              <Tabs value={value} onChange={handleChange} aria-label="login and register tabs">
                  <StyledTab label="Login" id="simple-tab-0" aria-controls="simple-tabpanel-0" />
                  <StyledTab label="Register" id="simple-tab-1" aria-controls="simple-tabpanel-1" />
              </Tabs>
          </AppBar>
        <TabPanel value={value} index={0} onSubmit={handleSubmit(onSubmit)}>
            <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                {...register("email", { required: true })}
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
                {...register("password", { required: true })}
                error={!!errors.password}
                helperText={errors.password && "Password is required"}
            />
            <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
            />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Login
          </Button>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                {...register("email", { required: true })}
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
                {...register("password", { required: true })}
                error={!!errors.password}
                helperText={errors.password && "Password is required"}
            />
            <TextField
                margin="normal"
                fullWidth
                id="confirmPassword"
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                {...register("confirmPassword", { required: true })}
                error={!!errors.password}
                helperText={
                    errors.confirmPassword !== errors.password &&
                    "Password is required"
                }
            />
          <Button type="submit" fullWidth variant="contained" color={'primary'} >
            Register
          </Button>
        </TabPanel>
        <Copyright/>
      </CenteredContainer>
  );
};
export default LoginRegistrationForm;
