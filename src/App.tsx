import React, { ReactElement, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Sidebar from "./components/sidebar/Sidebar";
import HomeScreen from "./screens/homeScreen/HomeScreen";
import Header from "./components/header/Header";
import LoginScreen from "./screens/loginScreen/LoginScreen";
import "./app.css";
import { Routes, Route, Outlet, Navigate, useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store/store";
import WatchScreen from "./screens/watchScreen/WatchScreen";
import SearchScreen from "./screens/searchScreen/SearchScreen";
import SubscriptionsScreen from "./screens/subscriptionsScreen/SubscriptionsScreen";
import ChannelScreen from "./screens/channelScreen/ChannelScreen";
import LikedVideosScreen from "./screens/likedVideosScreen/LikedVideosScreen";

type LayoutProps = {
  children?: ReactElement;
  darkMode: boolean;
  toggleTheme: () => void;
};

const Layout = ({ darkMode, toggleTheme }: LayoutProps) => {
  const [sidebar, toggleSidebar] = useState(false);

  const handleToggleSidebar = () => {
    toggleSidebar((value) => !value);
  };

  return (
    <>
      <Header
        toggleTheme={toggleTheme}
        darkMode={darkMode}
        handleToggleSidebar={handleToggleSidebar}
      />
      <div className="sidebar-and-body d-flex pt-lg-2">
        <Sidebar sidebar={sidebar} handleToggleSidebar={handleToggleSidebar} />
        <Container fluid>
          <Outlet />
        </Container>
      </div>
    </>
  );
};

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const toggleTheme = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  const { accessToken, loading } = useSelector(
    (state: RootState) => state.auth
  );

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  useEffect(() => {
    if (!loading && !accessToken) {
      navigate("/auth");
    }
  }, [accessToken, loading, navigate]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <>
        <Routes>
          <Route
            path="/"
            element={<Layout darkMode={darkMode} toggleTheme={toggleTheme} />}
          >
            <Route path="/" element={<HomeScreen />} />
          </Route>

          <Route path="/auth" element={<LoginScreen />} />

          <Route
            path="/search/:query"
            element={<Layout darkMode={darkMode} toggleTheme={toggleTheme} />}
          >
            <Route path="/search/:query" element={<SearchScreen />} />
          </Route>

          <Route
            path="/watch/:id"
            element={<Layout darkMode={darkMode} toggleTheme={toggleTheme} />}
          >
            <Route path="/watch/:id" element={<WatchScreen />} />
          </Route>

          <Route
            path="/feed/subscriptions"
            element={<Layout darkMode={darkMode} toggleTheme={toggleTheme} />}
          >
            <Route
              path="/feed/subscriptions"
              element={<SubscriptionsScreen />}
            />
          </Route>

          <Route
            path="/channel/:channelId"
            element={<Layout darkMode={darkMode} toggleTheme={toggleTheme} />}
          >
            <Route path="/channel/:channelId" element={<ChannelScreen />} />
          </Route>

          <Route
            path="/feed/liked"
            element={<Layout darkMode={darkMode} toggleTheme={toggleTheme} />}
          >
            <Route
              path="/feed/liked"
              element={<LikedVideosScreen />}
            />
          </Route>

          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </>
    </ThemeProvider>
  );
};

export default App;
