import React from 'react';

// components
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
} from '@mui/material';

// types
type Props = {
  open: boolean;
  title: string;
  body: string;
  handleCancel: () => void;
  handleConfirm: () => void;
  cancelLabel?: string;
  confirmLabel?: string;
};

/**
 * Opens a WarningDialog modal box component.
 *
 * The WarningDialog gives the user a warning message, and presents two options: cancel and confirm.
 */
export const WarningDialog: React.FC<Props> = ({
  title,
  body,
  open = false,
  handleCancel,
  handleConfirm,
  cancelLabel = 'Cancel',
  confirmLabel = 'Confirm',
}) => (
  <Dialog open={open}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent dividers>
      <Typography variant="body1">{body}</Typography>
    </DialogContent>
    <DialogActions>
      <Button variant="outlined" onClick={handleCancel}>
        {cancelLabel}
      </Button>
      <Button
        color="error"
        variant="contained"
        onClick={handleConfirm}
        disableElevation
      >
        {confirmLabel}
      </Button>
    </DialogActions>
  </Dialog>
);
