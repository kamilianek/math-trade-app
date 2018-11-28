import React from 'react';
import { connect } from 'react-redux';
import { withAlert } from 'react-alert';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import actions from '../../actions';

import EditionPanelContainer from '../../components/EditionPanelContainer';
import ResultsTable from '../../components/ResultsTable';
import ProductPreview from '../../components/ProductPreview';
import UserPreview from '../../components/UserPreview';


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


class ModeratorResultsView extends React.Component {
  constructor() {
    super();

    this.state = {
      rowToPreview: null,
    };

    this.handlePreview = this.handlePreview.bind(this);
  }

  componentDidMount() {
    const { fetchModeratorResultsIfNeeded, alert } = this.props;

    fetchModeratorResultsIfNeeded()
      .catch(error => alert.show(error.message, { type: 'error' }));
  }

  handlePreview(row) {
    this.setState({
      openPreview: true,
      rowToPreview: row,
    });
  }

  render() {
    const {
      classes,
      edition,
      results,
    } = this.props;

    const {
      rowToPreview,
    } = this.state;

    return (
      <EditionPanelContainer edition={edition} >
        <div className={classes.mainContainer}>
          <Typography component="h1" variant="h4">
            Editions list
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

  return ({
    edition,
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
  const id = ownProps.match.params.editionId;

  return bindActionCreators({
    fetchModeratorResultsIfNeeded: () => (
      actions.moderatorResults.fetchModeratorResultsIfNeeded(id)
    ),
  }, dispatch);
};


export default withStyles(styles)(
  withAlert(connect(mapStateToProps, mapDispatchToProps)(ModeratorResultsView)),
);
