import React from 'react';
import {styled} from '@mui/system';
import {Typography} from '@mui/material';
import {ErrorOutline} from '@mui/icons-material';

const StyledError = styled(Typography)(({ theme }) => ({
    color: theme.palette.error.main,
    fontWeight: 'bold',
    padding: theme.spacing(0.5, 1),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.error.lighter,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
}));

const ValidationError = ({children}) => {
    return (
        <StyledError variant="body2">
            <ErrorOutline />
            {children}
        </StyledError>
    );
};

export default ValidationError;
