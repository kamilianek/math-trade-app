import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { withAlert } from 'react-alert';

import EditionPanelContainer from '../../components/EditionPanelContainer';


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
    marginRight: theme.spacing.unit * 5,
  },
  productListContainer: {
    maxHeight: 600,
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
  static MAX_IMAGE_SIZE = 5 * 1024 * 1024;

  constructor(props) {
    super(props);

    this.state = {
      navigationValue: 0,
      currentProduct: null,
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
    };

    this.onItemClick = this.onItemClick.bind(this);
    this.handleNavigationChange = this.handleNavigationChange.bind(this);
    this.submitProductChange = this.submitProductChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.removeImage = this.removeImage.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
  }

  onItemClick(id) {
    if (id || id === 0) {
      const { myAssignedItems } = this.props;
      console.log(myAssignedItems);
      const currentItem = myAssignedItems.filter(i => i.id === id)[0];
      console.log(currentItem);
      this.setState({
        currentItemId: id,
        name: currentItem.name,
        description: currentItem.description,
        images: currentItem.images,
        editMode: false,
        productCreationMode: false,
        isNewNameValid: true,
        isNewDescriptionValid: true,
      });

      return;
    }

    this.setState({
      editMode: false,
      productCreationMode: false,
      isNewNameValid: true,
      isNewDescriptionValid: true,
    });
  }

  handleNavigationChange = (event, value) => {
    this.setState({ navigationValue: value });
  };

  validateForm() {
    const {
      name,
      description,
      editMode,
      newName,
      newDescription,
    } = this.state;

    if (editMode) {
      const isUsernameValid = name.length > 0;
      const isDescriptionValid = description.length > 0;
      this.setState({
        isUsernameValid,
        isDescriptionValid,
      });
      return isUsernameValid && isDescriptionValid;
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
    alert.show('Successfullty modified product', { type: 'success' });
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
    });
  };

  fileUpload(e) {
    e.preventDefault();

    const { productCreationMode } = this.state;
    const newFiles = Array
      .from(e.target.files || []);

    newFiles
      .forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (productCreationMode) {
            this.setState(state => ({
              newImages: [...state.newImages, { uri: event.target.result }],
            }));
          } else {
            this.setState(state => ({
              images: [...state.images, { uri: event.target.result }],
            }));
          }
        };
        reader.readAsDataURL(file);
      });
  }

  render() {
    const {
      classes,
      myAssignedItems,
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
    } = this.state;


    const imagesToShow = productCreationMode ? newImages : images;
    console.log('oewqoewq: ', myAssignedItems);
    return (
      <EditionPanelContainer edition={this.props.edition} navigationValue="products">
        <Grid container spacing={24}>
          <Grid item xs={12} sm={4}>
            <Typography className={classes.sectionSubtitle} component="h1" variant="h4">
              My products
            </Typography>
            <Paper className={classes.paperContainer}>
              <List
                className={classes.productListContainer}
                component="nav"
              >
                {
                  myAssignedItems.map(item => (
                    <ListItem
                      button
                      key={item.id}
                      selected={currentItemId === item.id && !productCreationMode}
                      onClick={() => this.onItemClick(item.id)}
                    >
                      <ListItemText
                        inset
                        primary={`${item.name}`}
                      />
                    </ListItem>
                  ))
                }
              </List>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
            <Typography className={classes.sectionSubtitle} component="h1" variant="h4">
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
                    className={classes.textField}
                    margin="normal"
                    variant="filled"
                    onChange={event => this.handleChange(event, editMode ? 'description' : 'newDescription')}
                    value={editMode ? description : newDescription}
                  /> : <Typography className={classes.sectionSubtitle}>
                    {description}
                  </Typography>}
                <div className={classes.gridListContainer}>
                  <GridList cellHeight={200} className={classes.gridList}>
                    {imagesToShow.map(image => (
                      <GridListTile key={image.uri}>
                        <img src={image.uri} alt={'image'} />
                        {editMode || productCreationMode ? <GridListTileBar
                          classes={{
                            root: classes.titleBar,
                            title: classes.imageTitle,
                          }}
                          actionIcon={
                            <IconButton
                              onClick={() => this.removeImage(image.uri)}
                              color="inherit"
                            >
                              <Icon>delete</Icon>
                            </IconButton>
                          }
                        /> : null}
                      </GridListTile>
                    ))}
                  </GridList>
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
                            onClick={() => this.onItemClick(currentItemId)}
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
      </EditionPanelContainer>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log('>>>', state);
  const id = ownProps.match.params.editionId;
  const edition = id ? state.editions.items.filter(e => `${e.id}` === id)[0] : null;
  const product = state.myAssignedProducts.products.filter(prod => `${prod.editionId}` === id)[0];
  console.log('prod', edition);
  return ({
    edition,
    myAssignedItems: product && product.items,
  });
};

export default withStyles(styles)(withAlert(connect(mapStateToProps, null)(MyProductsView)));
