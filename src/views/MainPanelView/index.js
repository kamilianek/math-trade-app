import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MainContainer from '../../components/MainContainer';
import EditionsTable from '../../components/EditionsTable';

const styles = theme => ({
  mainContainer: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 10,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 1300,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
});

class MainPanelView extends React.Component {
  render() {
    const { classes } = this.props;
    console.log('now inside MainPanel');
    return (
      <>
        <MainContainer />
        <div className={classes.mainContainer}>
          <Typography component="h1" variant="h2">
            Editions list
          </Typography>
          <EditionsTable />
        </div>
      </>
    );
  }
}

export default withStyles(styles)(MainPanelView);
