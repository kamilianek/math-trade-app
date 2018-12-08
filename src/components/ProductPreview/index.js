import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import UserPreviewWrapper from '../UserPreviewWrapper';

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
  renderItemSection() {
    const {
      item,
      classes,
      apiUrl,
    } = this.props;

    return (
      <>
      <Typography className={classes.sectionSubtitle} component="h1" variant="h5">
        Item
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
            <img className={classes.image} src={`${apiUrl}/images/${image.name}`} />
          )) }
          </> : null
        }
      </Paper>
      </>
    );
  }

  renderWithUserPreview(id) {
    const { classes } = this.props;

    return (
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          {this.renderItemSection()}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography className={classes.sectionSubtitle} component="h1" variant="h5">
            User
          </Typography>
          <UserPreviewWrapper userId={id}/>
        </Grid>
      </Grid>
    );
  }

  render() {
    const {
      showOwnerUser,
      item,
    } = this.props;
    console.log('item: ', item);

    return showOwnerUser && item && item.userId
      ? this.renderWithUserPreview(item.userId) : this.renderItemSection();
  }
}

ProductPreview.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object,
  showOwnerUser: PropTypes.bool,
};

ProductPreview.defaultProps = {
  showOwnerUser: false,
};

const mapStateToProps = state => ({
  apiUrl: state.auth.apiUrl,
});


export default withStyles(styles)(connect(mapStateToProps, null)(ProductPreview));
