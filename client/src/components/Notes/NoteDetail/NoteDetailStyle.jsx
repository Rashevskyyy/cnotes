import {styled} from '@mui/system';
import {Button, Grid, Typography} from '@mui/material';

export const BackButton = styled(Button)(({theme}) => ({
    padding: "1rem",
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
}));

export const SaveButton = styled(Button)(({theme}) => ({
    backgroundColor: theme.palette.primary.main,
}));

export const AddCommentButton = styled(Button)(({theme}) => ({
    backgroundColor: theme.palette.primary.main,
    marginTop: theme.spacing(1),
}));

export const GridStyled = styled(Grid)(({theme}) => ({
    display: 'flex',
    alignItems: "center"
}));


export const TypographyStyled = styled(Typography)(({theme}) => ({
    display: 'flex',
    alignItems: "center"
}));

export const TagTypography = styled(({ tagColor, ...props }) => <Typography {...props} />)(({ tagColor }) => ({
    color: tagColor,
    fontWeight: 'bold',
    display: 'inline-flex',
    alignItems: 'center',
}));

export const TagIndicator = styled('span')(({ tagColor }) => ({
    display: 'inline-block',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: tagColor,
    marginRight: '8px',
}));

