import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import React, {FC} from 'react';
interface ILoginModal {
  show: boolean,
  handleClose: ()=>void
}
const LoginModal:FC<ILoginModal> = ({show, handleClose})  => {
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
export default LoginModal;
