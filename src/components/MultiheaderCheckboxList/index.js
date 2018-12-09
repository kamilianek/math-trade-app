import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import ListSubheader from '@material-ui/core/ListSubheader';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

const styles = theme => ({
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
  productListContainer: {
    maxHeight: 600,
    width: '100%',
    overflow: 'auto',
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
  },
});

class MultiheaderCheckboxList extends Component {
  renderHeaderContent(data, index) {
    const {
      classes,
      onItemClick,
      disabled,
      titles,
      currentSelected,
      secondaryAction,
      selectedWithSecondaryId,
      itemCounts,
    } = this.props;

    return (
      <li className={classes.listSection} key={index}>
        <ul className={classes.ul}>
          <ListSubheader>
            {`${titles[index]} ${itemCounts ? itemCounts[index] : data.length}`}
          </ListSubheader>
          {
            data.map(item => (
              <ListItem
                button
                key={`kk${item.id}`}
                disabled={disabled}
                onClick={() => onItemClick[index](item)}
              >
                <Checkbox
                  checked={currentSelected[index].indexOf(item.id) !== -1}
                  tabIndex={-1}
                  disableRipple
                />
                <ListItemText
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
        </ul>
      </li>
    );
  }

  render() {
    const {
      classes,
      data,
    } = this.props;

    return (
      <List
        className={classes.productListContainer}
        component="nav"
        subheader={<li />}
      >
        { data.map(
          (section, index) => this.renderHeaderContent(
            section, index,
          ),
        )}
      </List>
    );
  }
}

MultiheaderCheckboxList.propTypes = {
  data: PropTypes.array.isRequired,
  titles: PropTypes.array.isRequired,
  currentSelected: PropTypes.array.isRequired,
  onItemClick: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
  secondaryAction: PropTypes.func,
  selectedWithSecondaryId: PropTypes.number,
  itemCounts: PropTypes.array,
};

MultiheaderCheckboxList.defaultProps = {
  disabled: false,
  secondaryAction: null,
  selectedWithSecondaryId: 0,
  itemCounts: null,
};

export default withStyles(styles)(MultiheaderCheckboxList);
