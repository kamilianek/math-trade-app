import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { withAlert } from 'react-alert';

import EditionPanelContainer from '../../components/EditionPanelContainer';
import ProductPreview from '../../components/ProductPreview';
import CustomDialog from '../../components/CustomDialog';
import CheckboxList from '../../components/CheckboxList';
import SearchBar from '../../components/SerachBar';
import MultiheaderCheckboxList from '../../components/MultiheaderCheckboxList';

import actions from '../../actions';


const ITEMS_ON_PAGE = 50;

const dialogContent = {
  cancelPreferenceEdition: {
    title: 'Cancel preference edition',
    bodyText: 'Are you sure you want to cancel preference edition? If you click YES you will loose all unsaved changes.',
  },
};

const styles = theme => ({
  rightButtonIcon: {
    marginRight: theme.spacing.unit,
  },
  backButton: {
    margin: theme.spacing.unit,
  },
  sectionSubtitle: {
    margin: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 5,
    height: 30,
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
    height: 600,
    overflow: 'auto',
  },
  productList: {
    marginTop: 30,
  },
  paperContainer: {
    minHeight: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
  },
  gridListContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    marginBottom: theme.spacing.unit * 2,
  },
  gridList: {
    height: 400,
  },
  subheader: {
    width: '100%',
  },
  imageTitle: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  textField: {
    width: '100%',
  },
});

class PreferencesView extends React.Component {
  constructor(props) {
    super(props);

    const {
      myAssignedItems,
      otherAssignedItems,
      preferences,
      myDefinedGroups,
    } = this.props;
    let preferenceForItem = null;

    if (myAssignedItems && myAssignedItems[0]) {
      preferenceForItem = preferences.filter(pref => pref.haveItemId === myAssignedItems[0].id);
    }

    this.state = {
      selectedMyProduct: myAssignedItems && myAssignedItems[0],
      myProductsSearchMode: false,
      otherProductsSearchMode: false,
      selectedOtherProductIds: (preferenceForItem && preferenceForItem[0]
        && preferenceForItem[0].wantedItemsIds) || [],
      selectedGroupIds: (preferenceForItem && preferenceForItem[0]
        && preferenceForItem[0].wantedDefinedGroupsIds) || [],
      preferences,
      myAssignedItems,
      otherAssignedItems,
      myDefinedGroups,
      itemToPreview: null,
      editMode: false,
      openDialog: false,

      currentPage: 1,
      currentPageOnSearch: 1,
      pageCounts: 1 + Math.floor((otherAssignedItems.length - 1) / ITEMS_ON_PAGE),
      pageCountsOnSearch: 1,
    };

    this.handleDialogAgree = this.handleDialogAgree.bind(this);
    this.handleDialogDisagree = this.handleDialogDisagree.bind(this);
    this.submitSavePreferences = this.submitSavePreferences.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentDidMount() {
    const {
      fetchPreferences,
      fetchOtherAssignedProducts,
      fetchMyAssignedProducts,
      fetchDefinedGroups,
      alert,
      isParticipant,
    } = this.props;

    fetchOtherAssignedProducts()
      .then(() => this.setState({
        pageCounts: 1 + Math.floor((this.props.otherAssignedItems.length - 1) / ITEMS_ON_PAGE),
      }))
      .catch(error => alert.show(`Cannot load others items: ${error.message}`, { type: 'error' }));

    if (isParticipant) {
      fetchMyAssignedProducts()
        .catch(error => alert.show(`Cannot load your items: ${error.message}`, { type: 'error' }));

      fetchDefinedGroups()
        .catch(error => alert.show(`Cannot load defined groups: ${error.message}`, { type: 'error' }));

      fetchPreferences()
        .catch(error => alert.show(`Cannot load preferences: ${error.message}`, { type: 'error' }));
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.preferences !== state.preferences) {
      let preferenceForItem = null;
      if (state.myAssignedItems && state.selectedMyProduct) {
        preferenceForItem = props.preferences.filter(
          pref => pref.haveItemId === state.selectedMyProduct.id,
        );
      }
      return {
        preferences: props.preferences,
        selectedOtherProductIds: (preferenceForItem && preferenceForItem[0]
          && preferenceForItem[0].wantedItemsIds) || [],
        selectedGroupIds: (preferenceForItem && preferenceForItem[0]
          && preferenceForItem[0].wantedDefinedGroupsIds) || [],
      };
    }
    return null;
  }

  handleChange = (event, name) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSearchBarChange = (event, section1, section2) => {
    const phrase = event.target.value.toUpperCase();
    const updatedList1 = this.props[section1]
      .filter(item => item.name.toUpperCase().includes(phrase));

    if (section2) {
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
      return;
    }
    const pageCountsOnSearch = 1 + Math.floor(
      (updatedList1.length - 1) / ITEMS_ON_PAGE,
    );

    this.setState({
      [section1]: updatedList1,
      myProductsSearchMode: phrase.length !== 0,
      currentPageOnSearch: 1,
      pageCountsOnSearch,
    });
  };

  handleToggle(item, name) {
    const currentIndex = this.state[name].indexOf(item.id);
    const newChecked = [...this.state[name]];

    if (currentIndex === -1) {
      newChecked.push(item.id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({ [name]: newChecked });
  }

  handleDialogAgree() {
    const { selectedMyProduct } = this.state;
    const { preferences } = this.props;

    const preferenceForItem = preferences.filter(
      pref => pref.haveItemId === selectedMyProduct.id,
    );

    this.setState({
      openDialog: false,
      selectedOtherProductIds: preferenceForItem.length > 0
        ? preferenceForItem[0].wantedItemsIds : [],
      selectedGroupIds: preferenceForItem.length > 0
        ? preferenceForItem[0].wantedDefinedGroupsIds : [],
      editMode: false,
    });
  }

  handleDialogDisagree() {
    this.setState({
      openDialog: false,
    });
  }

  submitSavePreferences() {
    const {
      alert,
      updatePreference,
    } = this.props;

    const {
      selectedOtherProductIds,
      selectedGroupIds,
      selectedMyProduct,
    } = this.state;

    updatePreference(selectedMyProduct.id, selectedOtherProductIds, selectedGroupIds)
      .then(() => {
        this.setState({ editMode: false });
        alert.show('Successfully modify preference', { type: 'success' });
      })
      .catch(error => alert.show(`Cannot modify preference: ${error.message}`, { type: 'error' }));
  }

  render() {
    const {
      classes,
      isParticipant,
    } = this.props;
    const {
      selectedOtherProductIds,
      selectedGroupIds,
      selectedMyProduct,
      otherAssignedItems,
      myAssignedItems,
      myDefinedGroups,
      itemToPreview,
      editMode,
      openDialog,
      preferences,
      otherProductsSearchMode,
      myProductsSearchMode,
      currentPage,
      currentPageOnSearch,
      pageCounts,
      pageCountsOnSearch,
    } = this.state;

    return (
      <EditionPanelContainer edition={this.props.edition} navigationValue="preferences">
        <Grid container spacing={24}>
          {isParticipant ? <Grid item xs={12} sm={6}>
            <Typography className={classes.sectionSubtitle} component="h1" variant="h5">
              My Items
            </Typography>
            <Paper className={classes.paperContainer}>
              <SearchBar onChange={event => this.handleSearchBarChange(event, 'myAssignedItems')} />
              <CheckboxList
                data={myProductsSearchMode ? myAssignedItems : this.props.myAssignedItems}
                primaryAction={(item) => {
                  const pref = preferences.filter(
                    i => i.haveItemId === item.id,
                  );
                  this.setState({
                    selectedMyProduct: item,
                    selectedGroupIds: (pref.length > 0 && pref[0].wantedDefinedGroupsIds) || [],
                    selectedOtherProductIds: (pref.length > 0 && pref[0].wantedItemsIds) || [],
                  });
                }}
                editMode={editMode}
                selectedWithPrimaryId={selectedMyProduct ? [selectedMyProduct.id] : []}
                secondaryAction={item => this.setState({ itemToPreview: item })}
                selectedWithSecondaryId={itemToPreview && itemToPreview.id}
              />
            </Paper>
          </Grid> : null}
          <Grid item xs={12} sm={6}>
            <Typography className={classes.sectionSubtitle} component="h1" variant="h5">
              Other items
              {isParticipant && selectedMyProduct ? <IconButton
                onClick={() => this.setState({ editMode: true })}
                color="inherit"
              >
                <Icon>edit</Icon>
              </IconButton> : null}
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
                titles={['My defined groups: ', 'Other items: ']}
                itemCounts={otherProductsSearchMode ? [
                  myDefinedGroups.length,
                  otherAssignedItems.length,
                ] : [
                  this.props.myDefinedGroups.length,
                  this.props.otherAssignedItems.length,
                ]}
                currentSelected={[selectedGroupIds, selectedOtherProductIds]}
                onItemClick={[
                  item => this.handleToggle(item, 'selectedGroupIds'),
                  item => this.handleToggle(item, 'selectedOtherProductIds'),
                ]}
                secondaryAction={item => this.setState({ itemToPreview: item })}
                selectedWithSecondaryId={itemToPreview && itemToPreview.id}
              />
              <Grid container spacing={24}>
                <Grid item xs={12} sm={8}>
                  <Typography className={classes.assignedText} component="h1" variant="body1">
                    {`Items assigned: ${
                      (selectedOtherProductIds || []).length + (selectedGroupIds || []).length
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
                  onClick={this.submitSavePreferences}
                >
                  Save
                </Button> : null}
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12}>
            <ProductPreview item={itemToPreview} showOwnerUser />
          </Grid>
        </Grid>
        <CustomDialog
          handleDisagree={this.handleDialogDisagree}
          handleAgree={this.handleDialogAgree}
          title={dialogContent.cancelPreferenceEdition.title}
          textBody={dialogContent.cancelPreferenceEdition.bodyText}
          openDialog={openDialog}
        />
      </EditionPanelContainer>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.editionId;
  const edition = id ? state.editions.items.filter(e => `${e.id}` === id)[0] : null;
  const otherProduct = state.otherAssignedProducts.productsByEdition[id];
  const preferenceByEdition = state.preferences.preferencesByEdition[id];
  const myProduct = state.myAssignedProducts.productsByEdition[id];
  const definedGroups = state.definedGroups.definedGroupsByEdition[id];

  return ({
    edition,
    otherAssignedItems: (otherProduct && otherProduct.items) || [],
    myAssignedItems: (myProduct && myProduct.items) || [],
    preferences: (preferenceByEdition && preferenceByEdition.preferences) || [],
    myDefinedGroups: (definedGroups && definedGroups.groups) || [],
    isParticipant: !!(edition && edition.participant),
  });
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const id = parseInt(ownProps.match.params.editionId, 10);
  return bindActionCreators({
    fetchPreferences: () => (
      actions.preferences.fetchPreferencesIfNeeded(id)
    ),
    fetchOtherAssignedProducts: () => (
      actions.otherAssignedProducts.fetchOtherAssignedProductsIfNeeded(id)
    ),
    fetchMyAssignedProducts: () => (
      actions.myProducts.fetchMyAssignedProductsIfNeeded(id)
    ),
    fetchDefinedGroups: () => (
      actions.definedGroups.fetchDefinedGroupsIfNeeded(id)
    ),
    updatePreference: (productId, wantedItemsIds, wantedDefinedGroupsIds) => (
      actions.preferences.updatePreference(id, productId, wantedItemsIds, wantedDefinedGroupsIds)
    ),
  }, dispatch);
};

export default withStyles(styles)(
  withAlert(connect(mapStateToProps, mapDispatchToProps)(PreferencesView)),
);
