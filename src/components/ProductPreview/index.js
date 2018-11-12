import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  sectionSubtitle: {
    margin: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 5,
  },
  paperContainer: {
    minHeight: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    padding: theme.spacing.unit * 3,
    alignSelf: 'center',
  },
});

class ProductPreview extends Component {
  render() {
    const { item, classes } = this.props;
    console.log(item);
    return (
      <>
        <Typography className={classes.sectionSubtitle} component="h1" variant="h4">
          Product preview
        </Typography>
        <Paper className={classes.paperContainer}>
          { item
            ? <>
            <Typography className={classes.sectionSubtitle} component="h1" variant="subtitle1">
              {item.name}
            </Typography>
            <Typography className={classes.sectionSubtitle}>
              {item.description}
            </Typography>
            { item.images.map(image => (<img className={classes.image} src={image.uri} />)) }
            </> : null
          }
        </Paper>
      </>
    );
  }
}

ProductPreview.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object,
};

export default withStyles(styles)(ProductPreview);
