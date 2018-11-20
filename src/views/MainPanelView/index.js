import React from 'react';
import { Redirect } from 'react-router-dom';
import { withAlert } from 'react-alert';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MainContainer from '../../components/MainContainer';
import EditionsTable from '../../components/EditionsTable';

import RequestExpansionPanel from '../../components/RequestExpansionPanel';
import CustomDialog from '../../components/CustomDialog';

const messages = {
  REQUEST_PERM: {
    success_msg: 'Successfully requested permissions',
    error_msg: 'Cannot request permissions',
  },
};

const dialogContent = {
  editionCreationMode: {
    title: 'Edition',
    bodyText: 'Create edition',
  },
  editionEditMode: {
    title: 'Edit',
    bodyText: 'Change edition details',
  },
};


const styles = theme => ({
  mainContainer: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 10,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  rightButtonIcon: {
    marginLeft: theme.spacing.unit,
  },
  addEditionButtonContainer: {
    width: '100%',
    height: theme.spacing.unit * 8,
    position: 'relative',
    marginBottom: theme.spacing.unit * 6,
  },
  addEditionButton: {
    position: 'absolute',
    right: 0,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2,
  },
  textField: {
    width: '100%',
  },
});


class MainPanelView extends React.Component {
  constructor() {
    super();

    this.state = {
      open: false,
      chosenEditionId: null,
      editionCreationMode: false,
      editionEditMode: false,
      newEditionName: '',
      isNewEditionNameValid: true,
      newEditionMaxParticipants: 0,
      isNewEditionMaxParticipantsValid: true,
      newEditionEndDate: '',
      isNewEditionEndDateValid: true,
    };

    this.setEditionToRedirect = this.setEditionToRedirect.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event, name) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  setEditionToRedirect(id, status) {
    const { alert } = this.props;
    if (status === 'PENDING') {
      alert.show('Cannot open pending edition. Please wait for results.', { type: 'inform' });
      return;
    }

    this.setState({ chosenEditionId: id });
  }

  renderCreationEditionDialog() {
    const {
      editionEditMode,
      editionCreationMode,
      isNewEditionValid,
      newEditionEndDate,
      newEditionMaxParticipants,
      newEditionName,
      isNewEditionEndDateValid,
      isNewEditionMaxParticipantsValid,
      isNewEditionNameValid,
    } = this.state;

    const { classes } = this.props;

    return (
      <CustomDialog
        handleDisagree={this.creationDialogDisagree}
        handleAgree={this.creationDialogAgree}
        title={dialogContent[editionEditMode ? 'editionEditMode' : 'editionCreationMode'].title}
        textBody={dialogContent[editionEditMode ? 'editionEditMode' : 'editionCreationMode'].bodyText}
        openDialog={editionCreationMode || editionEditMode}
        agreeText={editionEditMode ? 'Save' : 'Create'}
        disagreeText="Cancel"
      >
        <TextField
          error={!isNewEditionNameValid}
          value={newEditionName}
          id="standard-error"
          label="Name"
          className={classes.textField}
          margin="normal"
          onChange={event => this.handleChange(event, 'newEditionName')}
        />
        <TextField
          id="standard-number"
          label="Max participants"
          value={newEditionMaxParticipants}
          onChange={event => this.handleChange(event, 'newEditionMaxParticipants')}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
      </CustomDialog>
    );
  }

  render() {
    const { classes } = this.props;
    const {
      chosenEditionId,
    } = this.state;
    console.log('now inside MainPanel');

    if (chosenEditionId) {
      return (
        <>
          <MainContainer />
          <Redirect to={`/editions/${chosenEditionId}/products`} />;
        </>
      );
    }

    return (
      <>
        <MainContainer />
        <div className={classes.mainContainer}>
          <Typography component="h1" variant="h2">
            Editions list
          </Typography>
          <EditionsTable onEditionClicked={this.setEditionToRedirect} />
          <div className={classes.addEditionButtonContainer}>
            <Button
              variant="contained"
              color="primary"
              className={classes.addEditionButton}
              onClick={() => this.setState({ editionCreationMode: true })}
            >
              Add Edition
              <Icon className={classes.rightButtonIcon}>add</Icon>
            </Button>
          </div>
          <Divider />
          <RequestExpansionPanel />
        </div>
        {this.renderCreationEditionDialog()}
      </>
    );
  }
}

export default withStyles(styles)(withAlert(MainPanelView));
