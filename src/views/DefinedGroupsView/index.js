import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { withAlert } from 'react-alert';
import { bindActionCreators } from 'redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import EditionPanelContainer from '../../components/EditionPanelContainer';
import CheckboxList from '../../components/CheckboxList';
import SearchBar from '../../components/SerachBar';
import MultiheaderCheckboxList from '../../components/MultiheaderCheckboxList';
import CustomDialog from '../../components/CustomDialog';
import ProductPreview from '../../components/ProductPreview';

import actions from '../../actions';

const dialogContent = {
  cancelPreferenceEdition: {
    title: 'Cancel defined group edition',
    bodyText: 'Are you sure you want to cancel defined group edition? If you click YES you will loose all unsaved changes.',
  },
  createDefinedGroup: {
    title: 'Defined group',
    bodyText: 'Create defined group to add other products',
  },
  editDefinedGroup: {
    title: 'Edit',
    bodyText: 'Change defined group name',
  },
};

const styles = theme => ({
  sectionSubtitle: {
    margin: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 5,
    height: 30,
  },
  paperContainer: {
    minHeight: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
  },
  paging: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    float: 'right',
  },
  assignedText: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 3,
  },
  productListContainer: {
    maxHeight: 600,
    width: '100%',
    overflow: 'auto',
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
  },
  backButton: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '90%',
  },
});

const ITEMS_ON_PAGE = 50;

class DefinedGroupsView extends Component {
  constructor(props) {
    super(props);
    const { myDefinedGroups, otherAssignedItems } = this.props;
    this.state = {
      myDefinedGroups,
      otherAssignedItems,
      otherProductsSearchMode: false,
      selectedMyGroup: (myDefinedGroups && myDefinedGroups[0]) || null,
      selectedItemIds: (myDefinedGroups && myDefinedGroups[0]
        && myDefinedGroups[0].itemsIds) || [],
      selectedGroupIds: (myDefinedGroups && myDefinedGroups[0]
        && myDefinedGroups[0].groupIds) || [],
      groupToPreview: null,
      newDefinedGroupName: '',
      isNewDefinedGroupNameValid: true,
      editMode: false,
      editGroupNameMode: false,
      creationMode: false,
      openDialog: false,

      currentPage: 1,
      currentPageOnSearch: 1,
      pageCounts: 1 + Math.floor((otherAssignedItems.length - 1) / ITEMS_ON_PAGE),
      pageCountsOnSearch: 1,
    };

    this.handleItemClick = this.handleItemClick.bind(this);
    this.cancelDialogAgree = this.cancelDialogAgree.bind(this);
    this.cancelDialogDisagree = this.cancelDialogDisagree.bind(this);
    this.creationDialogAgree = this.creationDialogAgree.bind(this);
    this.creationDialogDisagree = this.creationDialogDisagree.bind(this);
    this.submitSaveDefinedGroup = this.submitSaveDefinedGroup.bind(this);
  }

  componentDidMount() {
    const {
      fetchDefinedGroupsIfNeeded,
      alert,
      isParticipant,
    } = this.props;

    if (isParticipant) {
      fetchDefinedGroupsIfNeeded()
        .catch(() => alert.show('Cannot load your defined groups', { type: 'error' }));
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.myDefinedGroups !== state.myDefinedGroups) {
      const id = state.selectedMyGroup && state.selectedMyGroup.id;
      const selectedDefinedGroup = props.myDefinedGroups.filter(group => group.id === id);

      return {
        myDefinedGroups: props.myDefinedGroups,
        selectedItemIds: (selectedDefinedGroup[0] && selectedDefinedGroup[0].itemsIds) || [],
        selectedGroupIds: (selectedDefinedGroup[0] && selectedDefinedGroup[0].groupIds) || [],
      };
    }
    return null;
  }

  handleSearchBarChange = (event, section1, section2) => {
    const phrase = event.target.value.toUpperCase();
    const updatedList1 = this.props[section1]
      .filter(item => item.name.toUpperCase().includes(phrase));
    const updatedList2 = this.props[section2]
      .filter(item => item.name.toUpperCase().includes(phrase));

    const pageCountsOnSearch = 1 + Math.floor(
      (updatedList1.length + updatedList2.length - 1) / ITEMS_ON_PAGE,
    );

    this.setState({
      [section1]: updatedList1,
      [section2]: updatedList2,
      otherProductsSearchMode: phrase.length !== 0,
      currentPageOnSearch: 1,
      pageCountsOnSearch,
    });
  };

  cancelDialogAgree() {
    const { selectedMyGroup } = this.state;

    this.setState({
      openDialog: false,
      selectedItemIds: selectedMyGroup.itemsIds,
      selectedGroupIds: selectedMyGroup.groupIds,
      editMode: false,
    });
  }

  cancelDialogDisagree() {
    this.setState({
      openDialog: false,
    });
  }

  creationDialogAgree() {
    const {
      createDefinedGroup,
      editDefinedGroup,
      alert,
    } = this.props;
    const {
      newDefinedGroupName,
      editGroupNameMode,
      selectedMyGroup,
    } = this.state;

    if (newDefinedGroupName.length < 3) {
      this.setState({ isNewDefinedGroupNameValid: false });
      alert.show('Defined group name should have at least 3 characters', { type: 'info' });
      return;
    }

    if (editGroupNameMode) {
      editDefinedGroup(selectedMyGroup.id, newDefinedGroupName)
        .then(() => {
          alert.show('Successfully edited defined group', { type: 'success' });
        });
      this.setState({
        editGroupNameMode: false,
        newDefinedGroupName: '',
      });

      return;
    }

    createDefinedGroup(newDefinedGroupName)
      .then(() => {
        alert.show('Successfully created defined group', { type: 'success' });
        this.setState({
          creationMode: false,
          newDefinedGroupName: '',
        });
      })
      .catch(err => alert.show(`Cannot create defined group: ${err.message}`, { type: 'error' }));
  }

  creationDialogDisagree() {
    this.setState({
      creationMode: false,
    });
  }

  submitSaveDefinedGroup() {
    const {
      alert,
      updateDefinedGroupContent,
    } = this.props;

    const {
      selectedMyGroup,
      selectedItemIds,
      selectedGroupIds,
    } = this.state;

    if (selectedGroupIds.includes(selectedMyGroup && selectedMyGroup.id)) {
      alert.show('Defined group cannot be an element of itself', { type: 'error' });
      return;
    }

    updateDefinedGroupContent(selectedMyGroup.id, selectedItemIds, selectedGroupIds)
      .then(() => alert.show('Successfully updated defined group', { type: 'success' }))
      .catch(err => alert.show(`Cannot update defined group: ${err.message}`, { type: 'error' }));

    this.setState({
      editMode: false,
    });
  }

  handleItemClick(item, name) {
    const currentIndex = this.state[name].indexOf(item.id);
    const newChecked = [...this.state[name]];

    if (currentIndex === -1) {
      newChecked.push(item.id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({ [name]: newChecked });
  }


  render() {
    const {
      edition,
      classes,
      isParticipant,
    } = this.props;

    const {
      myDefinedGroups,
      otherAssignedItems,
      editMode,
      selectedMyGroup,
      groupToPreview,
      selectedItemIds,
      selectedGroupIds,
      openDialog,
      newDefinedGroupName,
      isNewDefinedGroupNameValid,
      creationMode,
      editGroupNameMode,
      currentPage,
      currentPageOnSearch,
      pageCounts,
      pageCountsOnSearch,
      otherProductsSearchMode,
    } = this.state;

    if (!isParticipant) {
      return (<Redirect to={`/editions/${edition.id}/preferences`} />);
    }

    return (
      <EditionPanelContainer edition={edition} navigationValue={'definedGroups'}>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <Typography className={classes.sectionSubtitle} component="h1" variant="h5">
              My defined groups
            </Typography>
            <Paper className={classes.paperContainer}>
              <CheckboxList
                data={this.props.myDefinedGroups}
                primaryAction={item => this.setState({
                  selectedMyGroup: item,
                  selectedItemIds: item.itemsIds,
                  selectedGroupIds: item.groupIds,
                })}
                editMode={editMode}
                selectedWithPrimaryId={selectedMyGroup ? [selectedMyGroup.id] : []}
                secondaryAction={item => this.setState({ groupToPreview: item })}
                selectedWithSecondaryId={groupToPreview && groupToPreview.id}
              />
              <Button
                variant="contained"
                color="primary"
                className={classes.backButton}
                onClick={() => this.setState({ creationMode: true })}
              >
                Create
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.backButton}
                onClick={() => this.setState({
                  editGroupNameMode: true,
                  newDefinedGroupName: selectedMyGroup ? selectedMyGroup.name : '',
                })}
              >
                Rename
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography className={classes.sectionSubtitle} component="h1" variant="h5">
              Products and defined groups
              <IconButton
                onClick={() => this.setState({ editMode: true })}
                color="inherit"
              >
                <Icon>edit</Icon>
              </IconButton>
            </Typography>
            <Paper className={classes.paperContainer}>
              <SearchBar onChange={event => this.handleSearchBarChange(event, 'otherAssignedItems', 'myDefinedGroups')} />
              <MultiheaderCheckboxList
                data={otherProductsSearchMode
                  ? [
                    myDefinedGroups,
                    otherAssignedItems.slice(
                      (currentPageOnSearch - 1) * ITEMS_ON_PAGE,
                      currentPageOnSearch * ITEMS_ON_PAGE,
                    ),
                  ]
                  : [
                    this.props.myDefinedGroups,
                    this.props.otherAssignedItems.slice(
                      (currentPage - 1) * ITEMS_ON_PAGE, currentPage * ITEMS_ON_PAGE,
                    ),
                  ]}
                disabled={!editMode}
                titles={['Other items: ', 'My defined groups: ']}
                currentSelected={[selectedItemIds, selectedGroupIds]}
                onItemClick={[
                  item => this.handleItemClick(item, 'selectedItemIds'),
                  item => this.handleItemClick(item, 'selectedGroupIds'),
                ]}
                itemCounts={otherProductsSearchMode ? [
                  myDefinedGroups.length,
                  otherAssignedItems.length,
                ] : [
                  this.props.myDefinedGroups.length,
                  this.props.otherAssignedItems.length,
                ]}
                secondaryAction={item => this.setState({ groupToPreview: item })}
                selectedWithSecondaryId={groupToPreview && groupToPreview.id}
              />
              <Grid container spacing={24}>
                <Grid item xs={12} sm={8}>
                  <Typography className={classes.assignedText} component="h1" variant="body1">
                    {`Items assigned: ${
                      (selectedItemIds || []).length + (selectedGroupIds || []).length
                    }`}
                  </Typography>
                </Grid>
                <Grid style={{ display: 'inline-flex' }} item xs={12} sm={4}>
                  <Button
                    color="primary"
                    size="small"
                    disabled={otherProductsSearchMode
                      ? currentPageOnSearch === 1 : currentPage === 1}
                    onClick={() => this.setState((state) => {
                      if (otherProductsSearchMode) {
                        return { currentPageOnSearch: state.currentPageOnSearch - 1 };
                      }
                      return { currentPage: state.currentPage - 1 };
                    })}
                  >
                    <Icon>keyboard_arrow_left</Icon>
                  </Button>
                  <Typography className={classes.paging} component="h1" variant="body1">
                    {otherProductsSearchMode
                      ? `${currentPageOnSearch}/${pageCountsOnSearch}` : `${currentPage}/${pageCounts}`}
                  </Typography>
                  <Button
                    color="primary"
                    size="small"
                    disabled={otherProductsSearchMode
                      ? currentPageOnSearch === pageCountsOnSearch : currentPage === pageCounts}
                    onClick={() => this.setState((state) => {
                      if (otherProductsSearchMode) {
                        return { currentPageOnSearch: state.currentPageOnSearch + 1 };
                      }
                      return { currentPage: state.currentPage + 1 };
                    })}
                  >
                    <Icon>keyboard_arrow_right</Icon>
                  </Button>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                {editMode ? <Button
                  variant="contained"
                  color="primary"
                  className={classes.backButton}
                  onClick={() => this.setState({ openDialog: true })}
                >
                  Cancel
                </Button> : null}
                {editMode ? <Button
                  variant="contained"
                  color="primary"
                  className={classes.backButton}
                  onClick={this.submitSaveDefinedGroup}
                >
                  Save
                </Button> : null}
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12}>
            <ProductPreview
              item={groupToPreview}
              editionId={edition.id}
              wantedProductsNames={groupToPreview && groupToPreview.itemsIds
                ? otherAssignedItems.filter(i => groupToPreview.itemsIds.includes(i.id)) : null}
              wantedGroupsNames={groupToPreview && groupToPreview.groupIds
                ? myDefinedGroups.filter(i => groupToPreview.groupIds.includes(i.id)) : null}
            />
          </Grid>
        </Grid>
        <CustomDialog
          handleDisagree={this.cancelDialogDisagree}
          handleAgree={this.cancelDialogAgree}
          title={dialogContent.cancelPreferenceEdition.title}
          textBody={dialogContent.cancelPreferenceEdition.bodyText}
          openDialog={openDialog}
        />
        <CustomDialog
          handleDisagree={this.creationDialogDisagree}
          handleAgree={this.creationDialogAgree}
          title={dialogContent[editGroupNameMode ? 'editDefinedGroup' : 'createDefinedGroup'].title}
          textBody={dialogContent[editGroupNameMode ? 'editDefinedGroup' : 'createDefinedGroup'].bodyText}
          openDialog={creationMode || editGroupNameMode}
          agreeText={editGroupNameMode ? 'Save' : 'Create'}
          disagreeText="Cancel"
        >
          <TextField
            error={!isNewDefinedGroupNameValid}
            value={newDefinedGroupName}
            id="standard-error"
            label="Name"
            className={classes.textField}
            margin="normal"
            onChange={event => this.setState({
              newDefinedGroupName: event.target.value,
              isNewDefinedGroupNameValid: true,
            })}
          />
        </CustomDialog>
      </EditionPanelContainer>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.editionId;
  const edition = id ? state.editions.items.filter(e => `${e.id}` === id)[0] : null;
  const otherProducts = state.otherAssignedProducts.productsByEdition[id];
  const definedGroups = state.definedGroups.definedGroupsByEdition[id];

  return ({
    edition,
    otherAssignedItems: (otherProducts && otherProducts.items) || [],
    myDefinedGroups: (definedGroups && definedGroups.groups) || [],
    isParticipant: !!(edition && edition.participant),
  });
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const id = parseInt(ownProps.match.params.editionId, 10);
  return bindActionCreators({
    fetchDefinedGroupsIfNeeded: () => (
      actions.definedGroups.fetchDefinedGroupsIfNeeded(id)
    ),
    createDefinedGroup: name => (
      actions.definedGroups.createDefinedGroup(id, name)
    ),
    editDefinedGroup: (definedGroupId, name) => (
      actions.definedGroups.editDefinedGroup(id, definedGroupId, name)
    ),
    updateDefinedGroupContent: (definedGroupId, itemsIds, groupIds) => (
      actions.definedGroups.updateDefinedGroupContent(id, definedGroupId, itemsIds, groupIds)
    ),
  }, dispatch);
};

export default withStyles(styles)(
  withAlert(connect(mapStateToProps, mapDispatchToProps)(DefinedGroupsView)),
);
