import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import podium from "../images/podiumTransparent.png";
import Fab from "@material-ui/core/Fab";
import star from "../images/star.png"

const StyledTableCell = withStyles(theme => ({
  head: {
    position:"sticky",
    top:0,
    color: theme.palette.common.black
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundImg: theme.palette.background.default
    }
  }
}))(TableRow);

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2.5),
    overflowX: "auto",
    height: 500,
    backgroundImage: `url(${podium})`,
    backgroundPositionY: 50,
    backgroundRepeat:"no-repeat"
  },
  bigAvatar: {
    margin: 10,
    width: 35,
    height: 35,
    zIndex: 2
  },
  table: {
    width: 500
  }
}));

export default function CustomizedTables(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead >
          <TableRow>
            <StyledTableCell style={{backgroundColor:"#E91E63", position:"sticky",top:0, zIndex: 2}} align="left"/>
            <StyledTableCell style={{backgroundColor:"#E91E63", position:"sticky",top:0, zIndex: 2,fontWeight:"bold"}}>Name</StyledTableCell>
            <StyledTableCell style={{backgroundColor:"#E91E63" , position:"sticky",top:0,  zIndex: 2,fontWeight:"bold"}}>Score</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.scoreList.map(row => (
            <StyledTableRow key={row.name}>
              <StyledTableCell align="left">
                <Avatar
                  style={{ zIndex: 1}}
                  alt="Profile Picture"
                  src={row.pic}
                  className={classes.bigAvatar}
                />
              </StyledTableCell>
              <StyledTableCell align="left">{row.user}</StyledTableCell>
              <StyledTableCell align="left">
                <Fab
                  size="medium"
                  style={{
                    zIndex:1,
                    backgroundImage:`url(${star})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    fontStyle: "inherit",
                    backgroundColor: "transparent",
                    boxShadow: "none"
                  }}
                  aria-label="Add"
                  className="fab"
                >
                  {row.score}
                </Fab>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
