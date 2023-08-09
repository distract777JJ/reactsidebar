import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert,AlertProps } from '@mui/material';
import {
    GridRowId,
  } from '@mui/x-data-grid';
interface ConfirmationDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: (id: GridRowId) => void; // Add id parameter
    id?: GridRowId | null; // Make id property optional
    message: string;
  }
  const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
    open,
    onClose,
    onConfirm,
    id,
    message,
    
  }) => {
  
    const [snackbar, setSnackbar] = React.useState<Pick<
    AlertProps,
    'children' | 'severity'
  > | null>(null);
   const [showSnackbar, setShowSnackbar] = useState(false);
 

    const handleConfirm = () => {
        if (id) {
            onConfirm(id); // Call onConfirm with the provided id
          }
      setSnackbar({ children: 'Data successfully saved', severity: 'success' });
     
    };
    const handleCloseSnackbar = () => setSnackbar(null);
    const handleClose = () => {
      //setSnackbar({ children: "Data save Failed!", severity: 'error' });
      onClose();
    };
  

    return (
        <>
          <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirmation</DialogTitle>
            <DialogContent>{message}</DialogContent>
            <DialogActions>
              <Button onClick={onClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleConfirm} color="primary">
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
          {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar}
         autoHideDuration={2000}
         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} // Set anchor origin to center
         >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
      
        </>
      );
  };

export default ConfirmationDialog;
