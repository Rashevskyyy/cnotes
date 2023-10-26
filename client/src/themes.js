import { createTheme } from "@mui/material/styles";

const colors = {
  defaultLabel: '#334150',
  focusedLabel: '#334150',
  errorLabel: '#d32f2f',
  focusedBorder: '#334150',
  errorBorder: '#d32f2f',
  hoverBorder: 'red',
};

export const lightTheme = createTheme({
  palette: {
    mode: "light",
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
