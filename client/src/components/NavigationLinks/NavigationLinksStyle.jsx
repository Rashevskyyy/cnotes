import {styled} from '@mui/system';
import {ListItem} from '@mui/material';

export const ListItemStyled = styled(ListItem)(({theme}) => ({
    color: theme.palette.primary.beige
}));