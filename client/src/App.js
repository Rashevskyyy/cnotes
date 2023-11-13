import {Routes, Route} from "react-router-dom";
import {
    LoginRegistrationPage,
    MainPage,
    NoteDetailPage,
} from "./pages/index";
import PrivateRoutes from "./components/PrivateRoutes";
import {lightTheme} from "./themes";
import {ThemeProvider} from "@mui/material/styles";
import {Box} from "@mui/material";
import Settings from "./pages/Settings/Settings";

const App = () => {
    // const [theme, setTheme] = useState(
    //     Cookies.get("theme") === "dark" ? darkTheme : lightTheme
    // );

    // const toggleTheme = () => {
    //     const newTheme = theme.palette.mode === "light" ? darkTheme : lightTheme;
    //     setTheme(newTheme);
    //     Cookies.set("theme", newTheme.palette.mode, {expires: 365});
    // };

    // const muiTheme = createTheme(theme);

    return (
        <ThemeProvider theme={lightTheme}>
            <Box sx={{
                height: "100vh",
                minHeight: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Routes>
                    <Route element={<PrivateRoutes/>}>
                        <Route path="/notes" element={<MainPage/>}/>
                        <Route path="/notes/:id" element={<NoteDetailPage/>}/>
                        <Route path="/settings" element={<Settings/>}/>
                        <Route path="/publish" element={<MainPage/>}/>
                    </Route>

                    <Route path="/" element={<LoginRegistrationPage/>}/>
                </Routes>
            </Box>
        </ThemeProvider>
    );
};

export default App;
