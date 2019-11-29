import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

export default function FormDialog() {
  const [open, setOpen] = React.useState(true);
  const [submitButtonState, setSubmitButtonState] = React.useState(true);
  const [teamNameErrorMsg, setTeamNameErrorMsg] = React.useState();
  const [teamNameError, setTeamNameError] = React.useState(false);
  const [state, setState] = React.useState({
    teamName: '',
    creator: ''
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTeamNameError(false)
    setTeamNameErrorMsg(null)
    setState({
      ...state,
      teamName: ''
    });
  }

  const handleInputChange = event => {
    const value = event.target.value
    const name = event.target.name

    setState({
      ...state,
      [name]: value
    });

    if (name === 'teamName') {
      // Checking for non ASCII
      if ([...value].some(char => char.charCodeAt(0) > 127)) {
          setSubmitButtonState(true);
          setTeamNameError(true);
          return setTeamNameErrorMsg('ASCII characters only');
      }

      if (value.length < 4 || value.length > 64) {
          setSubmitButtonState(true);
          setTeamNameError(true);
          return setTeamNameErrorMsg('Length must be between 4 and 64 characters');
      }

      // passes all valiadation
      setTeamNameError(false);
      setTeamNameErrorMsg(null);
      setSubmitButtonState(false);
    }
  }

  return (
    <div>
      <Fab onClick={handleClickOpen}>
        <AddIcon />
      </Fab>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Please enter the name of your team</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            error={teamNameError}
            helperText={teamNameErrorMsg}
            autoFocus
            margin="dense"
            id="Team name"
            label="Email Address"
            name="teamName"
            value={state.teamName || ''}
            onChange={handleInputChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button disabled={submitButtonState} onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}