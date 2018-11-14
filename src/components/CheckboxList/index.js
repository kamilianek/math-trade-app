import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

const styles = () => ({
  productListContainer: {
    height: 600,
    overflow: 'auto',
  },
});

class CheckboxList extends Component {
  render() {
    const {
      classes,
      data,
      primaryAction,
      selectedWithPrimaryId,
      secondaryAction,
      selectedWithSecondaryId,
      editMode,
    } = this.props;
    console.log('adad, ', this.props);
    return (
        <List
          className={classes.productListContainer}
          component="nav"
        >
          {
            data.map(item => (
              <ListItem
                button
                dense
                key={item.id}
                disabled={editMode}
                onClick={() => primaryAction(item)}
              >
                <Checkbox
                  checked={selectedWithPrimaryId.indexOf(item.id) !== -1}
                  tabIndex={-1}
                  disableRipple
                />
                <ListItemText
                  inset
                  primary={`${item.name}`}
                />
                {!!secondaryAction && <ListItemSecondaryAction>
                  <IconButton
                    aria-label="Comments"
                    onClick={() => secondaryAction(item)}
                  >
                    <Icon color={selectedWithSecondaryId && item.id === selectedWithSecondaryId
                      ? 'secondary' : 'inherit'}>open_in_new</Icon>
                  </IconButton>
                </ListItemSecondaryAction>}
              </ListItem>
            ))
          }
        </List>
    );
  }
}

CheckboxList.propTypes = {
  data: PropTypes.array.isRequired,
  secondaryAction: PropTypes.func,
  selectedWithSecondaryId: PropTypes.number,
  primaryAction: PropTypes.func,
  selectedWithPrimaryId: PropTypes.array,
  editMode: PropTypes.bool,
};

CheckboxList.defaultProps = {
  multipleSelection: false,
  secondaryAction: null,
  selectedWithSecondaryId: 0,
  primaryAction: () => null,
  editMode: true,
};

export default withStyles(styles)(CheckboxList);
