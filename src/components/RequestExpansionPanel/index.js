import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
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

import actions from '../../actions';
import {bindActionCreators} from "redux";

const styles = theme => ({
  expansionPanel: {
    width: '100%',
    marginBottom: theme.spacing.unit * 15,
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
});

class RequestExpansionPanel extends Component {
  constructor() {
    super();

    this.state = {
      isExpanded: false,
      requestMessage: '',
    };

    this.toggleExpansionPanel = this.toggleExpansionPanel.bind(this);
  }

  toggleExpansionPanel() {
    this.setState(state => ({ isExpanded: !state.isExpanded }));
  }

  render() {
    const { classes } = this.props;
    const { isExpanded, requestMessage } = this.state;

    return (
      <div className={classes.expansionPanel}>
        <ExpansionPanel expanded={isExpanded}>
          <ExpansionPanelSummary
            onClick={this.toggleExpansionPanel}
            expandIcon={<Icon>keyboard_arrow_down</Icon>}
          >
            <div className={classes.rightColumn}>
              <Typography className={classes.heading}>Request permissions</Typography>
            </div>
            <div className={classes.leftColumn}>
              <Typography className={classes.secondaryHeading}>
                 Answer simple question
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
                className={classes.textField}
                margin="normal"
                variant="filled"
                onChange={event => this.setState({ requestMessage: event.target.value })}
                value={requestMessage}
              />
            </div>
            <div className={classNames(classes.rightColumn, classes.helper)}>
              <Typography variant="caption">
                Please, shortly describe why do you want to become moderator.
                We'll verify your message and you will receive feedback here.
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
            <Button
              size="small"
              color="primary"
              onClick={() => console.log('Request permissions with message: ', requestMessage)}
            >
              Submit message
            </Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  roles: state.auth.roles,
  log: console.log(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  loginWithPassword: actions.auth.loginWithPassword,
}, dispatch);


export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(RequestExpansionPanel)
);
