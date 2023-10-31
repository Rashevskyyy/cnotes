import {styled} from '@mui/system';
import {Avatar, Divider, ListItem} from '@mui/material';

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
    margin: theme.spacing(2),
}));

export const CustomDivider = styled(Divider)(({theme}) => ({
    backgroundColor: theme.palette.primary.black,
    width: "75%",
    marginLeft: "auto",
    marginRight: "auto",
}));

export const ListItemStyled = styled(ListItem)(({theme}) => ({
    color: theme.palette.primary.beige
}));