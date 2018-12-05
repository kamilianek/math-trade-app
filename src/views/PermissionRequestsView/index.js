import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withAlert } from 'react-alert';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import MainContainer from '../../components/MainContainer';

import actions from '../../actions';

const styles = theme => ({
  mainContainer: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 700,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  form: {
    marginTop: theme.spacing.unit * 3,
  },
  row: {
    marginTop: theme.spacing.unit * 2,
  },
  submitButton: {
    marginTop: theme.spacing.unit * 2,
    float: 'right',
  },
});

class PermissionRequestsView extends React.Component {
  constructor() {
    super();

    this.state = {
      requests: [],
      accepted: [],
      rejected: [],
    };

    this.handleAccept = this.handleAccept.bind(this);
    this.handleReject = this.handleReject.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { fetchRequestsToVerify, alert } = this.props;

    fetchRequestsToVerify()
      .then(response => this.setState({ requests: response }))
      .catch(error => alert.show(error.message, { type: 'error' }));
  }

  handleAccept(id) {
    this.setState(state => ({ accepted: [...state.accepted, id] }));
  }

  handleReject(id) {
    this.setState(state => ({ rejected: [...state.rejected, id] }));
  }

  handleSubmit() {
    const { accepted, rejected } = this.state;
    const { fetchRequestsToVerify, resolveModeratorRequests, alert } = this.props;

    if (accepted.length === 0 && rejected.length === 0) {
      alert.show('You didn\'t resolved any permission requests', { type: 'error' });
    }

    resolveModeratorRequests(accepted, rejected)
      .then((response) => {
        alert.show(response.message, { type: 'success' });
        fetchRequestsToVerify()
          .then(fetchResponse => this.setState({ requests: fetchResponse }))
          .catch(error => alert.show(error.message, { type: 'error' }));
      })
      .catch(error => alert.show(error.message, { type: 'error' }));
  }

  render() {
    const { classes } = this.props;
    const { requests, rejected, accepted } = this.state;

    return (
      <>
        <MainContainer />
        <div className={classes.mainContainer}>
          <Paper className={classes.paper}>
            <Typography variant="h4">
              Moderator permission requests
            </Typography>
            <Grid container spacing={40} className={classes.form} >
              {
                requests.map(request => (<>
                  <Grid item xs={12} sm={8} className={classes.row}>
                    {request.reason}
                  </Grid>
                  <Grid item xs={12} sm={2} className={classes.row}>
                    {!rejected.includes(request.id) ? <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={accepted.includes(request.id)}
                      onClick={() => this.handleAccept(request.id)}
                    >
                      Accept
                    </Button> : null}
                  </Grid>
                  <Grid item xs={12} sm={2} className={classes.row}>
                    {!accepted.includes(request.id) ? <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      disabled={rejected.includes(request.id)}
                      onClick={() => this.handleReject(request.id)}
                    >
                      Reject
                    </Button> : null}
                  </Grid>
                </>))
              }
            </Grid>
          </Paper>
          <Button
            className={classes.submitButton}
            type="submit"
            variant="contained"
            color="primary"
            onClick={this.handleSubmit}
          >
            Resolve
          </Button>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchRequestsToVerify: () => (
    actions.permissionRequest.fetchRequestsToVerify()
  ),
  resolveModeratorRequests: (acceptedRequestsIds, rejectedRequestsIds) => (
    actions.permissionRequest.resolveModeratorRequests(
      acceptedRequestsIds, rejectedRequestsIds,
    )
  ),
}, dispatch);


export default withStyles(styles)(
  withAlert(connect(null, mapDispatchToProps)(PermissionRequestsView)),
);
