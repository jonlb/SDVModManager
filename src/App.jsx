import { Link as RouterLink, Route, Routes } from 'react-router-dom';
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import Home from './pages/Home.jsx';
import Mods from './pages/Mods.jsx';
import Settings from './pages/Settings.jsx';

export default function App() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            SDV Mod Manager
          </Typography>
          <Button color="inherit" component={RouterLink} to="/">Home</Button>
          <Button color="inherit" component={RouterLink} to="/mods">Mods</Button>
          <Button color="inherit" component={RouterLink} to="/settings">Settings</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 3 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mods" element={<Mods />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Container>
    </Box>
  );
}
