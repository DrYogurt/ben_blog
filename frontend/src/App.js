// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Blog from './components/Blog.js';
import Header from './components/Header.js';
import Box from '@mui/material/Box';
import { StyledEngineProvider } from '@mui/material/styles';
import { Global } from '@emotion/react';
import { globalStyles } from './theme';

function App() {
  return (
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
  );
}

export default App;
