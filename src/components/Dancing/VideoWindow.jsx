import React, { Component } from "react";
import { connect } from "react-redux";

import Combo from "../animation/Combo.jsx";
import * as posenet from "@tensorflow-models/posenet";
import "../../styles/videowindow.css";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import anime from "animejs";

import { drawPose } from "../canvasDrawings";

import Loading from "../Loading";

// Images for the body
import nose from "../../images/body/glasses.png";
import leftHandImg from "../../images/body/leftHand.png";
import rightHandImg from "../../images/body/rightHand.png";
import leftShoe from "../../images/body/rightShoe.png";
import rightShoe from "../../images/body/leftShoe.png";
import leftDown from "../../images/body/leftDown.png";
import leftUpper from "../../images/body/leftUpper.png";
import rightDown from "../../images/body/rightDown.png";
import rightUpper from "../../images/body/rightUpper.png";

const CancelToken = axios.CancelToken;
const cancelAxios = CancelToken.source();

export class VideoWindow extends Component {
  constructor(props) {
    super(props);

    // Posenet settings
    this.imageScaleFactor = 0.5;
    this.flipPosenetHorizontal = true;
    this.outputStride = 16;

    // Unique Refrences
    this.canvasRef = new React.createRef();
    this.videoRef = new React.createRef();
    this.leftHandRef = new React.createRef();
    this.rightHandRef = new React.createRef();
    this.noseRef = new React.createRef();
    this.leftShoeRef = new React.createRef();
    this.rightShoeRef = new React.createRef();
    this.leftUpperRef = new React.createRef();
    this.leftDownRef = new React.createRef();
    this.rightUpperRef = new React.createRef();
    this.rightDownRef = new React.createRef();

    this.bodyPartReferences = {
      leftHandRef: this.leftHandRef,
      rightHandRef: this.rightHandRef,
      leftDownRef: this.leftDownRef,
      rightDownRef: this.rightDownRef,
      leftUpperRef: this.leftUpperRef,
      rightUpperRef: this.rightUpperRef,
      noseRef: this.noseRef,
      leftShoeRef: this.leftShoeRef,
      rightShoeRef: this.rightShoeRef
    };

    this.loaded = false;
    this.ctx = "";
    this.danceIntervalStopValue = 0;
    this.indexCorrectP = 0;
    this.savePose = false;
    this.danceFinished = false;
    this.score = 0;
    this.recordedPoses = [];
    this.stream = null; // Video stream
    this.bodyParts = [
      "leftAnkle",
      // "leftEar",
      "leftElbow",
      // "leftEye",
      // "leftHip",
      "leftKnee",
      "leftShoulder",
      "leftWrist",
      "nose",
      "rightAnkle",
      // "rightEar",
      "rightElbow",
      // "rightEye",
      // "rightHip",
      "rightKnee",
      "rightShoulder",
      "rightWrist"
    ];

    this.state = {
      danceStart: false,
      score: 0,
      noseMatched: false,
      leftWristMatched: false,
      rightWristMatched: false,
      leftAnkleMatched: false,
      rightAnkleMatched: false,
      correctPoses: [],
      combo: 0,
      killRequestAnimationFrame: false
    };

    this.startPosition = {
      // Only nose and wrists are used to check starting position.
      // Others are used for drawing body and calculate angles.
      nose: {
        x: 404,
        y: 165
      },
      leftWrist: {
        x: 460,
        y: 300
      },
      rightWrist: {
        x: 340,
        y: 300
      },
      leftElbow: {
        x: 443,
        y: 255
      },
      rightElbow: {
        x: 355,
        y: 255
      },
      leftShoulder: {
        x: 437,
        y: 207
      },
      rightShoulder: {
        x: 360,
        y: 207
      },
      leftAnkle: {
        x: 420,
        y: 565
      },
      rightAnkle: {
        x: 385,
        y: 565
      },
      leftHip: {
        x: 423,
        y: 337
      },
      rightHip: {
        x: 378,
        y: 337
      },
      leftKnee: {
        x: 425,
        y: 473
      },
      rightKnee: {
        x: 380,
        y: 473
      }
    };
  }

  drawStartPosition = () => {
    drawPose(this.ctx, this.startPosition, this.bodyPartReferences);
  };

  checkIfUserIsInStartPosition = pose => {
    const latestCatch = {};

    for (let index = 0; index < pose.keypoints.length; index++) {
      const part = pose.keypoints[index].part;
      latestCatch[part] = {};
      latestCatch[part].x = Math.round(pose.keypoints[index].position.x);
      latestCatch[part].y = Math.round(pose.keypoints[index].position.y);
      latestCatch[part].score = pose.keypoints[index].score;
    }

    this.isPlayerInStartPosition(latestCatch);
  };

  drawCurrentDancePose = () => {
    if (this.indexCorrectP >= this.state.correctPoses.length - 1) {
      console.log("drawCurrentDancePose was called too many times");
      return;
    }

    drawPose(
      this.ctx,
      this.state.correctPoses[this.indexCorrectP],
      this.bodyPartReferences
    );
  };

  startIncremenrtingCorrectPose = () => {
    return setInterval(() => {
      this.savePose = true;
      if (!this.props.isRecording) {
        this.increment();
      }
    }, 100);
  };

  exportToJson(objectData) {
    let filename = "export.json";
    let contentType = "application/json;charset=utf-8;";
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      const blob = new Blob(
        [decodeURIComponent(encodeURI(JSON.stringify(objectData)))],
        { type: contentType }
      );
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      const link = document.createElement("a");
      link.download = filename;
      link.href =
        "data:" +
        contentType +
        "," +
        encodeURIComponent(JSON.stringify(objectData));
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  matchedPositions = (body, boolean) => {
    if (boolean) {
      this.props.updateCombo(this.props.combo + 1);
    } else {
      this.props.updateCombo(0);
    }

    switch (body) {
      case "nose": {
        this.setState({ noseMatched: boolean });
        break;
      }
      case "leftWrist": {
        this.setState({ leftWristMatched: boolean });
        break;
      }
      case "rightWrist": {
        this.setState({ rightWristMatched: boolean });
        break;
      }
      case "leftAnkle": {
        this.setState({ leftAnkleMatched: boolean });
        break;
      }
      case "rightAnkle": {
        this.setState({ rightAnkleMatched: boolean });
        break;
      }
      default: {
        return;
      }
    }
  };

  componentDidUpdate = () => {
    if (this.props.isCountdownFinished && this.danceIntervalStopValue === 0) {
      this.danceIntervalStopValue = this.startIncremenrtingCorrectPose();
    }

    return null;
  };

  componentDidMount() {
    bindPage().then(response => {
      this.setState({
        loaded: true
      });
    });

    if (!this.props.isRecording) {
      axios
        .get(
          `https://boogie-banana.herokuapp.com/api/moves/${this.props.moveSelected}`,
          { cancelToken: cancelAxios.token }
        )
        .then(poses => {
          this.setState({ correctPoses: poses.data[0].moves });
          let maxScore = Math.floor(
            (this.state.correctPoses.length * this.bodyParts.length) / 10
          );
          this.props.updateMaxScore(maxScore);
        })
        .catch(err => {
          if (axios.isCancel(err)) {
            console.log(
              "Axios request in VideoWindow.jsx to fetch moves was canceled.",
              err.message
            );
          } else {
            throw new Error(err.message);
          }
        });
    }

    anime.timeline({ loop: false }).add({
      targets: ".matchposition",
      scale: [15, 1],
      opacity: [0.5, 1],
      easing: "easeOutCirc",
      direction: "alternate",
      duration: 1000,
      delay: function(el, i) {
        return 1000 * i;
      }
    });

    this.ctx = this.canvasRef.current.getContext("2d");
    const detectPoseInRealTime = (video, net) => {
      const contentWidth = 800;
      const contentHeight = 600;

      const poseDetectionFrame = async () => {
        const pose = await net.estimateSinglePose(
          video,
          this.imageScaleFactor,
          this.flipPosenetHorizontal,
          this.outputStride
        );

        this.ctx.clearRect(0, 0, contentWidth, contentHeight);
        this.ctx.save();
        this.ctx.scale(-1, 1);
        this.ctx.translate(-contentWidth, 0);
        this.ctx.drawImage(video, 0, 0, contentWidth, contentHeight);
        this.ctx.restore();

        if (this.savePose) {
          this.recordPose(pose);
          this.savePose = false;
        }

        if (!this.props.isUserReady) {
          this.drawStartPosition();
          this.checkIfUserIsInStartPosition(pose);
        } else if (!this.props.isRecording) {
          this.drawCurrentDancePose();
        }

        if (!this.state.killRequestAnimationFrame) {
          requestAnimationFrame(poseDetectionFrame);
        }
      };

      poseDetectionFrame();
    };

    async function bindPage() {
      const net = await posenet.load();
      let video;
      try {
        video = await loadVideo();
      } catch (e) {
        alert(e);
        return;
      }

      detectPoseInRealTime(video, net);
    }

    const setupCamera = async () => {
      const video = this.videoRef.current;

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        this.stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: true
        });

        video.srcObject = this.stream;

        return new Promise(resolve => {
          video.onloadedmetadata = () => {
            resolve(video);
          };
        });
      } else {
        const ErrorMessage =
          "This Browser Does Not Support Video Capture, Or This Device Does Not Have A Camera";
        alert(ErrorMessage);
        return Promise.reject(ErrorMessage);
      }
    };

    const loadVideo = async () => {
      const video = await setupCamera();
      video.play();
      return video;
    };
  }

  componentWillUnmount() {
    cancelAxios.cancel("Operation canceled by the user.");
    this.setState({ killRequestAnimationFrame: true });
    this.props.updateTotalScore(this.score);
    clearInterval(this.danceIntervalStopValue);

    if (this.props.isRecording) {
      this.props.addNewMoves(this.recordedPoses);
    }
    const tracks = this.stream.getTracks();
    tracks.forEach(track => {
      track.stop();
    });
    document.body.style.background = null;
  }

  drawPoint = (keypoint, ctx, pointColor = "red") => {
    ctx.beginPath();
    ctx.arc(keypoint.x, keypoint.y, 10, 0, 2 * Math.PI);

    ctx.fillStyle = pointColor;
    ctx.fill();
  };

  increment = () => {
    if (this.state.correctPoses.length - 1 > this.indexCorrectP) {
      this.indexCorrectP++;
    }
  };

  realTimeScoring = userPose => {
    const recordIndex = this.recordedPoses.length - 1;
    const correctPose = this.state.correctPoses[recordIndex];

    if (correctPose) {
      for (let body of this.bodyParts) {
        if (
          correctPose[body].x <= Math.round(userPose[body].x) + 30 &&
          correctPose[body].x >= Math.round(userPose[body].x) - 30 &&
          correctPose[body].y <= Math.round(userPose[body].y) + 30 &&
          correctPose[body].y >= Math.round(userPose[body].y) - 30
        ) {
          this.setState({ score: this.state.score + 1 });
          this.score++; // TODO: to be deleted
          this.matchedPositions(body, true);
        } else {
          this.matchedPositions(body, false);
        }
      }
    }
  };

  recordPose = pose => {
    const correctPose = {};
    for (let index = 0; index < pose.keypoints.length; index++) {
      const part = pose.keypoints[index].part;
      correctPose[part] = {};
      correctPose[part].x = Math.round(pose.keypoints[index].position.x);
      correctPose[part].y = Math.round(pose.keypoints[index].position.y);
      correctPose[part].score = pose.keypoints[index].score;
    }
    this.recordedPoses.push(correctPose);

    if (this.recordedPoses.length % 10 === 0 && !this.props.isRecording) {
      this.realTimeScoring(correctPose);
    }
  };

  isPlayerInStartPosition = playersPosition => {
    const startPosition = this.startPosition;
    const margin = 30;
    let matchStatus = 0; // upto 4(nose, wrists, ankles)

    const isPositionWithinMargin = (
      playersBodyPartsPosition,
      correctPositionsBodyPart
    ) => {
      const correctX =
        playersBodyPartsPosition.x <= correctPositionsBodyPart.x + margin &&
        playersBodyPartsPosition.x >= correctPositionsBodyPart.x - margin;

      const correctY =
        playersBodyPartsPosition.y <= correctPositionsBodyPart.y + margin &&
        playersBodyPartsPosition.y >= correctPositionsBodyPart.y - margin;

      return correctX && correctY;
    };

    if (isPositionWithinMargin(playersPosition.nose, startPosition.nose)) {
      this.setState({ noseMatched: true });
      matchStatus++;
    } else {
      this.setState({ noseMatched: false });
    }
    if (
      isPositionWithinMargin(
        playersPosition.rightWrist,
        startPosition.rightWrist
      )
    ) {
      this.setState({ rightWristMatched: true });
      matchStatus++;
    } else {
      this.setState({ rightWristMatched: false });
    }
    if (
      isPositionWithinMargin(playersPosition.leftWrist, startPosition.leftWrist)
    ) {
      this.setState({ leftWristMatched: true });
      matchStatus++;
    } else {
      this.setState({ leftWristMatched: false });
    }

    if (matchStatus >= 2) {
      this.props.userIsReady();
      this.clearPositionStatus();
    }
  };

  clearPositionStatus() {
    this.setState({
      noseMatched: false,
      leftWristMatched: false,
      rightWristMatched: false,
      leftAnkleMatched: false,
      rightAnkleMatched: false
    });
  }

  render() {
    return (
      <div id="root">
        <div style={{ display: "none" }}>
          <img
            id="rightHand"
            ref={this.rightHandRef}
            src={rightHandImg}
            alt="right hand"
          />
          <img
            id="leftHand"
            ref={this.leftHandRef}
            src={leftHandImg}
            alt="left hand"
          />
          <img id="nose" ref={this.noseRef} src={nose} alt="nose" />
          <img id="lShoe" ref={this.leftShoeRef} src={leftShoe} alt="lshoe" />
          <img id="rShoe" ref={this.rightShoeRef} src={rightShoe} alt="rshoe" />
          <img
            id="leftUpper"
            ref={this.leftUpperRef}
            src={leftUpper}
            alt="leftUp"
          />
          <img
            id="leftDown"
            ref={this.leftDownRef}
            src={leftDown}
            alt="leftDown"
          />
          <img
            id="rightUpper"
            ref={this.rightUpperRef}
            src={rightUpper}
            alt="rightUp"
          />
          <img
            id="rightDown"
            ref={this.rightDownRef}
            src={rightDown}
            alt="rightDown"
          />
        </div>
        <div id="grid">
          <Grid container>
            <Grid item xs={2}>
              {!this.props.isUserReady && (
                <div className="message matchposition">
                  Match your position!
                </div>
              )}
              {this.props.isUserReady && !this.props.isCountdownFinished && (
                <div className="message">Ready for Dance!</div>
              )}
              {this.props.isUserReady && this.props.isCountdownFinished && (
                <div className="message">Dance!</div>
              )}
              <ul className="emoji_list">
                <li
                  className={`${
                    this.state.noseMatched ? "matched" : "unmatched"
                  }`}
                >
                  Face
                  <span role="img" aria-label="face">
                    🦄
                  </span>
                </li>
                <li
                  className={`${
                    this.state.leftWristMatched ? "matched" : "unmatched"
                  }`}
                >
                  <span role="img" aria-label="lefthand">
                    Right 🤚
                  </span>
                </li>
                <li
                  className={`${
                    this.state.rightWristMatched ? "matched" : "unmatched"
                  }`}
                >
                  <span role="img" aria-label="righthand">
                    Left ✋
                  </span>
                </li>
                <li
                  className={`${
                    this.state.leftAnkleMatched ? "matched" : "unmatched"
                  }`}
                >
                  <span role="img" aria-label="leftankle">
                    Right 👟
                  </span>
                </li>
                <li
                  className={`${
                    this.state.rightAnkleMatched ? "matched" : "unmatched"
                  }`}
                >
                  <span role="img" aria-label="rightankle">
                    Left 👟
                  </span>
                </li>
              </ul>
            </Grid>
            <Grid item xs={8}>
              <video
                id="video"
                ref={this.videoRef}
                width="800px"
                height="600px"
                autoPlay="1"
              />

              <canvas
                id="canvas"
                ref={this.canvasRef}
                width="800px"
                height="600px"
              >
                Your browser do not support the HTML5 element canvas. Please try
                to user another browswer
              </canvas>
              {!this.state.loaded && <Loading />}
              {this.props.combo > 4 && <Combo />}
            </Grid>

            <Grid item xs={2}>
              <div>
                {!this.props.isRecording && (
                  <div id="score_common">
                    <div className="current_score">Score</div>
                    <div className="score_num">
                      {this.state.score}{" "}
                      <span className="score_max">/{this.props.maxScore}</span>
                    </div>
                  </div>
                )}
                {this.props.isCountdownFinished}
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isUserReady: state.isUserReady,
    isCountdownFinished: state.isCountdownFinished,
    isAudioFinished: state.isAudioFinished,
    isRecording: state.isRecording,
    moveSelected: state.moveSelected,
    maxScore: state.maxScore,
    combo: state.combo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userIsReady: () => {
      dispatch({
        type: "USER_READY"
      });
    },
    updateMaxScore: maxScore => {
      dispatch({
        type: "UPDATE_MAXSCORE",
        maxScore
      });
    },
    updateTotalScore: score => {
      dispatch({
        type: "UPDATE_TOTAL_SCORE",
        payload: { userScore: score }
      });
    },
    updateCombo: combo => {
      dispatch({
        type: "UPDATE_COMBO",
        combo
      });
    },
    addNewMoves: moves => {
      dispatch({
        type: "ADD_NEW_MOVES",
        payload: moves
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoWindow);
