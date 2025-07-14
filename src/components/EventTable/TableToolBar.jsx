// src/components/EventTable/TableToolbar.jsx
import React from 'react';
import { Box, Typography, TextField, MenuItem, Button } from '@mui/material';
import { Add } from '@mui/icons-material';

const TableToolbar = ({ search, onSearchChange, filterType, onFilterChange, onAddNew }) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexWrap="wrap"
      gap={2}
      mb={2}
    >
      <Typography variant="h6">📅 Upcoming Events</Typography>
      <Box display="flex" gap={3} flexWrap="wrap">
        <TextField
          id="search"
          size="small"
          label="Search by name or location"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <TextField
          id="filter"
          size="small"
          select
          label="Filter by type"
          sx={{ minWidth: 100 }}
          value={filterType}
          onChange={(e) => onFilterChange(e.target.value)}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Online">Online</MenuItem>
          <MenuItem value="Offline">Offline</MenuItem>
        </TextField>
        <Button variant="contained" startIcon={<Add />} onClick={onAddNew}>
          Add Event
        </Button>
      </Box>
    </Box>
  );
};

export default TableToolbar;