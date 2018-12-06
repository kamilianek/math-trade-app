/**
 * Created by kamilianek on 20.11.18.
 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withAlert } from 'react-alert';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CustomDialog from '../CustomDialog';
import actions from '../../actions';

const moment = require('moment');

const styles = theme => ({
  textField: {
    width: '100%',
    marginTop: 3 * theme.spacing.unit,
    marginBottom: 3 * theme.spacing.unit,
  },
  closeButton: {
    margin: theme.spacing.unit * 2,
  },
  closeText: {
    marginTop: theme.spacing.unit * 3,
  },
});

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

class CreateEditionDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chosenEditionId: null,
      newEditionName: '',
      isNewEditionNameValid: true,
      newEditionMaxParticipants: 0,
      isNewEditionMaxParticipantsValid: true,
      newEditionEndDate: '',
      isNewEditionEndDateValid: true,
      newEditionDescription: '',
      isNewEditionDescriptionValid: true,
    };

    this.editionCreationDialogAgree = this.editionCreationDialogAgree.bind(this);
    this.editionCreationDialogDisagree = this.editionCreationDialogDisagree.bind(this);
    this.setInitialState = this.setInitialState.bind(this);
    this.handleEditionClose = this.handleEditionClose.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.chosenEditionId && props.edition && state.chosenEditionId !== props.chosenEditionId) {
      return {
        newEditionName: props.edition.name,
        newEditionMaxParticipants: props.edition.maxParticipants,
        newEditionEndDate: props.edition.newEditionEndDate,
        newEditionDescription: props.edition.description,
        chosenEditionId: props.chosenEditionId,
      };
    }

    return null;
  }

  handleChange = (event, name, validatorName) => {
    this.setState({
      [name]: event.target.value,
      [validatorName]: true,
    });
  };

  handleEditionClose() {
    const { closeEdition, alert } = this.props;

    closeEdition()
      .then(() => alert.show('Successfully closed edition', { type: 'success' }))
      .catch(error => alert.show(error.message, { type: 'error' }));
  }

  setInitialState() {
    this.setState({
      chosenEditionId: null,
      newEditionName: '',
      isNewEditionNameValid: true,
      newEditionMaxParticipants: 0,
      isNewEditionMaxParticipantsValid: true,
      newEditionEndDate: '',
      isNewEditionEndDateValid: true,
      newEditionDescription: '',
      isNewEditionDescriptionValid: true,
    });
  }

  editionCreationDialogDisagree() {
    this.setInitialState();
    this.props.onDisagree();
  }

  editionCreationDialogAgree() {
    const {
      newEditionName,
      newEditionMaxParticipants,
      newEditionEndDate,
      newEditionDescription,
    } = this.state;

    const {
      alert,
      chosenEditionId,
      edition,
    } = this.props;

    if (edition && edition.status === 'CLOSED') {
      return;
    }

    const isNewEditionNameValid = newEditionName.length > 0;
    const isNewEditionMaxParticipantsValid = newEditionMaxParticipants > 0;
    const isNewEditionEndDateValid = newEditionEndDate && moment().isBefore(newEditionEndDate);
    const isNewEditionDescriptionValid = newEditionDescription.length > 0;

    if (isNewEditionNameValid && isNewEditionMaxParticipantsValid
         && isNewEditionDescriptionValid && isNewEditionEndDateValid) {
      if (chosenEditionId) {
        this.props.editEdition(
          newEditionName,
          newEditionDescription,
          newEditionEndDate,
          newEditionMaxParticipants,
        ).then(() => {
          this.props.onAgree();
          alert.show('Successfully updated edition', { type: 'success' });
          this.setInitialState();
        }).catch((error) => {
          alert.show(`Cannot update edition: ${error}`, { type: 'error' });
        });
      } else {
        this.props.createEdition(
          newEditionName,
          newEditionDescription,
          newEditionEndDate,
          newEditionMaxParticipants,
        ).then(() => {
          this.props.onAgree();
          alert.show('Successfully added edition', { type: 'success' });
          this.setInitialState();
        }).catch((error) => {
          alert.show(`Cannot add edition: ${error}`, { type: 'error' });
        });
      }

      return;
    }

    this.setState({
      isNewEditionNameValid,
      isNewEditionMaxParticipantsValid,
      isNewEditionDescriptionValid,
      isNewEditionEndDateValid,
    });
  }

  render() {
    const {
      isNewEditionEndDateValid,
      newEditionEndDate,
      newEditionMaxParticipants,
      newEditionName,
      isNewEditionMaxParticipantsValid,
      isNewEditionNameValid,
      newEditionDescription,
      isNewEditionDescriptionValid,
    } = this.state;

    const {
      classes,
      creationMode,
      chosenEditionId,
      edition,
    } = this.props;

    const isClosed = !!(edition && edition.status === 'CLOSED');

    return (
      <CustomDialog
        handleDisagree={this.editionCreationDialogDisagree}
        handleAgree={this.editionCreationDialogAgree}
        title={dialogContent[chosenEditionId ? 'editionEditMode' : 'editionCreationMode'].title}
        textBody={dialogContent[chosenEditionId ? 'editionEditMode' : 'editionCreationMode'].bodyText}
        openDialog={!!(creationMode || chosenEditionId)}
        agreeText={creationMode ? 'Create' : 'Save'}
        disagreeText="Cancel"
      >
        <TextField
          error={!isNewEditionNameValid}
          value={newEditionName}
          disabled={isClosed}
          id="standard-error"
          label="Name"
          className={classes.textField}
          margin="normal"
          onChange={event => this.handleChange(event, 'newEditionName', 'isNewEditionNameValid')}
        />
        <TextField
          id="standard-textarea"
          label="Description"
          multiline
          disabled={isClosed}
          error={!isNewEditionDescriptionValid}
          className={classes.textField}
          margin="normal"
          rows="5"
          value={newEditionDescription}
          onChange={event => this.handleChange(event, 'newEditionDescription', 'isNewEditionDescriptionValid')}
        />
        <TextField
          id="standard-number"
          label="Max participants"
          disabled={isClosed}
          error={!isNewEditionMaxParticipantsValid}
          value={newEditionMaxParticipants}
          onChange={event => this.handleChange(event, 'newEditionMaxParticipants', 'isNewEditionMaxParticipantsValid')}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
        <TextField
          defaultValue={newEditionEndDate}
          id="datetime-local"
          disabled={isClosed}
          label="End date"
          error={!isNewEditionEndDateValid}
          type="datetime-local"
          className={classes.textField}
          onChange={event => this.handleChange(event, 'newEditionEndDate', 'isNewEditionEndDateValid')}
          InputLabelProps={{
            shrink: true,
          }}
        />
        {chosenEditionId && edition && edition.status === 'OPENED' ? <>
          <Typography className={classes.closeText} component="h1" variant="body2">
            If you close edition you will be able to re-open it in the future
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            disabled={isClosed}
            className={classes.closeButton}
            onClick={this.handleEditionClose}
          >
            Close
          </Button>
        </> : null}
      </CustomDialog>
    );
  }
}

CreateEditionDialog.propTypes = {
  creationMode: PropTypes.bool.isRequired,
  chosenEditionId: PropTypes.number,
  onAgree: PropTypes.func.isRequired,
  onDisagree: PropTypes.func.isRequired,
};

CreateEditionDialog.defaultProps = {
  chosenEditionId: null,
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.chosenEditionId;
  const edition = id ? state.editions.items.filter(e => e.id === id)[0] : null;

  return ({
    edition,
  });
};


const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
  createEdition: (name, description, endDate, maxParticipants) => (
    actions.editions.createEdition(name, description, endDate, maxParticipants)
  ),
  editEdition: (name, description, endDate, maxParticipants) => (
    actions.editions.editEdition(
      ownProps.chosenEditionId, name, description, endDate, maxParticipants,
    )
  ),
  closeEdition: () => (
    actions.editions.closeEdition(ownProps.chosenEditionId)
  ),
}, dispatch);

export default withAlert(
  withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CreateEditionDialog)),
);
