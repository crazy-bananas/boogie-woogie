import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);



const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2.5),
    overflowX: "auto",
    height:500
  },
  bigAvatar: {
    margin: 10,
    width: 35,
    height: 35
  },
  table: {
    width: 500,
  }
}));

export default function CustomizedTables(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead >
          <TableRow > 
            <StyledTableCell  align="left"></StyledTableCell>
            <StyledTableCell >Name</StyledTableCell>
            <StyledTableCell >Score</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.scoreList.map(row => (
            <StyledTableRow key={row.name}>
              <StyledTableCell align="left">
                <Avatar
                  style={{}}
                  alt="Profile Picture"
                  src={row.pic}
                  className={classes.bigAvatar}
                />
              </StyledTableCell>
              <StyledTableCell align="left">{row.user}</StyledTableCell>
              <StyledTableCell align="left">{row.score}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
