import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { withAlert } from 'react-alert';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import { bindActionCreators } from 'redux';

import actions from '../../actions';


const styles = theme => ({
  expansionPanel: {
    width: '100%',
    marginBottom: theme.spacing.unit * 15,
    marginTop: theme.spacing.unit * 15,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  rightColumn: {
    flexBasis: '33.33%',
  },
  leftColumn: {
    flexBasis: '66.66%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '90%',
  },
  rejection: {
    color: 'red',
    marginTop: theme.spacing.unit * 2,
  },
});

const headerText = {
  PENDING: 'Waiting for verification',
  REJECTED: 'Request rejected',
};

class RequestExpansionPanel extends Component {
  constructor() {
    super();

    this.state = {
      isExpanded: false,
      requestMessage: '',
      isRequestMessageValid: true,
    };

    this.toggleExpansionPanel = this.toggleExpansionPanel.bind(this);
    this.onSubmitRequest = this.onSubmitRequest.bind(this);
  }

  toggleExpansionPanel() {
    this.setState(state => ({ isExpanded: !state.isExpanded }));
  }

  onSubmitRequest() {
    const { requestMessage } = this.state;
    const { alert, sendPermissionRequest } = this.props;

    if (requestMessage.length < 1) {
      this.setState({
        isRequestMessageValid: false,
      });
      return;
    }

    sendPermissionRequest(requestMessage)
      .then(() => alert.show('Successfully sent permission request', { type: 'success' }))
      .catch(error => alert.show(error.message, { type: 'error' }));
  }

  render() {
    const {
      classes,
      status,
      reason,
    } = this.props;

    const {
      isExpanded,
      requestMessage,
      isRequestMessageValid,
    } = this.state;

    return (
      <div className={classes.expansionPanel}>
        <ExpansionPanel expanded={isExpanded}>
          <ExpansionPanelSummary
            onClick={this.toggleExpansionPanel}
            expandIcon={<Icon>keyboard_arrow_down</Icon>}
          >
            <div className={classes.leftColumn}>
              <Typography className={classes.heading}>
                Request moderator permissions to create editions
              </Typography>
            </div>
            <div className={classes.rightColumn}>
              <Typography className={classes.secondaryHeading}>
                { status ? headerText[status] : 'Answer simple question'}
              </Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <div className={classes.leftColumn}>
              <TextField
                id="requestPermissionMessage"
                label="Your answer"
                multiline
                rows="8"
                error={!isRequestMessageValid}
                className={classes.textField}
                margin="normal"
                variant="filled"
                disabled={status === 'PENDING'}
                onChange={event => this.setState({
                  requestMessage: event.target.value,
                  isRequestMessageValid: true,
                })}
                value={status === 'PENDING' ? reason : requestMessage}
              />
            </div>
            <div className={classNames(classes.rightColumn, classes.helper)}>
              <Typography variant="caption">
                Please, shortly describe why do you want to become moderator.
                We'll verify your request and you will be able to create your own editions.
              </Typography>
            </div>
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelActions>
            <Button
              size="small"
              onClick={this.toggleExpansionPanel}
            >
              Cancel
            </Button>
            {status !== 'PENDING' ? <Button
              size="small"
              color="primary"
              onClick={this.onSubmitRequest}
            >
              Submit message
            </Button> : null}
          </ExpansionPanelActions>
        </ExpansionPanel>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  roles: state.auth.roles,
  status: state.auth.permissionRequest.request.moderatorRequestStatus,
  reason: (state.auth.permissionRequest.request
    && state.auth.permissionRequest.request.reason) || '',
});

const mapDispatchToProps = dispatch => bindActionCreators({
  sendPermissionRequest: reason => (
    actions.permissionRequest.sendPermissionRequest(reason)
  ),
}, dispatch);


export default withStyles(styles)(
  withAlert(
    connect(mapStateToProps, mapDispatchToProps)(RequestExpansionPanel),
  ),
);
