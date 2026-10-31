import { useMemo, useState } from 'react';
import { Link as RouterLink, Route, Routes } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  IconButton,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Mods from './pages/Mods.jsx';
import Settings from './pages/Settings.jsx';

export default function App() {
  const [mode, setMode] = useState('light');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              SDV Mod Manager
            </Typography>
            <Button color="inherit" component={RouterLink} to="/">
              Mods
            </Button>
            <Button color="inherit" component={RouterLink} to="/settings">
              Settings
            </Button>
            <IconButton
              color="inherit"
              aria-label={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              onClick={() => setMode((current) => (current === 'light' ? 'dark' : 'light'))}
            >
              {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Container sx={{ mt: 3 }}>
          <Routes>
            <Route path="/" element={<Mods />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
