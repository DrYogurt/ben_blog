// App.js
import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom'; // Changed BrowserRouter to HashRouter
import Blog from './components/Blog.js';
import Header from './components/Header.js';
import Box from '@mui/material/Box';
import { StyledEngineProvider } from '@mui/material/styles';
import { Global } from '@emotion/react';
import { globalStyles } from './theme';
import { ThemeProvider, ThemeContext } from './ThemeContext';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

function App() {
  return (
    <ThemeProvider>
      <ThemeContext.Consumer>
        {({ theme, toggleTheme }) => (
          <MuiThemeProvider theme={theme}>
            <Router>
              <StyledEngineProvider injectFirst>
                <Global styles={globalStyles} />
                <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                  <Header />
                  <Box sx={{ flexGrow: 1 }}>
                    <Routes>
                      <Route path="/post/:postId?" element={<Blog/>} />
                      <Route path="/" element={<Blog/>} />
                    </Routes>
                  </Box>
                </Box>
              </StyledEngineProvider>
            </Router>
          </MuiThemeProvider>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>
  );
}

export default App;
