import { Routes, Route } from "react-router-dom";
import {
  LoginPage,
  RegisterPage,
  MainPage,
  NoteDetailPage,
} from "./pages/index";
import PrivateRoutes from "./components/PrivateRoutes";
import Cookies from "js-cookie";
import { darkTheme, lightTheme } from "./themes";
import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import Settings from "./pages/Settings";

const App = () => {
  const [theme, setTheme] = useState(
    Cookies.get("theme") === "dark" ? darkTheme : lightTheme
  );

  const toggleTheme = () => {
    const newTheme = theme.palette.mode === "light" ? darkTheme : lightTheme;
    setTheme(newTheme);
    Cookies.set("theme", newTheme.palette.mode, { expires: 365 });
  };

  const muiTheme = createTheme(theme);

  return (
    <ThemeProvider theme={muiTheme}>
      <Box sx={{ height: "100vh" }}>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/notes" element={<MainPage />} />
            <Route path="/notes/:id" element={<NoteDetailPage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/publish" element={<MainPage />} />
          </Route>

          <Route path="/" element={<LoginPage />} />
          <Route
            path="/login"
            element={<LoginPage toggleTheme={toggleTheme} />}
          />
          <Route
            path="/register"
            element={<RegisterPage toggleTheme={toggleTheme} />}
          />
        </Routes>
      </Box>
    </ThemeProvider>
  );
};

export default App;
