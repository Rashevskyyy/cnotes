import React from "react";
import {
    Box,
    Link,
    Tabs,
    Typography,
} from "@mui/material";
import AppBar from '@mui/material/AppBar';
import {CenteredContainer, StyledTab, TabContent} from './LoginRegistrationFormStyle';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import {useTranslation} from 'react-i18next';

function Copyright(props) {
    const {t} = useTranslation()
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            <Link color="inherit" href="https://rashevskyi-oleksii.xyz">
                {t("createdBy")}
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
                <Box sx={{pt: 2, pb: 2, }}>
                    {children}
                </Box>
            )}
        </TabContent>
    );
}

const LoginRegistrationForm = ({onLogin, onRegister, value, setValue}) => {
    const { t } = useTranslation();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <CenteredContainer component="main" maxWidth="xs">
                <AppBar position="static" component={TabContent}>
                    <Tabs value={value} onChange={handleChange} aria-label="login and register tabs" >
                        <StyledTab label={t('signin')} id="simple-tab-0" aria-controls="simple-tabpanel-0" />
                        <StyledTab label={t('register')} id="simple-tab-1" aria-controls="simple-tabpanel-1"  />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <LoginForm onLogin={onLogin}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <RegistrationForm onRegister={onRegister}/>
                </TabPanel>
                <Copyright />
        </CenteredContainer>
    );
};

export default LoginRegistrationForm;
