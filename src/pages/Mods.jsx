import { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  List,
  ListItemButton,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const allMods = [
  { id: 'smapi', name: 'SMAPI', category: 'Core', summary: 'Required mod loader and runtime hooks.' },
  { id: 'content-patcher', name: 'Content Patcher', category: 'Content', summary: 'Customizes game content without editing base files.' },
  { id: 'farm-life', name: 'Farm Life Expanded', category: 'Quality of Life', summary: 'Adds new life sim interactions and surprises.' },
  { id: 'more-fish', name: 'More Fish', category: 'Gameplay', summary: 'Adds new fishing opportunities and species.' },
  { id: 'seasons-overhaul', name: 'Seasons Overhaul', category: 'Gameplay', summary: 'Refreshes seasonal balance and event pacing.' },
  { id: 'cozy-lighting', name: 'Cozy Lighting', category: 'Visuals', summary: 'Improves lighting and ambience for nighttime play.' },
  { id: 'map-utility', name: 'Map Utility', category: 'Quality of Life', summary: 'Adds additional map tools and navigation helpers.' },
  { id: 'auto-hoe', name: 'Auto Hoe', category: 'Automation', summary: 'Speeds up routine tasks and farming chores.' },
];

const initialProfiles = {
  'vanilla-qol': [
    { id: 'smapi', name: 'SMAPI', category: 'Core', summary: 'Required mod loader and runtime hooks.' },
    { id: 'content-patcher', name: 'Content Patcher', category: 'Content', summary: 'Customizes game content without editing base files.' },
    { id: 'cozy-lighting', name: 'Cozy Lighting', category: 'Visuals', summary: 'Improves lighting and ambience for nighttime play.' },
  ],
  cozy: [
    { id: 'smapi', name: 'SMAPI', category: 'Core', summary: 'Required mod loader and runtime hooks.' },
    { id: 'farm-life', name: 'Farm Life Expanded', category: 'Quality of Life', summary: 'Adds new life sim interactions and surprises.' },
    { id: 'cozy-lighting', name: 'Cozy Lighting', category: 'Visuals', summary: 'Improves lighting and ambience for nighttime play.' },
  ],
  hardcore: [
    { id: 'smapi', name: 'SMAPI', category: 'Core', summary: 'Required mod loader and runtime hooks.' },
    { id: 'seasons-overhaul', name: 'Seasons Overhaul', category: 'Gameplay', summary: 'Refreshes seasonal balance and event pacing.' },
    { id: 'auto-hoe', name: 'Auto Hoe', category: 'Automation', summary: 'Speeds up routine tasks and farming chores.' },
  ],
};

export default function Mods() {
  const [selectedProfile, setSelectedProfile] = useState('vanilla-qol');
  const [profiles, setProfiles] = useState(initialProfiles);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const profileMods = profiles[selectedProfile] ?? [];
  const addableMods = allMods.filter(
    (mod) => !profileMods.some((profileMod) => profileMod.id === mod.id),
  );

  const handleRemoveMod = (modId) => {
    setProfiles((prev) => ({
      ...prev,
      [selectedProfile]: (prev[selectedProfile] ?? []).filter((mod) => mod.id !== modId),
    }));
  };

  const handleAddMod = (mod) => {
    setProfiles((prev) => ({
      ...prev,
      [selectedProfile]: [...(prev[selectedProfile] ?? []), mod],
    }));
    setAddDialogOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          mt: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
          <FormControl sx={{ minWidth: 220 }}>
            <InputLabel id="profile-select-label">Profile</InputLabel>
            <Select
              labelId="profile-select-label"
              id="profile-select"
              label="Profile"
              value={selectedProfile}
              onChange={(event) => setSelectedProfile(event.target.value)}
            >
              <MenuItem value="vanilla-qol">Vanilla + QoL</MenuItem>
              <MenuItem value="cozy">Cozy</MenuItem>
              <MenuItem value="hardcore">Hardcore</MenuItem>
            </Select>
          </FormControl>

          <Button variant="contained" type="button" startIcon={<AddIcon />}>
            New
          </Button>
        </Box>

        <Button variant="contained" color="primary" type="button" startIcon={<PlayArrowIcon />}>
          Play
        </Button>
      </Box>

      <Box
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          p: 2,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ mb: 2 }}
        >
          <Typography variant="h6">Profile Mods</Typography>
          <Button
            variant="outlined"
            type="button"
            startIcon={<AddIcon />}
            onClick={() => setAddDialogOpen(true)}
          >
            Add Mod
          </Button>
        </Stack>

        <Stack spacing={2}>
          {profileMods.length > 0 ? (
            profileMods.map((mod) => (
              <Paper
                key={mod.id}
                variant="outlined"
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  width: '100%',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" fontWeight={700}>
                      {mod.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {mod.category}
                    </Typography>
                  </Box>

                  {mod.id !== 'smapi' && (
                    <Button
                      size="small"
                      color="error"
                      variant="text"
                      aria-label={`Remove ${mod.name}`}
                      sx={{ ml: 2 }}
                      onClick={() => handleRemoveMod(mod.id)}
                    >
                      <DeleteOutlineOutlinedIcon />
                    </Button>
                  )}
                </Box>

                <Typography variant="body2" color="text.primary">
                  {mod.summary}
                </Typography>
              </Paper>
            ))
          ) : (
            <Typography color="text.secondary">
              No mods are assigned to this profile yet. Add one to get started.
            </Typography>
          )}
        </Stack>
      </Box>

      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add mod to {selectedProfile}</DialogTitle>
        <DialogContent>
          {addableMods.length > 0 ? (
            <List>
              {addableMods.map((mod) => (
                <ListItemButton key={mod.id} onClick={() => handleAddMod(mod)}>
                  <ListItemText primary={mod.name} secondary={mod.category} />
                </ListItemButton>
              ))}
            </List>
          ) : (
            <Typography color="text.secondary">
              All available mods are already included in this profile.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
