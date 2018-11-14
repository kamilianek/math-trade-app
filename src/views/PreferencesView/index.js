import React from 'react';
import { connect } from 'react-redux';
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

class MyProductsView extends React.Component {
  constructor(props) {
    super(props);

    const { myAssignedItems, otherAssignedItems } = this.props;

    this.state = {
      selectedMyProductId: myAssignedItems && myAssignedItems[0].id,
      selectedOtherProductId: [],
      myAssignedItems,
      otherAssignedItems,
      itemToPreview: null,
      editMode: false,
      openDialog: false,
    };

    this.handleDialogAgree = this.handleDialogAgree.bind(this);
    this.handleDialogDisagree = this.handleDialogDisagree.bind(this);
    this.submitSavePreferences = this.submitSavePreferences.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  // TODO: remove it later
  componentWillReceiveProps(nextProps) {
    if (this.props.myAssignedItems !== nextProps.myAssignedItems) {
      this.setState({ myAssignedItems: nextProps.myAssignedItems });
    }
    if (this.props.otherAssignedItems !== nextProps.otherAssignedItems) {
      this.setState({ otherAssignedItems: nextProps.otherAssignedItems });
    }
  }

  // static getDerivedStateFromProps(props, state) {
  //   console.log('>>> ', props, state);
  //   if (props.myAssignedItems !== state.myAssignedItems) {
  //     return {
  //       myAssignedItems: props.myAssignedItems,
  //       otherAssignedItems: props.otherAssignedItems
  //     };
  //   }
  //   return null;
  // }

  handleChange = (event, name) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSearchBarChange = (event, name) => {
    const phrase = event.target.value.toUpperCase();
    const updatedList = this.props[name].filter(item => item.name.toUpperCase().includes(phrase));

    this.setState({ [name]: updatedList });
  };

  handleToggle(value) {
    console.log('dupa: ', value);
    const { selectedOtherProductId } = this.state;
    const currentIndex = selectedOtherProductId.indexOf(value.id);
    const newChecked = [...selectedOtherProductId];

    if (currentIndex === -1) {
      newChecked.push(value.id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      selectedOtherProductId: newChecked,
    });
  }

  // TODO: set selectedOtherProductId as in store
  handleDialogAgree() {
    this.setState({
      openDialog: false,
      selectedOtherProductId: [],
      editMode: false,
    });
  }

  handleDialogDisagree() {
    this.setState({
      openDialog: false,
    });
  }

  // TODO: submit preferences and update in store
  submitSavePreferences() {
    const { alert } = this.props;

    this.setState({
      editMode: false,
      selectedOtherProductId: [],
    });

    alert.show('Successfully modified preferences', { type: 'success' });
  }

  render() {
    const {
      classes,
    } = this.props;
    const {
      selectedOtherProductId,
      selectedMyProductId,
      otherAssignedItems,
      myAssignedItems,
      itemToPreview,
      editMode,
      openDialog,
    } = this.state;

    return (
      <EditionPanelContainer edition={this.props.edition} navigationValue="preferences">
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <Typography className={classes.sectionSubtitle} component="h1" variant="h5">
              My products
            </Typography>
            <SearchBar onChange={event => this.handleSearchBarChange(event, 'myAssignedItems')} />
            <Paper className={classes.paperContainer}>
              <CheckboxList
                data={myAssignedItems}
                primaryAction={item => this.setState({ selectedMyProductId: item.id })}
                editMode={editMode}
                selectedWithPrimaryId={[selectedMyProductId]}
                secondaryAction={item => this.setState({ itemToPreview: item })}
                selectedWithSecondaryId={itemToPreview && itemToPreview.id}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography className={classes.sectionSubtitle} component="h1" variant="h5">
              Other products
              <IconButton
                onClick={() => this.setState({ editMode: true })}
                color="inherit"
              >
                <Icon>edit</Icon>
              </IconButton>
            </Typography>
            <SearchBar onChange={event => this.handleSearchBarChange(event, 'otherAssignedItems')} />
            <Paper className={classes.paperContainer}>
              <CheckboxList
                data={otherAssignedItems}
                primaryAction={item => this.handleToggle(item)}
                editMode={!editMode}
                selectedWithPrimaryId={selectedOtherProductId}
                secondaryAction={item => this.setState({ itemToPreview: item })}
                selectedWithSecondaryId={itemToPreview ? itemToPreview.id : null}
              />
              <Typography className={classes.sectionSubtitle} component="h1" variant="body1">
                {`Items assigned: ${selectedOtherProductId.length}`}
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
                  onClick={this.submitSavePreferences}
                >
                  Save
                </Button> : null}
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12}>
            <ProductPreview item={itemToPreview} />
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
  console.log('>>>', state);
  const id = ownProps.match.params.editionId;
  const edition = id ? state.editions.items.filter(e => `${e.id}` === id)[0] : null;
  const otherProduct = state.otherAssignedProducts.productsByEdition[id];
  const myProduct = state.myAssignedProducts.products.filter(prod => `${prod.editionId}` === id)[0];

  return ({
    edition,
    otherAssignedItems: otherProduct && otherProduct.items,
    myAssignedItems: myProduct && myProduct.items,
  });
};

export default withStyles(styles)(withAlert(connect(mapStateToProps, null)(MyProductsView)));
