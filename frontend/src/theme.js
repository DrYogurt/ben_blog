import { createTheme } from '@mui/material/styles';
import { css, Global } from '@emotion/react';

// Global styles
const globalStyles = css`
  blockquote {
    border-left: 5px solid #9e6c20ff;
    background-color: #fae3c6ff;
    padding: 0.5rem 0.5rem;
    margin: 0.5rem 0;
  }
`;

const theme = createTheme({
  palette: {
    background: {
      default: '#fff9e6ff',
      paper: '#ffe8d1ff',
    },
    primary: {
      main: '#9e6c20ff',
    },
    secondary: {
      main: '#568ea3ff',
    },
    text: {
      primary: '#22181cff',
    },
  },
  typography: {
    fontFamily: 'Lora, Serif',
  },
  

});

export default theme;
export { globalStyles };