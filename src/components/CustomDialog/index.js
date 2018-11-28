import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class CustomDialog extends Component {
  render() {
    const {
      handleAgree,
      handleDisagree,
      title,
      textBody,
      openDialog,
      agreeText,
      disagreeText,
      children,
    } = this.props;

    return (
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDisagree}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {textBody}
          </DialogContentText>
        </DialogContent>
        <DialogContent>
          {children}
        </DialogContent>
        <DialogActions>
          {handleDisagree ? <Button onClick={handleDisagree} color="primary">
            {disagreeText}
          </Button> : null}
          {handleAgree ? <Button onClick={handleAgree} color="primary">
            {agreeText}
          </Button> : null}
        </DialogActions>
      </Dialog>
    );
  }
}

CustomDialog.propTypes = {
  handleAgree: PropTypes.func,
  handleDisagree: PropTypes.func,
  title: PropTypes.string.isRequired,
  textBody: PropTypes.string,
  openDialog: PropTypes.bool.isRequired,
  agreeText: PropTypes.string,
  disagreeText: PropTypes.string,
};

CustomDialog.defaultProps = {
  handleDisagree: null,
  handleAgree: null,
  textBody: '',
  agreeText: 'Yes',
  disagreeText: 'No',
};


export default CustomDialog;
