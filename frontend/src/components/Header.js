import React, { useContext } from "react";
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LightMode from '@mui/icons-material/LightMode';  // Sun icon
import DarkMode from '@mui/icons-material/DarkMode';  // Moon icon
import { ThemeContext } from '../ThemeContext';  // Don't forget to adjust the relative path to your ThemeContext.js file
import lightTheme, { darkTheme } from '../theme.js';


const Header = () => {
    const theme = useTheme();
    const { themeType, toggleTheme } = useContext(ThemeContext);
    return (
      <Box sx={{ 
          width: '100%', 
          height: '10vh',
          background: theme.palette.background.default,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
      }}>
        <Typography variant="h4" color="text.primary">
            To Whom it May Concern
        </Typography>
        <IconButton 
          onClick={toggleTheme} 
          sx={{ 
            position: 'absolute',
            right: '5%',
            color: theme.palette.text.primary
          }}
        >
          {theme.palette.type === 'light' ? <LightMode /> : <DarkMode />}
          {console.log(theme.palette.mode)}
        </IconButton>
      </Box>
    );
  }
  

export default Header;
