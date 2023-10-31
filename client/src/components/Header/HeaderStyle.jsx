import {alpha, styled} from '@mui/system';
import InputBase from '@mui/material/InputBase';
import AppBar from '@mui/material/AppBar';
import SearchIcon from '@mui/icons-material/Search';
import {Select} from '@mui/material';

export const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
    },
    display: "flex",
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    right: 0,
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 1),
        paddingRight: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "25ch",
            "&:focus": {
                width: "40ch",
            },
        },
        borderRadius: theme.shape.borderRadius,
        borderColor: theme.palette.primary.black,
        borderWidth: 1,
        borderStyle: "solid",
        color: theme.palette.primary.main,
        background: theme.palette.primary.cream,
    },
}));

export const StyledSelect = styled(Select)(({ theme }) => ({
    color: "inherit",
    marginLeft: theme.spacing(1),
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 1),
        paddingRight: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: '200px',
        borderRadius: theme.shape.borderRadius,
        borderColor: theme.palette.primary.black,
        borderWidth: 1,
        borderStyle: "solid",
        color: theme.palette.primary.main,
        background: theme.palette.primary.cream,
    },
}));

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.primary.white,
    borderBottom: `1px solid ${theme.palette.primary.black}`,
    boxShadow: "unset",
}));

export const StyledSearchIcon = styled(SearchIcon)(({ theme }) => ({
    color: theme.palette.primary.main,
    zIndex: "2"
}));