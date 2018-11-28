import React, { Component } from 'react';
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


const rows = [
  { id: 'itemName', numeric: false, disablePadding: false, label: 'Item to send' },
  { id: 'senderId', numeric: true, disablePadding: false, label: 'Sender' },
  { id: 'receiverId', numeric: true, disablePadding: false, label: 'Receiver' },
  { id: 'rate', numeric: true, disablePadding: false, label: 'Rate' },
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
        </TableRow>
      </TableHead>
    );
  }
}

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 400,
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

class ResultsTable extends Component {
  constructor() {
    super();

    this.state = {
      order: 'asc',
      orderBy: 'name',
      page: 0,
      rowsNumber: 5,
    };

    this.callSorting = this.callSorting.bind(this);
    this.changePage = this.changePage.bind(this);
    this.changeRowsNumber = this.changeRowsNumber.bind(this);
  }

  callSorting(event, property) {
    const { order, orderBy } = this.state;
    let newOrder = 'desc';
    if (orderBy === property && order === 'desc') {
      newOrder = 'asc';
    }

    this.setState({ order: newOrder, orderBy: property });
  }

  changePage(event, page) {
    this.setState({ page });
  }

  changeRowsNumber(event) {
    this.setState({ rowsNumber: event.target.value });
  }

  render() {
    const {
      classes,
      results,
      onPreview,
    } = this.props;
    const {
      order,
      orderBy,
      rowsNumber,
      page,
    } = this.state;

    const emptyRows = rowsNumber - Math.min(rowsNumber, results.length - page * rowsNumber);

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
                stableSort(results, getSorting(order, orderBy))
                  .slice(page * rowsNumber, page * rowsNumber + rowsNumber)
                  .map(row => (
                    <TableRow
                      className={classes.row}
                      key={row.id}
                      hover
                      onClick={() => onPreview(row)}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                      >
                        {row.itemName}
                      </TableCell>
                      <TableCell
                        numeric
                      >
                        { row.senderId}
                      </TableCell>
                      <TableCell
                        numeric
                      >
                        { row.receiverId}
                      </TableCell>
                      <TableCell
                        numeric
                      >
                        { row.rate || 'none' }
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
          count={results.length}
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

export default withStyles(styles)(ResultsTable);
