import { styled } from '@mui/system';
import {Card, CardHeader, Typography} from '@mui/material';

export const StyledAvatar = styled('div')({
    backgroundColor: 'red',
    borderRadius: '50%',
});

export const StyledTypography = styled(({ tagColor, ...props }) => <Typography {...props} />)(({ tagColor }) => ({
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    color: tagColor,
    fontWeight: 'bold',
}));

export const StyledSpan = styled('span')(({ tagColor }) => ({
    display: 'inline-block',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: tagColor,
    marginRight: '12px',
}));

export const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
    paddingBottom: 0,
    paddingTop: 16,
    paddingLeft: 0,
}));

export const DescriptionTypography = styled(Typography)({
    height: "3em",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
});

export const CardStyled = styled(Card)(({theme}) => ({
    backgroundColor: theme.palette.primary.white,
}));
