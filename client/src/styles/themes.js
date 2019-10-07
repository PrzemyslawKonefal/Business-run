import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      light: '#ff8d33',
      main: '#F58C49',
      dark: '#e17b46',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff717c',
      main: '#ff717c',
      dark: '#dc5a68',
      contrastText: '#FFFFFF'
    },
    default: {
      light: '#ffd33a',
      main: '#ff1d49',
      dark: '#c8b1dc',
      contrastText: '#2e79ff',
    }
  }
});
