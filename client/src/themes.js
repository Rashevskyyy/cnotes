import {createTheme} from "@mui/material/styles";

const colors = {
    defaultLabel: '#334150',
    focusedLabel: '#334150',
    errorLabel: '#d32f2f',
    focusedBorder: '#334150',
    errorBorder: '#d32f2f',
    hoverBorder: 'red',
    beigeDark: '#6F5B3E',
    cream: '#F9F6F0',
    beige: '#C4AE78',
    black: '#171515',
    white: '#fff',
};

export const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: colors.beigeDark,
            black: colors.black,
            cream: colors.cream,
            white: colors.white,
            beige: colors.beige,
            errorBorder: colors.errorBorder,
            focusedBorder: colors.focusedBorder,
        },
        secondary: {
            main: colors.beige
        },
        background: {
            paper: colors.cream,
        },
    },
    typography: {
        fontFamily: "Roboto",
    },
    components: {
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: colors.defaultLabel,
                    '&.Mui-focused': {
                        color: colors.focusedLabel,
                    },
                    '&.Mui-error': {
                        color: colors.errorLabel,
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '&.Mui-focused': {
                        backgroundColor: colors.cream,
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: colors.focusedBorder,
                    },
                    '&.Mui-error .MuiOutlinedInput-notchedOutline': {
                        borderColor: colors.errorBorder,
                    },
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
              input: {
                ':-webkit-autofill': {
                  WebkitBoxShadow: `0 0 0 1000px ${colors.cream} inset`,
                  WebkitTextFillColor: 'inherit',
                },
              },
                root: {
                    borderRadius: '8px',
                    '&:hover': {
                        borderColor: colors.hoverBorder,
                    },
                },
            },
        },
    },
});


export const darkTheme = createTheme({
    palette: {
        components: {},
        mode: "dark",
        primary: {
            main: "#2196f3",
        },
        secondary: {
            main: "#f50057",
        },
    },
    typography: {
        fontFamily: "Roboto",
    },
});
