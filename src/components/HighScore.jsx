import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import { AutoSizer, Column, Table } from "react-virtualized";
import axios from 'axios'
import Score from "../components/Score"
import {connect} from 'react-redux'
import Loading from './Loading'



const styles = theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  flexContainer: {
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box"
  },
  tableRow: {
    cursor: "pointer"
  },
  tableRowHover: {
    "&:hover": {
      backgroundColor: theme.palette.grey[200]
    }
  },
  tableCell: {
    flex: 1
  },
  noClick: {
    cursor: "initial"
  }
});

class MuiVirtualizedTable extends React.PureComponent {
  static defaultProps = {
    headerHeight: 48,
    rowHeight: 48
  };
  
  getRowClassName = ({ index }) => {
    const { classes, onRowClick } = this.props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null
    });
  };

  cellRenderer = ({ cellData, columnIndex }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;
    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={
          (columnIndex != null && columns[columnIndex].numeric) || false
            ? "right"
            : "left"
        }
      >
        {cellData}
      </TableCell>
    );
  };

  headerRenderer = ({ label, columnIndex }) => {
    const { headerHeight, columns, classes } = this.props;

    return (
      <TableCell
        component="div"
        className={clsx(
          classes.tableCell,
          classes.flexContainer,
          classes.noClick
        )}
        variant="head"
        style={{ backgroundColor: "#FA7F2D", height: headerHeight }}
        align={columns[columnIndex].numeric || false ? "right" : "left"}
      >
        <span>{label}</span>
      </TableCell>
    );
  };

  render() {
    const { classes, columns, ...tableProps } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            height={height}
            width={width}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(({ dataKey, ...other }, index) => {
              return (
                <Column
                  key={dataKey}
                  headerRenderer={headerProps =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index
                    })
                  }
                  className={classes.flexContainer}
                  cellRenderer={this.cellRenderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowHeight: PropTypes.number
};

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

// ---
//dummy data
// const sample = [
//   ["picUrl", "Florin Mavroian", 100000],
//   ["picUrl", "Johannes Jarbratt", 237],
//   ["picUrl", "Eclair", 18],
//   ["picUrl", "Cupcake", 2108],
//   ["picUrl", "Gingerbread", 2323]
// ];

// function createData(id, picture, name, score) {
//   return { id, picture, name, score };
// }
// const rows = [];

// for (let i = 0; i < 11; i += 1) {
//   //11shold be change to friendsList lenght
//   const randomSelection = sample[Math.floor(Math.random() * sample.length)];
//   rows.push(createData(i, ...randomSelection));
// }

class  HighShcore extends Component {
  constructor(props){
    super(props)
    this.state = {
      scoreList : -1
    }
  }
  fetchUsersScores=()=>{
    console.log(this.props)
    axios
    .get(`
      https://boogie-banana.herokuapp.com/api/scores/${this.props.songSelected}/${this.props.moveSelected}/`
    )
    .then(data => {
      this.setState({ scoreList: data.data });
    });
  }
  componentDidMount() {
   this.fetchUsersScores()
  }
  isDataFetched = () =>{
    if(this.state.scoreList === -1){
      return (
        <Loading/>
      )
    } 
    return(<Paper style={{margin:50,marginTop: 20,height: 460, width: "29%" }}>
    <VirtualizedTable
      rowCount={this.state.scoreList.length}
      rowGetter={({ index }) => this.state.scoreList[index]}
      columns={[
        
        {
          width: 100,
          label: "moveID",
          dataKey: "moveId"
        },
        {
          width: 200,
          label: "user",
          dataKey: "user"
          //numeric: true,
        },
        {
          width: 120,
          label: "Score",
          dataKey: "score",
          numeric: true
        }
      ]}
    />
  </Paper>

  )
  }
 render(){ 
    return (
      this.isDataFetched()
    )
  }
}
const mapStateToProps = state => {
  return {
    currentScore: state.currentScore,
    songSelected: state.songSelected,
    moveSelected: state.moveSelected
  };
};

export default connect(mapStateToProps)(HighShcore)