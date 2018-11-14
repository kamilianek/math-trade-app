import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withAlert } from 'react-alert';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import EditionPanelContainer from '../../components/EditionPanelContainer';
import CheckboxList from '../../components/CheckboxList';
import SearchBar from '../../components/SerachBar';
import MultiheaderCheckboxList from '../../components/MultiheaderCheckboxList';
import CustomDialog from '../../components/CustomDialog';

const dialogContent = {
  cancelPreferenceEdition: {
    title: 'Cancel defined group edition',
    bodyText: 'Are you sure you want to cancel defined group edition? If you click YES you will loose all unsaved changes.',
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
});

class DefinedGroupsView extends Component {
  constructor(props) {
    super(props);
    const { myDefinedGroups, otherAssignedItems } = this.props;
    this.state = {
      myDefinedGroups,
      otherAssignedItems,
      selectedMyGroup: myDefinedGroups && myDefinedGroups[0],
      selectedProductIds: myDefinedGroups && myDefinedGroups[0] && myDefinedGroups[0].productsIds,
      selectedGroupIds: myDefinedGroups && myDefinedGroups[0] && myDefinedGroups[0].groupIds,
      groupToPreview: null,
      editMode: false,
      openDialog: false,
    };

    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleDialogAgree = this.handleDialogAgree.bind(this);
    this.handleDialogDisagree = this.handleDialogDisagree.bind(this);
    this.submitSaveDefinedGroup = this.submitSaveDefinedGroup.bind(this);
  }

  handleSearchBarChange = (event, section1, section2) => {
    const phrase = event.target.value.toUpperCase();
    const updatedList1 = this.props[section1]
      .filter(item => item.name.toUpperCase().includes(phrase));
    const updatedList2 = this.props[section2]
      .filter(item => item.name.toUpperCase().includes(phrase));

    this.setState({
      [section1]: updatedList1,
      [section2]: updatedList2,
    });
  };

  handleDialogAgree() {
    const { selectedMyGroup } = this.state;

    this.setState({
      openDialog: false,
      selectedProductIds: selectedMyGroup.productsIds,
      selectedGroupIds: selectedMyGroup.groupIds,
      editMode: false,
    });
  }

  handleDialogDisagree() {
    this.setState({
      openDialog: false,
    });
  }

  submitSaveDefinedGroup() {
    const { alert } = this.props;
    const { selectedMyGroup } = this.state;

    this.setState({
      selectedProductIds: selectedMyGroup.productsIds,
      selectedGroupIds: selectedMyGroup.groupIds,
      editMode: false,
    });

    alert.show('Successfully saved defined group', { type: 'success' });
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
    const { edition, classes } = this.props;
    const {
      myDefinedGroups,
      otherAssignedItems,
      editMode,
      selectedMyGroup,
      groupToPreview,
      selectedProductIds,
      selectedGroupIds,
      openDialog,
    } = this.state;

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
                  selectedProductIds: item.productsIds,
                  selectedGroupIds: item.groupIds,
                })}
                editMode={editMode}
                selectedWithPrimaryId={[selectedMyGroup.id]}
                secondaryAction={item => this.setState({ groupToPreview: item })}
                selectedWithSecondaryId={groupToPreview && groupToPreview.id}
              />
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
                data={[otherAssignedItems, myDefinedGroups]}
                disabled={!editMode}
                titles={['Other items: ', 'My defined groups: ']}
                currentSelected={[selectedProductIds, selectedGroupIds]}
                onItemClick={[
                  item => this.handleItemClick(item, 'selectedProductIds'),
                  item => this.handleItemClick(item, 'selectedGroupIds'),
                ]}
                secondaryAction={item => this.setState({ groupToPreview: item })}
                selectedWithSecondaryId={groupToPreview && groupToPreview.id}
              />
              <Typography className={classes.sectionSubtitle} component="h1" variant="body1">
                {`Items assigned: ${selectedGroupIds.length + selectedProductIds.length}`}
              </Typography>
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
  const otherProducts = state.otherAssignedProducts.productsByEdition[id];
  const definedGroups = state.definedGroups.definedGroupsByEdition[id];

  return ({
    edition,
    otherAssignedItems: otherProducts && otherProducts.items,
    myDefinedGroups: (definedGroups && definedGroups.groups) || [],
  });
};

export default withStyles(styles)(withAlert(connect(mapStateToProps, null)(DefinedGroupsView)));
