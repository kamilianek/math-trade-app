import React from 'react';
import { connect } from 'react-redux';
import { withAlert } from 'react-alert';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';

import EditionPanelContainer from '../../components/EditionPanelContainer';
import ResultsTable from '../../components/ResultsTable';
import ProductPreview from '../../components/ProductPreview';
import UserPreview from '../../components/UserPreview';
import CustomDialog from '../../components/CustomDialog';

import actions from '../../actions';

const statusColors = {
  OPENED: '#bedd9a',
  PUBLISHED: 'grey',
  CLOSED: '#83c3f7',
  PENDING: '#ffdd72',
  FAILED: '#ff4569',
};

const styles = theme => ({
  mainContainer: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 5,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    marginBottom: theme.spacing.unit * 5,
  },
  heading: {
    flexBasis: '95%',
    flexShrink: 0,
  },
  sectionHeader: {
    marginTop: 24,
  },
  sectionSubtitle: {
    margin: theme.spacing.unit * 3,
    height: 30,
    marginRight: theme.spacing.unit * 5,
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
  rate: {
    width: '100%',
  },
  actionButtonsPanel: {
    marginTop: theme.spacing.unit * 2,
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  chip: {
    margin: theme.spacing.unit,
  },
});

const mockUser1 = {
  username: 'kowalsky',
  email: 'kowal123@user1.com',
  name: 'Jan',
  surname: 'Kowalski',
  rates: [
    {
      resultId: 1,
      rate: 3,
      comment: 'Produkt niestety niezgodny z opisem',
    },
  ],

};

const mockUser2 = {
  username: 'przemo',
  email: 'nowak123prze@user1.com',
  name: 'Przemsyław',
  surname: 'Nowak',
  rates: [
    {
      resultId: 5,
      rate: 5,
      comment: 'Very nice',
    },
    {
      resultId: 4,
      rate: 4,
      comment: 'Polecam tego użytkownika. Wszystko przebigło bardzo sprawnie! '
      + 'Polecam tego użytkownika. Wszystko przebigło bardzo sprawnie! Polecam tego użytkownika.'
      + 'Wszystko przebigło bardzo sprawnie!',
    },
    {
      resultId: 5,
      rate: 5,
      comment: 'Very nice',
    },
  ],
};

const texts = {
  reopen: {
    title: 'Reopen',
    body: 'If you reopen edition users will be able to make preferences again.'
    + 'The results will be re-calculated when you close edition.',
    action: 'handleReopening',
    agree: 'Reopen',
  },
  publish: {
    title: 'Publish',
    body: 'Publish edition to make results visible for users. Be sure because you cannot close edition again',
    action: 'handlePublishing',
    agree: 'Publish',
  },
  cancel: {
    title: 'Cancel!',
    body: 'Attention! Are you sure you want to cancel this edition. You won\'t be able to go back. '
    + 'You will loose all results and preferences. It makes items assigned to edition unassigned',
    action: 'handleCancelling',
    agree: 'Remove',
  },
};

const toolTipTexts = {
  PENDING: 'Results are not ready. Please wait and click refresh occasionally',
  FAILED: 'Closing edition failed. Please reopen it and close again',
  PUBLISHED: 'Your edition is ended but you can see all results',
};


class ModeratorResultsView extends React.Component {
  constructor() {
    super();

    this.state = {
      rowToPreview: null,
      openDialog: null,
      openPersonalResults: false,
    };

    this.handlePreview = this.handlePreview.bind(this);
    this.handleCancelling = this.handleCancelling.bind(this);
    this.handlePublishing = this.handlePublishing.bind(this);
    this.handleReopening = this.handleReopening.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    const { fetchModeratorResultsIfNeeded, alert } = this.props;

    fetchModeratorResultsIfNeeded(false)
      .catch(error => alert.show(error.message, { type: 'error' }));
  }

  handlePreview(row) {
    this.setState({
      openPreview: true,
      rowToPreview: row,
    });
  }

  handleReopening() {
    const {
      alert,
      reopenEdition,
    } = this.props;

    reopenEdition()
      .then(() => alert.show('Successfully reopened edition', { type: 'success' }))
      .catch(error => alert.show(error.message, { type: 'error' }));

    this.handleCancel();
  }

  handlePublishing() {
    const {
      alert,
      publishEdition,
    } = this.props;

    publishEdition()
      .then(() => alert.show('Successfully published edition', { type: 'success' }))
      .catch(error => alert.show(error.message, { type: 'error' }));

    this.handleCancel();
  }

  handleCancelling() {
    const {
      alert,
      cancelEdition,
    } = this.props;

    cancelEdition()
      .then(() => alert.show('Successfully cancelled edition', { type: 'success' }))
      .catch(error => alert.show(error.message, { type: 'error' }));

    this.handleCancel();
  }

  handleCancel() {
    this.setState({
      openDialog: null,
    });
  }

  renderActionButtonPanel() {
    const {
      classes,
      status,
      fetchModeratorResultsIfNeeded,
      alert,
    } = this.props;

    if (status === 'PENDING') {
      return (
        <div className={classes.actionButtonsPanel}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => {
              fetchModeratorResultsIfNeeded(true)
                .catch(error => alert.show(error.message, { type: 'error' }));
            }}
          >
            Refresh
            <Icon>refresh</Icon>
          </Button>
        </div>
      );
    }

    if (status === 'FAILED') {
      return (
        <div className={classes.actionButtonsPanel}>
          <Tooltip
            title="Reopening edition allows making preferences again"
          >
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => {
                this.setState({ openDialog: 'reopen' });
              }}
            >
              Re-open
              <Icon>lock_open</Icon>
            </Button>
          </Tooltip>
        </div>
      );
    }

    if (status === 'PUBLISHED') {
      return (
        <div className={classes.actionButtonsPanel}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => {
              this.setState({ openPersonalResults: true });
            }}
          >
            Personal results
            <Icon>person_outline</Icon>
          </Button>
        </div>
      );
    }

    if (status !== 'CLOSED') {
      return null;
    }

    return (
      <div className={classes.actionButtonsPanel}>
        <Tooltip
          title="Publish the following results to users"
        >
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => {
              this.setState({ openDialog: 'publish' });
            }}
          >
            Publish
            <Icon>publish</Icon>
          </Button>
        </Tooltip>
        <Tooltip
          title="Reopening edition allows making preferences again"
        >
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => {
              this.setState({ openDialog: 'reopen' });
            }}
          >
            Re-open
            <Icon>lock_open</Icon>
          </Button>
        </Tooltip>
        <Tooltip
          title="Cancelling edition will result in the loss of all data"
        >
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={() => {
              this.setState({ openDialog: 'cancel' });
            }}
          >
            Cancel
            <Icon>delete</Icon>
          </Button>
        </Tooltip>
      </div>
    );
  }

  render() {
    const {
      classes,
      edition,
      results,
      status,
    } = this.props;

    const {
      rowToPreview,
      openDialog,
      openPersonalResults,
    } = this.state;

    if (openPersonalResults) {
      return <Redirect to={`/editions/${edition.id}/results`} />;
    }

    return (
      <EditionPanelContainer edition={edition}>
        {this.renderActionButtonPanel()}
        <div className={classes.mainContainer}>
          <Typography component="h1" variant="h4">
            Results
            <Tooltip title={toolTipTexts[status] || ''}>
              <Chip
                label={status}
                className={classes.chip}
                style={{ backgroundColor: status ? statusColors[status] : null }}
              />
            </Tooltip>
          </Typography>
          <ResultsTable
            results={results}
            onPreview={this.handlePreview}
          />
        </div>
        <Grid container spacing={16}>
          <Grid item xs={12} sm={6}>
            {rowToPreview !== null ? <ProductPreview item={rowToPreview.item}/> : null}
          </Grid>
          <Grid item xs={12} sm={6}>
            {rowToPreview !== null
              ? <>
                  <Typography className={classes.sectionSubtitle} component="h1" variant="h5">
                    Sender
                  </Typography>
                  <Paper className={classes.paper}>
                   <UserPreview userData={mockUser1} />
                  </Paper>
                </>
              : null}
            {rowToPreview !== null
              ? <>
                <Typography className={classes.sectionSubtitle} component="h1" variant="h5">
                  Receiver
                </Typography>
                <UserPreview userData={mockUser2} />
              </>
              : null}
          </Grid>
        </Grid>
        <CustomDialog
          title={openDialog ? texts[openDialog].title : ''}
          textBody={openDialog ? texts[openDialog].body : ''}
          handleAgree={openDialog ? () => this[texts[openDialog].action]() : () => null}
          agreeText={openDialog ? texts[openDialog].agree : ''}
          handleDisagree={this.handleCancel}
          disagreeText="Cancel"
          openDialog={!!openDialog}
          warning
        />
      </EditionPanelContainer>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.editionId;
  const edition = id ? state.editions.items.filter(e => `${e.id}` === id)[0] : null;

  const results = state.moderatorResults.resultsByEdition
    && state.moderatorResults.resultsByEdition[id]
    && state.moderatorResults.resultsByEdition[id].result
    && state.moderatorResults.resultsByEdition[id].result.results;

  const status = state.moderatorResults.resultsByEdition
    && state.moderatorResults.resultsByEdition[id]
    && state.moderatorResults.resultsByEdition[id].result
    && state.moderatorResults.resultsByEdition[id].result.status;

  return ({
    edition,
    status,
    results: (results && results.map(result => ({
      itemName: result.item.name,
      senderId: result.senderId,
      receiverId: result.receiverId,
      item: result.item,
      rate: (result.rate || {}).rate || 0,
      rateObj: result.rate || {
        resultId: result.id,
      },
    }))) || [],
  });
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const id = parseInt(ownProps.match.params.editionId, 10);

  return bindActionCreators({
    fetchModeratorResultsIfNeeded: force => (
      actions.moderatorResults.fetchModeratorResultsIfNeeded(id, force)
    ),
    reopenEdition: () => (
      actions.editions.reopenEdition(id)
    ),
    publishEdition: () => (
      actions.editions.publishEdition(id)
    ),
    cancelEdition: () => (
      actions.editions.cancelEdition(id)
    ),
  }, dispatch);
};


export default withStyles(styles)(
  withAlert(connect(mapStateToProps, mapDispatchToProps)(ModeratorResultsView)),
);
