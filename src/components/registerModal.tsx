import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import React, {FC} from 'react';
interface IRegisterModal {
  show: boolean,
  handleClose: ()=>void
}
const RegisterModal:FC<IRegisterModal> = ({show, handleClose})  => {
    return (
        <>
        <Dialog open={show} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
        <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
          />
        <TextField
            autoFocus
            margin="dense"
            label="Phone number"
            type="phone"
            fullWidth
          />
        <TextField
            autoFocus
            margin="dense"
            label="Password"
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
        </>
    )
}
export default RegisterModal;
