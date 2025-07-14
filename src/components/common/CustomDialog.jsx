import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CustomDialog = ({
  open,
  onClose,
  onSubmit,
  title,
  children,
  submitLabel = "Submit",
  cancelLabel = "Cancel",
  maxWidth = "md",
  fullWidth = true,
  disableSubmit = false,
  hideActions = false, // ✅ New prop
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth={fullWidth} maxWidth={maxWidth}>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography fontWeight={600}>{title}</Typography>
        <IconButton edge="end" size="small" aria-label="close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <form onSubmit={onSubmit}>
        <DialogContent dividers>{children}</DialogContent>

        {!hideActions && (
          <DialogActions>
            <Button onClick={onClose}>{cancelLabel}</Button>
            <Button type="submit" variant="contained" disabled={disableSubmit}>
              {submitLabel}
            </Button>
          </DialogActions>
        )}
      </form>
    </Dialog>
  );
};

export default CustomDialog;
