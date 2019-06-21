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
import star from "../images/star.png";

const StyledTableCell = withStyles(theme => ({
  head: {
    background: "#E91E63",
    fontWeight: "bold",
    fontSize: "1.3em",
    color: theme.palette.common.white,
    position: "sticky",
    top: 0
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
    backgroundRepeat: "no-repeat",
    zIndex: 2
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
        <TableHead>
          <TableRow>
            <StyledTableCell align="left" />
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Score</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.scoreList
            .sort((a, b) => {
              return b.score - a.score;
            })
            .map(row => (
              <StyledTableRow key={row.name}>
                <StyledTableCell align="left">
                  <Avatar
                    style={{ zIndex: 1 }}
                    alt="Profile Picture"
                    src={row.pic}
                    className={classes.bigAvatar}
                  />
                </StyledTableCell>
                <StyledTableCell
                  stylealign="left"
                  style={{ fontSize: "1.3em" }}
                >
                  {row.user}
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Fab
                    size="medium"
                    style={{
                      zIndex: 1,
                      backgroundImage: `url(${star})`,
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
