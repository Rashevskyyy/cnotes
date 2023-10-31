import {styled} from '@mui/system';
import {Box, Divider, Typography} from '@mui/material';

export const StyledDivider = styled(Divider)(({theme}) => ({
    backgroundColor: theme.palette.primary.black,
    width: "100%",
}));

export const LogoContainer = styled(Box)({
    display: "flex",
    alignItems: "center",
    padding: "8px",
    paddingLeft: 24,
    paddingRight: 24,
    cursor: "pointer",
});

export const LogoTypography = styled(Typography)({
    padding: 8,
    color: "#ffffff",
});