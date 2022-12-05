import React from 'react';

// mui
import { Dialog } from '@mui/material';

type Props = React.PropsWithChildren<{
  open: boolean;
  onClose: () => void;
}>;

/**
 * Renders a dialog box.
 */
export const CustomDialog: React.FC<Props> = ({ open, onClose, children }) => (
  <Dialog
    onClose={onClose}
    open={open}
    sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
    maxWidth="xs"
  >
    {children}
  </Dialog>
);

export default CustomDialog;
