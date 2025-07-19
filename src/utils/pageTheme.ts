import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
  palette: {
    mode: 'light', // o 'dark' si preferís
    primary: {
      main: '#9C27B0', // Purple
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#03A9F4', // Light Blue
      contrastText: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default customTheme;
