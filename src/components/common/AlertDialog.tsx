'use client';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

type AlertDialogProps = {
  open: boolean;
  title?: string;
  content: string;
  cancelLabel?: string;
  confirmLabel?: string;
  handleClose: () => void;
  handleConfirm: () => void;
};

const AlertDialog: React.FC<AlertDialogProps> = ({
  open,
  title,
  content,
  cancelLabel = '취소',
  confirmLabel = '확인',
  handleClose,
  handleConfirm,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{cancelLabel}</Button>
        <Button onClick={handleConfirm} autoFocus>
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default AlertDialog;
