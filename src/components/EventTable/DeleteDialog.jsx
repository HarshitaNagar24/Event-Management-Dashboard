// src/components/EventTable/DeleteDialog.jsx
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import CustomDialog from '../common/CustomDialog';

const DeleteDialog = ({ open, onClose, onConfirm }) => {
  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      title="Confirm Deletion"
      hideActions // Disables default Submit/Cancel buttons
    >
      <Typography>Are you sure you want to delete this event?</Typography>

      <Box display="flex" justifyContent="flex-end" gap={1} mt={3}>
        <Button onClick={onClose} variant="outlined" color="inherit">
          Cancel
        </Button>
        <Button onClick={onConfirm} variant="contained" color="error">
          Delete
        </Button>
      </Box>
    </CustomDialog>
  );
};

export default DeleteDialog;