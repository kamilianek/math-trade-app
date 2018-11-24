import React from 'react';
import { Redirect } from 'react-router-dom';
import { withAlert } from 'react-alert';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import MainContainer from '../../components/MainContainer';
import EditionsTable from '../../components/EditionsTable';

import RequestExpansionPanel from '../../components/RequestExpansionPanel';
import CreateEditionDialog from '../../components/CreateEditionDialog';

import actions from '../../actions';

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
});


class MainPanelView extends React.Component {
  constructor() {
    super();

    this.state = {
      open: false,
      chosenEditionId: null,
      editionCreationMode: false,
      chosenToEditEditionId: null,
    };

    this.setEditionToRedirect = this.setEditionToRedirect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.editionCreationDialogDisagree = this.editionCreationDialogDisagree.bind(this);
    this.editionCreationDialogAgree = this.editionCreationDialogAgree.bind(this);
    this.onEditionEdit = this.onEditionEdit.bind(this);
  }

  componentDidMount() {
    const { fetchPermissionRequestStatusIfNeeded } = this.props;

    fetchPermissionRequestStatusIfNeeded()
      .catch(() => {});
  }

  handleChange = (event, name) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  setEditionToRedirect(id, status) {
    const { alert } = this.props;
    if (status === 'CLOSED') {
      alert.show('Cannot open closed edition. Please wait for results.', { type: 'inform' });
      return;
    }

    this.setState({ chosenEditionId: id });
  }

  editionCreationDialogDisagree() {
    this.setState({
      editionCreationMode: false,
      chosenToEditEditionId: null,
    });
  }

  editionCreationDialogAgree() {
    this.setState({
      editionCreationMode: false,
      chosenToEditEditionId: null,
    });
  }

  onEditionEdit(id) {
    this.setState({
      chosenToEditEditionId: id,
    });
  }

  render() {
    const {
      classes,
      isModerator,
    } = this.props;
    const {
      chosenEditionId,
      editionCreationMode,
      chosenToEditEditionId,
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
          <EditionsTable
            onEditionClicked={this.setEditionToRedirect}
            onEdit={this.onEditionEdit}
          />
          {isModerator ? <div className={classes.addEditionButtonContainer}>
            <Button
              variant="contained"
              color="primary"
              className={classes.addEditionButton}
              onClick={() => this.setState({ editionCreationMode: true })}
            >
              Add Edition
              <Icon className={classes.rightButtonIcon}>add</Icon>
            </Button>
          </div> : null}
          {!isModerator ? <RequestExpansionPanel /> : null}
        </div>
        <CreateEditionDialog
          creationMode={editionCreationMode}
          chosenEditionId={chosenToEditEditionId}
          onAgree={this.editionCreationDialogAgree}
          onDisagree={this.editionCreationDialogDisagree}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  isModerator: state.auth.roles.includes('ROLE_MODERATOR') || state.auth.roles.includes('ROLE_ADMIN'),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchPermissionRequestStatusIfNeeded:
    actions.permissionRequest.fetchPermissionRequestStatusIfNeeded,
}, dispatch);


export default withStyles(styles)(
  withAlert(connect(mapStateToProps, mapDispatchToProps)(MainPanelView)),
);
