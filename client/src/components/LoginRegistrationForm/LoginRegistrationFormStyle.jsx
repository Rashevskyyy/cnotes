import {styled} from '@mui/system';
import {Container, Tab} from '@mui/material';

export const TabContent = styled('div')(({ theme }) => ({
    width: '100%',
    maxWidth: '400px',
    '& .MuiTabs-indicator': {
        backgroundColor: 'transparent',
    },
    '& .MuiTab-root': {
        flex: 1,
        transition: '0.6s',
        backgroundColor: theme.palette.primary.main,
        color: '#ffffff',
        '&:not(:last-of-type)': {
            borderRight: `1px solid ${theme.palette.divider}`,
        },
    },
    '& .Mui-selected': {
        backgroundColor: '#ffffff',
        color: 'black',
    },
}));

export const StyledTab = styled(Tab)({});

export const CenteredContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(3),
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[3],
    borderRadius: '4px',
    backgroundColor: theme.palette.background.paper,
}));

