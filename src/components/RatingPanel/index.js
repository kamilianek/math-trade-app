import React from 'react';
import PropTypes from 'prop-types';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit * 2,
    float: 'right',
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  rateText: {
    marginTop: theme.spacing.unit * 3,
  }
});

class RatingPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rate: this.props.rate,
      rateText: this.props.rateText,
    };
  }

  // componentDidMount() {
  //   let newState = {};
  //
  //   if (this.props.rate) {
  //     newState = {
  //       ...newState,
  //       rate: this.props.rate,
  //     };
  //   }
  //
  //   if (this.props.rateText) {
  //     newState = {
  //       ...newState,
  //       rateText: this.props.rateText,
  //     };
  //   }
  //
  //   this.setState(newState);
  // }

  handleStarClick(rate) {
    this.setState({ rate });
  }

  render() {
    const { rate, rateText } = this.state;
    const { allowRating, starCounts, classes } = this.props;

    return (
      <div style={{ display: 'inline-block' }}>
        {
          new Array(starCounts).fill(0).map(
            (_, index) => (
              <IconButton
                color={rate >= (index + 1) ? 'primary' : 'default'}
                onClick={allowRating ? () => this.handleStarClick(index + 1) : null}
              >
                <Icon>{ (rate >= index + 1) ? 'star' : 'star_border'}</Icon>
              </IconButton>
            ),
          )
        }
        {
          allowRating ? <TextField
            className={classes.rateText}
            ref={this.nameInput}
            id="rateText"
            label="Comment this user"
            variant="outlined"
            multiline
            rows="4"
            fullWidth
            value={rateText}
            onChange={event => this.setState({ rateText: event.target.value })}
          /> : <Typography className={classes.rateText}>
            {rateText}
          </Typography>
        }
        {
          allowRating
            ? <div className={classes.sendPanel}>
                <Button variant="contained" color="primary" className={classes.button}>
                  Comment
                  <Icon className={classes.rightIcon}>send</Icon>
                </Button>
              </div> : null
        }
      </div>
    );
  }
}

RatingPanel.propTypes = {
  allowRating: PropTypes.bool,
  rate: PropTypes.number,
  starCounts: PropTypes.number,
  onRateSubmit: PropTypes.func.isRequired,
  rateText: PropTypes.string,
};

RatingPanel.defaultProps = {
  allowRating: false,
  rate: 0,
  starCounts: 5,
  rateText: '',
};


export default withStyles(styles)(RatingPanel);
