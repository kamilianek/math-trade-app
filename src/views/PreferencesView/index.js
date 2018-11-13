import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Icon from '@material-ui/core/Icon';
import Checkbox from '@material-ui/core/Checkbox';
import InputBase from '@material-ui/core/InputBase';
import { withAlert } from 'react-alert';

import EditionPanelContainer from '../../components/EditionPanelContainer';
import ProductPreview from '../../components/ProductPreview';
import CustomDialog from '../../components/CustomDialog';

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
    height: 40,
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
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade('#BDBDBD', 0.15),
    '&:hover': {
      backgroundColor: fade('#BDBDBD', 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
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
  }

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

  handleToggle = value => () => {
    const { selectedOtherProductId } = this.state;
    const currentIndex = selectedOtherProductId.indexOf(value);
    const newChecked = [...selectedOtherProductId];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      selectedOtherProductId: newChecked,
    });
  };

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
    console.log('adssda', this.handleDialogAgree);
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
            <Typography className={classes.sectionSubtitle} component="h1" variant="h4">
              My products
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <Icon>search</Icon>
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                onChange={event => this.handleSearchBarChange(event, 'myAssignedItems')}
              />
            </div>
            <Paper className={classes.paperContainer}>
              <List
                className={classes.productListContainer}
                component="nav"
              >
                {
                  myAssignedItems.map(item => (
                    <ListItem
                      button
                      dense
                      key={item.id}
                      disabled={editMode}
                      onClick={() => this.setState({ selectedMyProductId: item.id })}
                    >
                      <Checkbox
                        checked={selectedMyProductId === item.id}
                        tabIndex={-1}
                        disableRipple
                      />
                      <ListItemText
                        inset
                        primary={`${item.name}`}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          aria-label="Comments"
                          onClick={() => this.setState({ itemToPreview: item })}
                        >
                          <Icon color={itemToPreview && item.id === itemToPreview.id ? 'secondary' : 'inherit'}>open_in_new</Icon>
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))
                }
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography className={classes.sectionSubtitle} component="h1" variant="h4">
              Other products
              <IconButton
                onClick={() => this.setState({ editMode: true })}
                color="inherit"
              >
                <Icon>edit</Icon>
              </IconButton>
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <Icon>search</Icon>
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                onChange={event => this.handleSearchBarChange(event, 'otherAssignedItems')}
              />
            </div>
            <Paper className={classes.paperContainer}>
              <List
                className={classes.productListContainer}
                component="nav"
              >
                {otherAssignedItems.map(value => (
                  <ListItem
                    key={value.id}
                    role={undefined}
                    dense
                    button
                    disabled={!editMode}
                    onClick={this.handleToggle(value)}
                  >
                    <Checkbox
                      checked={selectedOtherProductId.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                    />
                    <ListItemText primary={value.name} />
                    <ListItemSecondaryAction>
                      <IconButton
                        aria-label="Comments"
                        onClick={() => this.setState({ itemToPreview: value })}
                      >
                        <Icon color={itemToPreview && value.id === itemToPreview.id ? 'secondary' : 'inherit'}>open_in_new</Icon>
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
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
  console.log('prod', edition);
  return ({
    edition,
    otherAssignedItems: otherProduct && otherProduct.items,
    myAssignedItems: myProduct && myProduct.items,
  });
};

export default withStyles(styles)(withAlert(connect(mapStateToProps, null)(MyProductsView)));
