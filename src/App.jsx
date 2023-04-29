import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Contacts from "./pages/Contacts";
import EditContact from "./pages/EditContact";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initAuth } from "./slices/AuthSlice";
import { Routes, Route } from "react-router-dom";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#13173A",
    },
    secondary: {
      main: "#AFD4EF",
    },
    background: {
      default: "#e5e5e5",
    },
  },
  typography: {
    fontFamily: "'Comfortaa', cursive",
  },
  shape: {
    borderRadius: "32px",
  },
  props: {},
  // We can use this to override the default styles of the components to fit our design
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          boxShadow: "none",
          paddingTop: "0.5em",
          paddingBottom: "0.5em",
          fontSize: "1em",
        },
      },
    },
    MuiAppBar: {
      elevation: 0,
      styleOverrides: {
        root: {
          boxShadow:
            "0px 1px 3px 0px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 2px 1px -1px rgb(0 0 0 / 12%)",
        },
      },
    },
  },
});

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initAuth());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="App">
        <AppBar
          position="static"
          sx={{
            pt: 2,
            pb: 2,
            mb: 4,
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="h3">Contact List</Typography>
          </Container>
        </AppBar>
        <Container
          maxWidth="lg"
          sx={{
            p: 2,
          }}
        >
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/contacts/edit" element={<EditContact />} />
          </Routes>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
