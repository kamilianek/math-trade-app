import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';


import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import RatingPanel from '../RatingPanel';

const styles = theme => ({
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  username: {
    marginBottom: theme.spacing.unit * 3,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  comments: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  comment: {
    marginTop: theme.spacing.unit * 5,
  },
});

class UserPreview extends React.Component {
  constructor() {
    super();

    this.state = {
      isExpanded: false,
    };

    this.toggleExpansionPanel = this.toggleExpansionPanel.bind(this);
  }

  toggleExpansionPanel() {
    this.setState(state => ({ isExpanded: !state.isExpanded }));
  }

  render() {
    const { isExpanded } = this.state;
    const { userData, classes, ownRate } = this.props;
    const {
      username,
      email,
      name,
      surname,
      rates,
    } = userData;

    let topRates = rates;

    if (ownRate) {
      topRates = [ownRate];
    } else if (rates.length > 10) {
      topRates = rates.slice(0, 11);
    }

    return (
      <ExpansionPanel expanded={isExpanded}>
        <ExpansionPanelSummary
          onClick={this.toggleExpansionPanel}
          expandIcon={<Icon>keyboard_arrow_down</Icon>}
        >
          <div className={classes.header}>
            <Avatar className={classes.avatar}>
              <Icon>perm_identity</Icon>
            </Avatar>
            <Typography variant="h6" gutterBottom className={classes.username}>
              { username }
            </Typography>
            <Typography variant="body2">{ `${name} ${surname}` }</Typography>
            <Typography variant="body2">{ `${email}` }</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={classes.comments}>
            { ownRate ? <Typography variant="body2">{ 'He was rated:' }</Typography> : null }
            {
              topRates.map(rate => <RatingPanel
                className={classes.comment}
                rate={rate.rate}
                rateText={rate.comment}
              />)
            }
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

UserPreview.propTypes = {
  userData: PropTypes.object,
  ownRate: PropTypes.object,
};

UserPreview.defaultProps = {
  userData: {
    username: '',
    email: '',
    name: '',
    surname: '',
    rates: [],
  },
};


export default withStyles(styles)(UserPreview);
