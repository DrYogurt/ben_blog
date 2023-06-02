import { createTheme } from '@mui/material/styles';
import { css, Global } from '@emotion/react';


// Global styles
const globalStyles = (theme) => css`
  blockquote {
    border-left: 5px solid ${theme.palette.primary.main};
    background-color: ${theme.palette.background.accent};
    padding: 0.5rem 0.5rem;
    margin: 0.5rem 0;
  }
`;


const darkTheme = createTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#424242', // dark grey
      paper: '#303030', // darker grey
      accent: '#334455'
    },
    primary: {
      main: '#b3e5fc', // light blue
      dark: '#8093a1', // dark blue
    },
    secondary: {
      main: '#81c784', // light green
      dark: '#4b8b5b', // dark green
    },
    text: {
      primary: '#fff', // white
      secondary: '#b3b3b3', // light grey
    },
    error: {
      main: '#f44336', // red
    },
    success: {
      main: '#4caf50', // green
    },
  },
  typography: {
    fontFamily: 'Lora, Serif',
  },
});


const lightTheme = createTheme({
  palette: {
    type:'light',
    background: {
      default: '#fff9e6ff',
      paper: '#ffe8d1ff',
      accent: '#ffeeddff'
    },
    primary: {
      main: '#9e6c20ff',
      dark: '#674314ff', // dark brown
    },
    secondary: {
      main: '#568ea3ff',
      dark: '#3c5c73ff', // dark blue-grey
    },
    text: {
      primary: '#22181cff',
      secondary: '#444444ff', // dark grey
    },
    error: {
      main: '#f44336', // red
    },
    success: {
      main: '#4caf50', // green
    },
  },
  typography: {
    fontFamily: 'Lora, Serif',
  },
});

export default lightTheme;

export { darkTheme, globalStyles };