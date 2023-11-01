import {styled} from '@mui/system';
import {Box, Button, Container} from '@mui/material';

export const SettingsContainer = styled(Container)(({ theme }) => ({
    marginTop: theme.spacing(4),
    padding: theme.spacing(2)
}));

export const InputContainer = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(2),
}));

export const StyledButton = styled(Button)(({ theme }) => ({
    marginBottom: theme.spacing(2),
}));