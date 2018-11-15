import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { withAlert } from 'react-alert';

import EditionPanelContainer from '../../components/EditionPanelContainer';
import CustomDialog from '../../components/CustomDialog';
import MultiheaderCheckboxList from '../../components/MultiheaderCheckboxList';

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
      currentItemId: null,
      editMode: false,
      productCreationMode: false,
      name: '',
      isNameValid: true,
      description: '',
      isDescriptionValid: true,
      images: [],
      newImages: [],
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

  onItemClick(id, dataHeader) {
    const { isSelectedAssigned } = this.state;
    const { myAssignedItems, myNotAssignedItems } = this.props;
    if (id || id === 0) {
      let data;
      if (dataHeader) {
        data = this.props[dataHeader];
      } else {
        data = isSelectedAssigned ? myAssignedItems : myNotAssignedItems;
      }
      const currentItem = data.filter(i => i.id === id)[0];

      this.setState(state => ({
        currentItemId: id,
        name: currentItem.name,
        description: currentItem.description,
        images: currentItem.images,
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
    const { alert } = this.props;
    const { name, description } = this.state;

    if (!this.validateForm()) {
      console.log('invalid form');
      return;
    }

    console.log('submit changes: ', name, description);
    alert.show('Successfully added product', { type: 'success' });
  }

  handleDialogAgree() {
    const { currentItemId } = this.state;
    this.onItemClick(currentItemId);
    this.setState({
      openDialog: false,
    });
  }

  handleDialogDisagree() {
    this.setState({
      openDialog: false,
    });
  }

  removeImage(uri) {
    const { images, newImages, productCreationMode } = this.state;

    if (productCreationMode) {
      const updatedImages = newImages.filter(image => image.uri !== uri);
      this.setState({ newImages: updatedImages });
    } else {
      const updatedImages = images.filter(image => image.uri !== uri);
      this.setState({ images: updatedImages });
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
                newImages: [...state.newImages, { uri: event.target.result }],
              }));
            } else {
              this.setState(state => ({
                images: [...state.images, { uri: event.target.result }],
              }));
            }
          } else {
            alert.show(`Maximum image size is ${MyProductsView.MAX_IMAGE_SIZE / (1024 * 1024)}MB`, { type: 'error' });
          }
        };
        reader.readAsDataURL(file);
      });
  }

  handleItemAssignment(itemId) {
    const { alert } = this.props;
    console.log('assignig item with id: ', itemId);
    this.setState({ currentItemId: null });
    alert.show('Successfully assigned item to edition', { type: 'success' });
  }

  render() {
    const {
      classes,
      edition,
      myAssignedItems,
      myNotAssignedItems,
    } = this.props;

    const {
      currentItemId,
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
                currentSelected={[[currentItemId], [currentItemId]]}
                onItemClick={[
                  item => this.onItemClick(item.id, 'myAssignedItems'),
                  item => this.onItemClick(item.id, 'myNotAssignedItems'),
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
                currentItemId || productCreationMode ? <>
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
                  /> : <Typography className={classes.sectionSubtitle}>
                    {description}
                  </Typography>}
                <div className={classes.gridListContainer}>
                  {imagesToShow.map(image => (
                    <div className={classes.deleteButtonContainer}>
                      <img src={image.uri} alt={'image'} className={classes.image} />
                      { editMode || productCreationMode
                        ? <div className={classes.titleBar} /> : null }
                      { editMode || productCreationMode
                        ? <IconButton
                            onClick={() => this.removeImage(image.uri)}
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
                      { !(editMode || productCreationMode) && currentItemId && !isSelectedAssigned
                        ? <Button
                          variant="contained"
                          color="primary"
                          onClick={() => this.handleItemAssignment(currentItemId)}
                        >
                          Assign to edition
                        </Button> : null}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Grid container spacing={8}>
                        <Grid item xs={12} sm={4}>

                        </Grid>
                        <Grid item xs={12} sm={8}>
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
                            onClick={() => this.submitProductChange()}
                          >
                            { productCreationMode ? 'Add item' : 'Update' }
                          </Button> : null}
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
  console.log('prod', edition);
  return ({
    edition,
    myAssignedItems: (product && product.items) || [],
    myNotAssignedItems: state.myNotAssignedProducts.items || [],
  });
};

export default withStyles(styles)(withAlert(connect(mapStateToProps, null)(MyProductsView)));
