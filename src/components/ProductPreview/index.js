import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  sectionSubtitle: {
    margin: theme.spacing.unit * 3,
    height: 30,
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
    const {
      item,
      classes,
    } = this.props;

    return (
      <>
        <Typography className={classes.sectionSubtitle} component="h1" variant="h5">
          Item preview
        </Typography>
        <Paper className={classes.paperContainer}>
          { item
            ? <>
            <Typography className={classes.sectionSubtitle} component="h1" variant="h6">
              {item.name}
            </Typography>
            <Typography variant="body2" className={classes.sectionSubtitle}>
              {item.description}
            </Typography>
            { (item.images || []).map(image => (
              <img className={classes.image} src={image.uri} />
            )) }
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
