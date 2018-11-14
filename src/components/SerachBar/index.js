import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import { fade } from '@material-ui/core/styles/colorManipulator';
import InputBase from '@material-ui/core/InputBase';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade('#BDBDBD', 0.15),
    '&:hover': {
      backgroundColor: fade('#BDBDBD', 0.25),
    },
    marginRight: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
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

class SearchBar extends Component {
  render() {
    const { classes, onChange } = this.props;

    return (
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
          onChange={event => onChange(event)}
        />
      </div>
    );
  }
}

PropTypes.SearchBar = {
  onChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(SearchBar);
