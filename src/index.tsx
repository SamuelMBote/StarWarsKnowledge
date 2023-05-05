import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {CssBaseline, ThemeProvider, createTheme} from '@mui/material';
import StarJedi from '../src/assets/fonts/StarJedi.ttf';

const theme = createTheme({
  typography: {
    h1: {fontFamily: ['StarJedi', '"Open Sans"', 'Roboto'].join(',')},
    h2: {fontFamily: ['StarJedi', '"Open Sans"', 'Roboto'].join(',')},
    h3: {fontFamily: ['StarJedi', '"Open Sans"', 'Roboto'].join(',')},
    h4: {fontFamily: ['StarJedi', '"Open Sans"', 'Roboto'].join(',')},
    h5: {fontFamily: ['StarJedi', '"Open Sans"', 'Roboto'].join(',')},
    h6: {fontFamily: ['StarJedi', '"Open Sans"', 'Roboto'].join(',')},
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: `@font-face{
      font-family: 'StarJedi';
      font-style: normal;
      font-display: swap;
      font-weight: 400;
      src: local('StarJedi'), local('StarJedi'), url(${StarJedi}) format('ttf');
      unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
    }`,
    },
  },
});
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

