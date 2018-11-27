import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withAlert } from 'react-alert';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import actions from '../../actions';

import EditionPanelContainer from '../../components/EditionPanelContainer';
import RatingPanel from '../../components/RatingPanel';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    flexBasis: '95%',
    flexShrink: 0,
  },
  sectionHeader: {
    marginTop: 24,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  toSendHeader: {
    marginTop: theme.spacing.unit * 7,
    marginBottom: theme.spacing.unit * 3,
  },
  sent: {
    backgroundColor: '#bedd9a',
  },
  notSent: {
    backgroundColor: '#ffdd72',
  },
  divider: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
});


class UserResultsView extends React.Component {
  state = {
    expanded: null,
  };

  componentDidMount() {
    const {
      alert,
      fetchUserResultsIfNeeded,
    } = this.props;

    fetchUserResultsIfNeeded()
      .catch(error => alert.show(error.message, { type: 'error' }));
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  onRateSubmit(resultId, rate, rateText) {
    const { rateResult, alert } = this.props;

    rateResult(resultId, rate, rateText)
      .then(() => alert.show('Successfully rated user', { type: 'success' }))
      .catch(error => alert.show(error.message, { type: 'error' }));
  }

  renderDetails(id, result, isSender) {
    const { expanded } = this.state;
    const {
      classes,
      receivers,
      senders,
    } = this.props;

    let data = null;
    if (isSender) {
      const filtered = receivers.filter(rec => rec.id === result.receiverId);
      data = filtered.length > 0 ? filtered[0] : {};
    } else {
      const filtered = senders.filter(send => send.id, result.senderId);
      data = filtered.length > 0 ? filtered[0] : {};
    }


    return (
      <ExpansionPanel expanded={expanded === id} onChange={this.handleChange(id)}>
        <ExpansionPanelSummary
          className={result.rate && result.rate.rate ? classes.sent : classes.notSent}
          expandIcon={<Icon>keyboard_arrow_down</Icon>}
        >
          <div className={classes.heading}>
            <Typography variant="h6">{`${result.item.name}`}</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container spacing={16}>
            <Grid item xs={12} sm={4}>
              <Typography className={classes.sectionHeader} variant="h5">Item</Typography>
              <Divider className={classes.divider} />
              <Typography variant="h6">{`${result.item.name}`}</Typography>
              <Typography>{`${result.item.description}`}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography className={classes.sectionHeader} variant="h5">{isSender ? 'Delivery address' : 'Sender'}</Typography>
              <Divider className={classes.divider} />
              {data.name && data.surname
                ? <Typography variant="h6">{`${data.name} ${data.surname}`}</Typography> : null}
              {data.email ? <Typography>{data.email}</Typography> : null}
              {data.address ? <Typography>{`${data.address}`}</Typography> : null}
              {data.postalCode && data.city
                ? <Typography>{`${data.postalCode} ${data.city}`}</Typography> : null}
              {data.country ? <Typography>{data.country}</Typography> : null}
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography className={classes.sectionHeader} variant="h5">{isSender ? 'Your rate' : 'Rate user'}</Typography>
              <Divider className={classes.divider} />
              {isSender && !result.rate ? <Typography>
                You have not been rated yet.
              </Typography> : <RatingPanel
                allowRating={!isSender}
                rate={result.rate && result.rate.rate}
                rateText={result.rate && result.rate.comment}
                onRateSubmit={(rate, rateText) => {
                  this.onRateSubmit(result.id, rate, rateText);
                }}
              />}
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }

  render() {
    const {
      classes,
      edition,
      resultsToSend,
      resultsToReceive,
    } = this.props;
    console.log('resultsToSend: ', resultsToSend);
    return (
      <EditionPanelContainer edition={edition} navigationValue="products">
        <div className={classes.root}>
          <Typography className={classes.toSendHeader} variant="h4">
            Items to send
          </Typography>
          {resultsToSend.map((result, index) => this.renderDetails(`toSend${index}`, result, true))}
          <Typography className={classes.toSendHeader} variant="h4">
            Items to receive
          </Typography>
          {resultsToReceive.map((result, index) => this.renderDetails(`toReceive${index}`, result, false))}
        </div>
      </EditionPanelContainer>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.editionId;
  const edition = id ? state.editions.items.filter(e => `${e.id}` === id)[0] : null;
  const results = state.results.resultsByEdition
    && state.results.resultsByEdition[id]
    && state.results.resultsByEdition[id].result;
  return ({
    edition,
    resultsToSend: (results && results.resultsToSend) || [],
    resultsToReceive: (results && results.resultsToReceive) || [],
    receivers: (results && results.receivers) || [],
    senders: (results && results.senders) || [],
  });
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const id = ownProps.match.params.editionId;

  return bindActionCreators({
    fetchUserResultsIfNeeded: () => (
      actions.results.fetchUserResultsIfNeeded(id)
    ),
    rateResult: (resultId, rate, comment) => (
      actions.results.rateResult(id, resultId, rate, comment)
    ),
  }, dispatch);
};

export default withStyles(styles)(
  withAlert(connect(mapStateToProps, mapDispatchToProps)(UserResultsView)),
);
