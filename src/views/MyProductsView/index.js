import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { withAlert } from 'react-alert';
import { bindActionCreators } from 'redux';

import EditionPanelContainer from '../../components/EditionPanelContainer';
import CustomDialog from '../../components/CustomDialog';
import MultiheaderCheckboxList from '../../components/MultiheaderCheckboxList';

import actions from '../../actions';

const styles = theme => ({
  rightButtonIcon: {
    marginRight: theme.spacing.unit,
  },
  backButton: {
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 10,
  },
  sectionSubtitle: {
    margin: theme.spacing.unit * 3,
    height: 40,
    marginRight: theme.spacing.unit * 5,
  },
  description: {
    margin: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 10,
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
    marginTop: theme.spacing.unit * 2,
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
    width: 110,
    position: 'absolute',
    height: 30,
    left: 0,
    bottom: 4,
  },
  textField: {
    width: '100%',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    alignSelf: 'center',
  },
  deleteButtonContainer: {
    width: '100%',
    marginBottom: 10,
    position: 'relative',
  },
  deleteButtonIcon: {
    position: 'absolute',
    bottom: 0,
    left: 30,
  },
  createProductButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 15,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
});


class MyProductsView extends React.Component {
  static MAX_IMAGE_SIZE = 5 * 1024 * 1024;

  constructor(props) {
    super(props);

    this.state = {
      navigationValue: 0,
      currentItem: null,
      editMode: false,
      productCreationMode: false,
      name: '',
      isNameValid: true,
      description: '',
      isDescriptionValid: true,
      images: [],
      newImages: [],
      imagesToRemove: [],
      newName: '',
      newDescription: '',
      isNewNameValid: true,
      isNewDescriptionValid: true,
      isSelectedAssigned: false,
      openDialog: false,
    };

    this.onItemClick = this.onItemClick.bind(this);
    this.submitProductChange = this.submitProductChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.removeImage = this.removeImage.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
    this.handleItemAssignment = this.handleItemAssignment.bind(this);
    this.handleDialogAgree = this.handleDialogAgree.bind(this);
    this.handleDialogDisagree = this.handleDialogDisagree.bind(this);
  }

  componentDidMount() {
    const {
      fetchMyAssignedProductsIfNeeded,
      fetchMyNotAssignedProductsIfNeeded,
      alert,
      isParticipant,
    } = this.props;

    if (isParticipant) {
      fetchMyAssignedProductsIfNeeded()
        .then(() => fetchMyNotAssignedProductsIfNeeded())
        .catch(() => alert.show('Cannot load your products', { type: 'error' }));
    }
  }

  onItemClick(item, dataHeader) {
    if (item && (item.id || item.id === 0)) {
      this.setState(state => ({
        currentItem: item,
        name: item.name,
        description: item.description,
        images: item.images,
        imagesToRemove: [],
        editMode: false,
        productCreationMode: false,
        isNewNameValid: true,
        isNewDescriptionValid: true,
        isSelectedAssigned: dataHeader
          ? dataHeader === 'myAssignedItems' : state.isSelectedAssigned,
      }));

      return;
    }

    this.setState({
      editMode: false,
      productCreationMode: false,
      isNewNameValid: true,
      isNewDescriptionValid: true,
    });
  }

  validateForm() {
    const {
      name,
      description,
      editMode,
      newName,
      newDescription,
    } = this.state;

    if (editMode) {
      const isNameValid = name.length > 0;
      const isDescriptionValid = description.length > 0;
      this.setState({
        isNameValid,
        isDescriptionValid,
      });
      return isNameValid && isDescriptionValid;
    }

    const isNewNameValid = newName.length > 0;
    const isNewDescriptionValid = newDescription.length > 0;
    this.setState({
      isNewNameValid,
      isNewDescriptionValid,
    });
    return isNewNameValid && isNewDescriptionValid;
  }

  submitProductChange() {
    const {
      alert,
      createProduct,
      updateMyAssignedProduct,
      updateMyNotAssignedProduct,
    } = this.props;

    const {
      name,
      newName,
      description,
      newDescription,
      productCreationMode,
      images,
      newImages,
      imagesToRemove,
      editMode,
      currentItem,
    } = this.state;

    if (!this.validateForm()) {
      console.log('invalid form');
      return;
    }

    if (productCreationMode) {
      const imagesToSend = newImages.filter(image => !image.id && image.file)
        .map(image => image.file);

      console.log('imagesToSend: ', imagesToSend);
      createProduct(newName, newDescription, imagesToSend)
        .then(() => alert.show('Successfully created product', { type: 'success' }))
        .catch(error => alert.show(`Cannot add product: ${error.message}`, { type: 'error' }));

      this.setState({
        productCreationMode: false,
        editMode: false,
      });

      return;
    }

    console.log(productCreationMode, editMode, images);

    if (editMode) {
      const imagesToSend = images.filter(image => !image.id && image.file)
        .map(image => image.file);
      if (currentItem.editionId) { // assigned product edition
        updateMyAssignedProduct(
          currentItem.id,
          name,
          description,
          imagesToSend,
          imagesToRemove,
        )
          .then(() => alert.show('Successfully updated product', { type: 'success' }))
          .catch(error => alert.show(`Cannot update product: ${error.message}`, { type: 'error' }));
      } else { // not assigned product edition
        updateMyNotAssignedProduct(
          currentItem.id,
          name,
          description,
          imagesToSend,
          imagesToRemove,
        )
          .then(() => alert.show('Successfully updated product', { type: 'success' }))
          .catch(error => alert.show(`Cannot update product: ${error.message}`, { type: 'error' }));
      }
    }

    this.setState({
      productCreationMode: false,
      editMode: false,
    });
  }

  handleDialogAgree() {
    const { currentItem } = this.state;

    this.onItemClick(currentItem);
    this.setState({
      openDialog: false,
    });
  }

  handleDialogDisagree() {
    this.setState({
      openDialog: false,
    });
  }

  removeImage(name) {
    const { images, newImages, productCreationMode } = this.state;
    let uriToRemove = null;

    if (productCreationMode) {
      const updatedImages = newImages.filter(image => image.name !== name);
      this.setState({ newImages: updatedImages });
    } else {
      const updatedImages = images.filter((image) => {
        if (image.name !== name) {
          return true;
        }

        if (image.id) {
          uriToRemove = image.id;
        }

        return false;
      });
      this.setState(state => ({
        images: updatedImages,
        imagesToRemove: uriToRemove ? [...state.imagesToRemove, uriToRemove] : state.imagesToRemove,
      }));
    }
  }

  handleChange = (event, name) => {
    this.setState({
      [name]: event.target.value,
      [`is${name.charAt(0).toUpperCase() + name.slice(1)}Valid`]: true,
    });
  };

  fileUpload(e) {
    e.preventDefault();
    const { alert } = this.props;
    const { productCreationMode } = this.state;
    const newFiles = Array
      .from(e.target.files || []);

    newFiles
      .forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.loaded <= MyProductsView.MAX_IMAGE_SIZE) {
            if (productCreationMode) {
              this.setState(state => ({
                newImages: [...state.newImages, { name: event.target.result, file }],
              }));
            } else {
              this.setState(state => ({
                images: [...state.images, { name: event.target.result, file }],
              }));
            }
          } else {
            alert.show(`Maximum image size is ${MyProductsView.MAX_IMAGE_SIZE / (1024 * 1024)}MB`, { type: 'error' });
          }
        };
        reader.readAsDataURL(file);
      });
  }

  handleItemAssignment(item) {
    const {
      alert,
      assignProductToEdition,
    } = this.props;

    assignProductToEdition(item.id)
      .then(() => {
        this.setState({ isSelectedAssigned: true });
        alert.show('Successfully assigned item to edition', { type: 'success' });
      })
      .catch(error => alert.show(`Cannot assign item to edition: ${error.message}`, { type: 'success' }));
  }

  render() {
    const {
      classes,
      edition,
      myAssignedItems,
      myNotAssignedItems,
      isParticipant,
      apiUrl,
    } = this.props;

    const {
      currentItem,
      editMode,
      productCreationMode,
      images,
      description,
      name,
      newName,
      newDescription,
      newImages,
      isNameValid,
      isDescriptionValid,
      isNewNameValid,
      isNewDescriptionValid,
      isSelectedAssigned,
      openDialog,
    } = this.state;

    const imagesToShow = productCreationMode ? newImages : images;

    if (!isParticipant) {
      return (<Redirect to={`/editions/${edition.id}/preferences`} />);
    }

    return (
      <EditionPanelContainer edition={edition} navigationValue="products">
        <Grid container spacing={24}>
          <Grid item xs={12} sm={4}>
            <Typography className={classes.sectionSubtitle} component="h1" variant="h5">
              My products
            </Typography>
            <Paper className={classes.paperContainer}>
              <MultiheaderCheckboxList
                data={[myAssignedItems, myNotAssignedItems]}
                titles={['Assigned: ', 'Not assigned: ']}
                currentSelected={[
                  currentItem ? [currentItem.id] : [], currentItem ? [currentItem.id] : [],
                ]}
                onItemClick={[
                  item => this.onItemClick(item, 'myAssignedItems'),
                  item => this.onItemClick(item, 'myNotAssignedItems'),
                ]}
              />
              <div className={classes.createProductButton}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => this.setState({
                    productCreationMode: true,
                    editMode: false,
                  })}
                >
                  Create product
                </Button>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography className={classes.sectionSubtitle} component="h1" variant="h5">
              Product
              <IconButton
                onClick={() => this.setState({
                  editMode: true,
                  productCreationMode: false,
                })}
                color="inherit"
              >
                <Icon>edit</Icon>
              </IconButton>
            </Typography>
            <Paper className={classes.paperContainer}>
              {
                (currentItem && currentItem.id) || productCreationMode ? <>
                  {editMode || productCreationMode ? <TextField
                    id="productTitle"
                    label="Product title"
                    className={classes.textField}
                    margin="normal"
                    error={(editMode && !isNameValid)
                      || (productCreationMode && !isNewNameValid)}
                    variant="filled"
                    onChange={event => this.handleChange(event, editMode ? 'name' : 'newName')}
                    value={editMode ? name : newName}
                  /> : <Typography className={classes.sectionSubtitle} component="h1" variant="subtitle1">
                    {name}
                  </Typography>}
                  {editMode || productCreationMode ? <TextField
                    id="productDescription"
                    label="Product description"
                    multiline
                    rows="8"
                    error={(editMode && !isDescriptionValid)
                      || (productCreationMode && !isNewDescriptionValid)}
                    className={classes.textField}
                    margin="normal"
                    variant="filled"
                    onChange={event => this.handleChange(event, editMode ? 'description' : 'newDescription')}
                    value={editMode ? description : newDescription}
                  /> : <Typography className={classes.description}>
                    {description}
                  </Typography>}
                <div className={classes.gridListContainer}>
                  {imagesToShow.map(image => (
                    <div className={classes.deleteButtonContainer}>
                      <img src={image.id ? `${apiUrl}/images/${image.name}` : image.name} alt={'image'} className={classes.image} />
                      { editMode || productCreationMode
                        ? <div className={classes.titleBar} /> : null }
                      { editMode || productCreationMode
                        ? <IconButton
                            onClick={() => this.removeImage(image.name)}
                            color="inherit"
                            className={classes.deleteButtonIcon}
                          >
                            <Icon>delete</Icon>
                          </IconButton> : null }
                    </div>
                  ))}
                </div>
                  <Grid container spacing={24}>
                    <Grid item xs={12} sm={6}>
                      {editMode || productCreationMode ? <Button
                        variant="contained"
                        color="primary"
                        className={classes.backButton}
                        onClick={() => this.imageInput.click()}
                      >
                        <Icon className={classes.rightButtonIcon}>add_a_photo</Icon>
                        Add photo
                      </Button> : null}
                      <input
                        id="fileInput"
                        name="fileInput"
                        type="file"
                        ref={(ref) => {
                          this.imageInput = ref;
                        }}
                        style={{ display: 'none' }}
                        onChange={e => this.fileUpload(e)}
                        accept=".png, .jpg, .jpeg"
                      />
                      { !(editMode || productCreationMode)
                        && currentItem && currentItem.id && !isSelectedAssigned
                        ? <Button
                          variant="contained"
                          color="primary"
                          onClick={() => this.handleItemAssignment(currentItem)}
                        >
                          Assign to edition
                        </Button> : null}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Grid container spacing={8}>
                        <Grid item xs={12} sm={4}>

                        </Grid>
                        <Grid item xs={12} sm={8}>
                          <div style={{ float: 'right' }}>
                          {editMode || productCreationMode ? <Button
                            variant="contained"
                            color="primary"
                            className={classes.backButton}
                            onClick={() => this.setState({ openDialog: true })}
                          >
                            Cancel
                          </Button> : null}
                          {editMode || productCreationMode ? <Button
                            variant="contained"
                            color="primary"
                            className={classes.backButton}
                            style={{ marginRight: 0 }}
                            onClick={() => this.submitProductChange()}
                          >
                            { productCreationMode ? 'Add item' : 'Update' }
                          </Button> : null}
                          </div>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </> : null}
            </Paper>
          </Grid>
        </Grid>
        <CustomDialog
          handleDisagree={this.handleDialogDisagree}
          handleAgree={this.handleDialogAgree}
          title={'Cancel product edition'}
          textBody={'Are you sure you want to cancel item edition? If you click YES you will loose all unsaved changes.'}
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
  const product = state.myAssignedProducts.productsByEdition[id];

  return ({
    apiUrl: state.auth && state.auth.apiUrl,
    edition,
    myAssignedItems: (product && product.items) || [],
    myNotAssignedItems: state.myNotAssignedProducts.items || [],
    isParticipant: !!(edition && edition.participant),
  });
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const id = parseInt(ownProps.match.params.editionId, 10);

  return bindActionCreators({
    fetchMyAssignedProductsIfNeeded: () => (
      actions.myProducts.fetchMyAssignedProductsIfNeeded(id)
    ),
    fetchMyNotAssignedProductsIfNeeded: () => (
      actions.myNotAssignedProducts.fetchMyNotAssignedProductsIfNeeded(id)
    ),
    createProduct: (name, description, images) => (
      actions.myProducts.createProduct(id, name, description, images)
    ),
    updateMyAssignedProduct: (currentItemId, name, description, images, imagesToRemove) => (
      actions.myProducts.updateMyAssignedProduct(
        id, currentItemId, name, description, images, imagesToRemove,
      )
    ),
    updateMyNotAssignedProduct: (currentItemId, name, description, images, imagesToRemove) => (
      actions.myNotAssignedProducts.updateMyNotAssignedProduct(
        currentItemId, name, description, images, imagesToRemove,
      )
    ),
    assignProductToEdition: currentItemId => (
      actions.myProducts.assignProductToEdition(
        id, currentItemId,
      )
    ),
  }, dispatch);
};

export default withStyles(styles)(
  withAlert(connect(mapStateToProps, mapDispatchToProps)(MyProductsView)),
);
