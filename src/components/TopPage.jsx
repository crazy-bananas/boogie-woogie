import React, { Component } from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import "../styles/topPage.css";
import { makeStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import playImage from "../images/WMpic/16873098-active-jumping-and-dancing-young-woman-abstract-music-banner-.jpg";
import record from "../images/WMpic/4788200-turntable-loudspeakers-on-grunge-rainbow-background.jpg";
import playButton from "../images/WMpic/imageedit_8_7907633207.gif";
import recordButton from "../images/WMpic/imageedit_1_4274330351.png";

// const images = [
//   {
//     url: playImage,
//     title: "Play",
//     width: 500,
//     height: 500,
//     link: "/play"
//   },
//   {
//     url:record,
//     title: "Record",
//     width: 500,
//     height: 500,
//     link: "/record"
//   }
// ];

// const useStyles = makeStyles(theme => ({
//   root: {
//     display: "flex",
//     flexWrap: "wrap",
//     minWidth: 300,
//     width: "100%",
//     position: "fixed",
//     bottom: 0,
//     alignItems: "center",
//     justifyContent: "center"
//   },
//   image: {
//     alignSelf: "flex-end",
//     position: "relative",
//     height: 200,
//     [theme.breakpoints.down("xs")]: {
//       width: "100% !important", // Overrides inline-style
//       height: 100
//     },
//     "&:hover, &$focusVisible": {
//       zIndex: 1,
//       "& $imageBackdrop": {
//         opacity: 0.04
//       },
//       "& $imageMarked": {
//         opacity: 0
//       },
//       "& $imageTitle": {
//         border: "4px solid currentColor"
//       }
//     }
//   },
//   focusVisible: {},
//   imageButton: {
//     position: "absolute",
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     color: theme.palette.common.white
//   },
//   imageSrc: {
//     position: "absolute",
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0,
//     backgroundSize: "contain",
//     backgroundRepeat:"no-repeat",
//     backgroundPosition: "center 30%"
//   },
//   imageBackdrop: {
//     position: "absolute",
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0,
//     backgroundColor: "white",
//     opacity: 0.4,
//     transition: theme.transitions.create("opacity")
//   },
//   imageTitle: {
//     position: "relative",
//     padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) +
//       6}px`,
//     fontSize: "40px",
//     color: "white"
//   },
//   imageMarked: {
//     height: 3,
//     width: 18,
//     backgroundColor: "theme.palette.common.white",
//     position: "absolute",
//     bottom: -2,
//     left: "calc(50% - 9px)",
//     transition: theme.transitions.create("opacity")
//   }
// }));

export default function ButtonBases() {
  // const classes = useStyles();

  // return (
  //   <div
  //     style={{
  //       background:"white",
  //       display: "flex",
  //       height: "100vh"
  //     }}
  //   >
  //     <div
  //       style={{
  //         width: "100%",
  //         height: "50vh",
  //         display: "flex",
  //         alignItems: "center",
  //         justifyContent: "center"
  //       }}
  //     >
  //       <Paper style={{ padding: "20px" }}>
  //         <Typography variant="h5" component="h3">
  //           This is a sheet of paper.
  //         </Typography>
  //         <Typography component="p">
  //           Paper can be used to build surface or other elements for your
  //           application.
  //         </Typography>
  //       </Paper>
  //     </div>
  //     <div className={classes.root}>
  //         <Link
  //           to={images[0].link}
  //           focusRipple
  //           className={classes.image}
  //           focusVisibleClassName={classes.focusVisible}
  //           style={{
  //             width: images[0].width,
  //             height: images[0].height
  //           }}
  //         >
  //           <ButtonBase
  //             focusRipple
  //             key={images[0].title}
  //             className={classes.image}
  //             focusVisibleClassName={classes.focusVisible}
  //             style={{
  //               width: "100%",
  //               height: images[0].height
  //             }}
  //           >
  //             <span
  //               className={classes.imageSrc}
  //               style={{
  //                 backgroundImage: `url(${images[0].url})`
  //               }}
  //             />
  //             <span className={classes.imageBackdrop} />
  //             <span className={classes.imageButton}>
  //               <Typography
  //                 component="span"
  //                 variant="subtitle1"
  //                 color="inherit"
  //                 className={classes.imageTitle}
  //               >
  //                 {images[0].title}
  //                 <span className={classes.imageMarked} />
  //               </Typography>
  //             </span>
  //           </ButtonBase>
  //         </Link>
  //         <Link
  //           to={images[1].link}
  //           focusRipple
  //           className={classes.image}
  //           focusVisibleClassName={classes.focusVisible}
  //           style={{
  //             width: images[1].width,
  //             height: images[1].height
  //           }}
  //         >
  //           <ButtonBase
  //             focusRipple
  //             key={images[1].title}
  //             className={classes.image}
  //             focusVisibleClassName={classes.focusVisible}
  //             style={{
  //               width: "100%",
  //               height: images[1].height
  //             }}
  //           >
  //             <span
  //               className={classes.imageSrc}
  //               style={{
  //                 backgroundImage: `url(${images[1].url})`
  //               }}
  //             />
  //             <span className={classes.imageBackdrop} />
  //             <span className={classes.imageButton}>
  //               <Typography
  //                 component="span"
  //                 variant="subtitle1"
  //                 color="inherit"
  //                 className={classes.imageTitle}
  //               >
  //                 {images[1].title}
  //                 <span className={classes.imageMarked} />
  //               </Typography>
  //             </span>
  //           </ButtonBase>
  //         </Link>
  //         </div>
  //   </div>
  //);
  return (
    <div className="wrapper">
      <div id="leftPic">
        <Link to="/play">
          <img
            src={playButton}
            style={{
              height: 100,
              width: 100,
              position: "absolute",
              zIndex: 1,
              left: 20,
              bottom: 20
            }}
            alt=""
          />
          <img
            style={{
              position: "absolute",
              left: 30,
              bottom: 20,
              width: 550,
              height: 500
            }}
            src={playImage}
            alt="playImage"
          />
        </Link>
      </div>
      
      <div id="rightPic">
        <Link to="/record">
          <img
            src={recordButton}
            style={{
              height: 120,
              width: 150,
              position: "absolute",
              zIndex: 1,
              right: "0%",
              bottom: "0%"
            }}
            alt=""
          />
          <img 
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              width: 550,
              height: 500
            }}
            src={record}
            alt="record"
          />
        </Link>
      </div>
      
        <p id="middleText">Record dance moves <br/>to your favorite Youtube Video <br/>and get scored  </p>
     
    </div>
  );
}
