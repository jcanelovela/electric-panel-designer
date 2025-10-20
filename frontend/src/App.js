import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import Header from './components/Header';
import Toolbar from './components/Toolbar';
import Canvas from './components/Canvas';
import ComponentLibrary from './components/ComponentLibrary';
import './App.css';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [selectedTool, setSelectedTool] = useState(null);
  const [canvas, setCanvas] = useState(null);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Header canvas={canvas} />
        <Toolbar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
        <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          <ComponentLibrary canvas={canvas} />
          <Canvas setCanvas={setCanvas} selectedTool={selectedTool} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;