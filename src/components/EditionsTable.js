/* eslint-disable object-curly-newline */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

const rows = [
  { id: 'editionName', numeric: false, disablePadding: false, label: 'Edition Name' },
  { id: 'participants', numeric: true, disablePadding: false, label: 'Participants' },
  { id: 'limit', numeric: true, disablePadding: false, label: 'Participants Limit' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
];

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

class EditionsTableHeader extends Component {
  createSortHandler = property => (event) => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {
      order,
      orderBy,
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          {rows.map(row => (
              <TableCell
                key={row.id}
                numeric={row.numeric}
                sortDirection={orderBy === row.id ? order : false}
              >
                  <Tooltip
                    title="Sort"
                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                    enterDelay={300}
                  >
                    <TableSortLabel
                      active={orderBy === row.id}
                      direction={order}
                      onClick={this.createSortHandler(row.id)}
                    >
                      {row.label}
                    </TableSortLabel>
                  </Tooltip>
              </TableCell>
          ), this)}
          <TableCell
            key="edit"
          >
            Edit
          </TableCell>
        </TableRow>
      </TableHead>
    );
  }
}

EditionsTableHeader.propTypes = {
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  onRequestSort: PropTypes.func.isRequired,
};

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 700,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

class EditionsTable extends Component {
  constructor() {
    super();

    this.state = {
      order: 'asc',
      orderBy: 'editionName',
      page: 0,
      rowsNumber: 5,
      data: [
        { id: '12h3gj21h3', editionName: 'Abddddc123', participants: 11, limit: 28, status: 'PENDING', editable: false },
        { id: '12j3sdfiyu', editionName: 'Math99', participants: 4, limit: 16, status: 'FINISHED', editable: false },
        { id: 'kajhsd1234', editionName: 'Rule1/1', participants: 20, limit: 20, status: 'OPENED', editable: true },
      ],
    };

    this.callSorting = this.callSorting.bind(this);
  }

  callSorting(event, property) {
    let order = 'desc';
    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy: property });
  }

  changePage(event, page) {
    this.setState({ page });
  }

  changeRowsNumber(event) {
    this.setState({ rowsNumber: event.target.value });
  }

  render() {
    const { classes } = this.props;
    const {
      data,
      order,
      orderBy,
      rowsNumber,
      page,
    } = this.state;

    const emptyRows = rowsNumber - Math.min(rowsNumber, data.length - page * rowsNumber);

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
          >
            <EditionsTableHeader
              order={order}
              orderBy={orderBy}
              onRequestSort={this.callSorting}
            />
            <TableBody>
              {
                stableSort(data, getSorting(order, orderBy))
                  .slice(page * rowsNumber, page * rowsNumber + rowsNumber)
                  .map(row => (
                    <TableRow
                      className={classes.row}
                      onClick={() => console.log('clicked edition with id: ', row.id)}
                      key={row.id}
                      hover
                    >
                      <TableCell component="th" scope="row">{row.editionName}</TableCell>
                      <TableCell numeric>{row.participants}</TableCell>
                      <TableCell numeric>{row.limit}</TableCell>
                      <TableCell>{row.status}</TableCell>
                      <TableCell>
                        <IconButton
                          key="edit"
                          color="inherit"
                          onClick={() => console.log('edit edition with id: ', row.id)}
                        >
                          <Icon className={classes.icon}>settings</Icon>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
              }
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsNumber}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.changePage}
          onChangeRowsPerPage={this.changeRowsNumber}
        />
      </Paper>
    );
  }
}


EditionsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditionsTable);
