import React, { ReactElement, useState } from "react";
import { Container } from "react-bootstrap";
import Sidebar from "./components/sidebar/Sidebar";
import HomeScreen from "./screens/homeScreen/HomeScreen";
import Header from "./components/header/Header";
import LoginScreen from "./screens/loginScreen/LoginScreen";
import "./app.css";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

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
      <div className="sidebar-and-body d-flex">
        <Sidebar sidebar={sidebar} handleToggleSidebar={handleToggleSidebar} />
        <Container fluid><Outlet/></Container>
      </div>
    </>
  );
};

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

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
            path="/search"
            element={<Layout darkMode={darkMode} toggleTheme={toggleTheme} />}
          >
            <Route path="/search" element={<h1>Search Results</h1>} />
          </Route>

          <Route path="/*" element={ <Navigate to="/"/>} />

        </Routes>
      </>
    </ThemeProvider>
  );
};

export default App;
