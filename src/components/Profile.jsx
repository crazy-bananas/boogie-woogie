import React from "react";
import Avatar from "@material-ui/core/Avatar";
// import Button from "@material-ui/core/Button";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
// import Link from "@material-ui/core/Link";
// import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
//import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import bananaImage from "../images/bananaProfile.jpeg";
import Card from "@material-ui/core/Card";
//import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import "../styles/profile.css";
//import { textAlign } from "@material-ui/system";
import lifecycle from 'react-pure-lifecycle';

const methods = {
  componentDidMount(props) {
    console.log('I mounted! Here are my props: ', props);
  }
};

const useStyles = makeStyles({
  myCard:{
    height:500,
    width:"75%"
  },
  wrapper:{
    marginTop:30,
    display: "flex",
  flexFlow: "row wrap"
  },
  cardBox: {
    textAlign: "center"
  },
  friendBox: {
    marginLeft: "15%;"
  },
  // friends: {
  //   marginTop: "15%"
  // },
  p: {
    fontWeight: "bold"
  },

  avatar: {
    width: 70,
    height: 70
  },
  bigAvatar: {
    margin: 10,
    width: 200,
    height: 200
  },
  card: {
    minWidth: 150,
    margin: 10,
    overflow: "auto",
    whiteSpace: "nowrap"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

function Profile(props) {
  const classes = useStyles();

  return (
    <Container className={classes.wrapper} >
      <Box flexDirection="col">
        <Avatar
          alt="Remy Sharp"
          src={bananaImage}
          className={classes.bigAvatar}
        />

        <Typography variant="h6" gutterBottom>
          Anna Banana
        </Typography>
        <Typography variant="body2" gutterBottom>
          Email: annaB@example.com
        </Typography>
        <p className={classes.p}> Overall Score : 298,40182 Points</p>
      </Box>
      <Card className={classes.myCard}>
        <CardContent className={classes.cardBox}>
          
        </CardContent>
      </Card>

      <footer
        className={classes.friends}
      >
        <Card className={classes.card}>
          <CardContent>
            <Box display="flex" flexDirection="row">
              <Card className={classes.card}>
                <CardContent className={classes.cardBox}>
                  <Box className={classes.friendBox}>
                    <Avatar
                      alt="Remy Sharp"
                      src={bananaImage}
                      className={classes.avatar}
                    />
                  </Box>
                  <p>Jhonny Banana</p>
                </CardContent>
              </Card>
              <Card className={classes.card}>
                <CardContent className={classes.cardBox}>
                  <Box className={classes.friendBox}>
                    <Avatar
                      alt="Remy Sharp"
                      src={bananaImage}
                      className={classes.avatar}
                    />
                  </Box>
                  <p>Jhonny Banana</p>
                </CardContent>
              </Card>
              <Card className={classes.card}>
                <CardContent className={classes.cardBox}>
                  <Box className={classes.friendBox}>
                    <Avatar
                      alt="Remy Sharp"
                      src={bananaImage}
                      className={classes.avatar}
                    />
                  </Box>
                  <p>Jhonny Banana</p>
                </CardContent>
              </Card>
              <Card className={classes.card}>
                <CardContent className={classes.cardBox}>
                  <Box className={classes.friendBox}>
                    <Avatar
                      alt="Remy Sharp"
                      src={bananaImage}
                      className={classes.avatar}
                    />
                  </Box>
                  <p>Jhonny Banana</p>
                </CardContent>
              </Card>
              <Card className={classes.card}>
                <CardContent className={classes.cardBox}>
                  <Box className={classes.friendBox}>
                    <Avatar
                      alt="Remy Sharp"
                      src={bananaImage}
                      className={classes.avatar}
                    />
                  </Box>
                  <p>Jhonny Banana</p>
                </CardContent>
              </Card>
              <Card className={classes.card}>
                <CardContent className={classes.cardBox}>
                  <Box className={classes.friendBox}>
                    <Avatar
                      alt="Remy Sharp"
                      src={bananaImage}
                      className={classes.avatar}
                    />
                  </Box>
                  <p>Jhonny Banana</p>
                </CardContent>
              </Card>
              <Card className={classes.card}>
                <CardContent className={classes.cardBox}>
                  <Box className={classes.friendBox}>
                    <Avatar
                      alt="Remy Sharp"
                      src={bananaImage}
                      className={classes.avatar}
                    />
                  </Box>
                  <p>Jhonny Banana</p>
                </CardContent>
              </Card>
            </Box>
          </CardContent>
        </Card>
      </footer>
    </Container>
  );
}
export default lifecycle(methods)(Profile);