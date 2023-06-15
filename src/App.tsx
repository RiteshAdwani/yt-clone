import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Sidebar from "./components/sidebar/Sidebar";
import HomeScreen from "./screens/HomeScreen";
import Header from "./components/header/Header";
import "./app.css";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebar, toggleSidebar] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleToggleSidebar = () => {
    toggleSidebar(value => !value)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Header toggleTheme={toggleTheme} darkMode={darkMode} handleToggleSidebar={ handleToggleSidebar} />
      <div className="sidebar-and-body d-flex border border-warning">
        <Sidebar sidebar={sidebar} />
        <Container fluid>
          <HomeScreen/>
        </Container>
      </div>
    </ThemeProvider>
  )
}

export default App
