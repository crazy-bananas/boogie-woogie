import React, { Component } from "react";
import * as posenet from "@tensorflow-models/posenet";
import "../styles/videowindow.css";
import { connect } from "react-redux";
import correctPoses from "./radioTaisoCorrectPose.json";

import leftHandImg from "../images/leftHand.png";
import rightHandImg from "../images/rightHand.svg";
import nose from "../images/glasses.svg";
import rightShoe from "../images/leftShoe.png";
import leftShoe from "../images/rightShoe.png";

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

    this.ctx = "";
    this.danceIntervalStopValue = 0;
    this.indexCorrectP = 0;
    this.savePose = false;
    this.danceFinished = false;
    this.score = 0;
    this.recordedPoses = [];
    this.stream = null; // Video stream
    this.called = true; // TODO: What is this?
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
    this.maxScore = correctPoses.length * this.bodyParts.length;
    this.state = { danceStart: false };
    // to check user's standing at right position before dancing
    this.startPosition = {
      nose: {
        x: 404,
        y: 165
      },
      leftWrist: {
        x: 460,
        // x: 618,
        y: 350
        // y: 418
      },
      rightWrist: {
        x: 356,
        y: 357
      },
      leftElbow: {
        x: 459,
        y: 303
      },
      rightElbow: {
        x: 364,
        y: 300
      },
      leftAnkle: {
        x: 415,
        y: 535
      },
      rightAnkle: {
        x: 394,
        y: 535
      }
    };
  }

  drawStartPosition = () => {
    this.drawHand(
      this.startPosition.leftWrist,
      this.startPosition.leftElbow,
      this.leftHandRef.current
    );

    this.drawHand(
      this.startPosition.rightWrist,
      this.startPosition.rightElbow,
      this.rightHandRef.current
    );

    this.drawNose(this.startPosition.nose);

    this.drawShoes(
      this.startPosition.leftAnkle,
      this.startPosition.rightAnkle
    );

    this.drawPoint(this.startPosition.leftElbow, this.ctx);
    this.drawPoint(this.startPosition.rightElbow, this.ctx);
  }

  checkIfUserIsInStartPosition = (pose) => {
    const latestCatch = {};

    for (let index = 0; index < pose.keypoints.length; index++) {
      const part = pose.keypoints[index].part;
      latestCatch[part] = {};
      latestCatch[part].x = pose.keypoints[index].position.x;
      latestCatch[part].y = pose.keypoints[index].position.y;
      latestCatch[part].score = pose.keypoints[index].score;
    }

    this.isPlayerInStartPosition(latestCatch);
  }

  drawCurrentDancePose = () => {
    if(this.indexCorrectP >= correctPoses.length - 1){
      console.log("drawCurrentDancePose was called to many times")
      return;
    }
    this.drawHand(
      correctPoses[this.indexCorrectP]["leftWrist"],
      correctPoses[this.indexCorrectP]["leftElbow"],
      this.leftHandRef.current
    );
    this.drawHand(
      correctPoses[this.indexCorrectP]["rightWrist"],
      correctPoses[this.indexCorrectP]["rightElbow"],
      this.rightHandRef.current
    );
    this.drawNose(correctPoses[this.indexCorrectP]["nose"]);
    
    this.drawShoes(
      correctPoses[this.indexCorrectP]["leftAnkle"],
      correctPoses[this.indexCorrectP]["rightAnkle"]
    );
  }

  displayCorrectPoses = () => {
    return setInterval(() => {
      this.savePose = true;
      if (!this.props.isRecording) {
        this.increment();
      }
      if (this.props.isAudioFinished) {
        this.props.danceIsFinished();
        this.calculateScore();
        this.props.updateTotalScore(this.score, this.maxScore);
        clearInterval(this.danceIntervalStopValue);
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

  componentDidUpdate = () => {
    // Added new condition "=== 0" bacause DidUpdate is called twice and was causing two interval calls.
    if (this.props.isCountdownFinished && this.danceIntervalStopValue === 0) {
      this.danceIntervalStopValue = this.displayCorrectPoses();
    }

    return null;
  };

  componentDidMount() {
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
          this.drawStartPosition()
          this.checkIfUserIsInStartPosition(pose);
        } else {
          this.drawCurrentDancePose()
        }

        requestAnimationFrame(poseDetectionFrame);
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

    bindPage();

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
    // clearInterval(this.danceIntervalStopValue); TODO: Seems this is not Necessary. Need confirmation.
    if (this.props.isRecording) {
      this.exportToJson(this.recordedPoses);
    }
    const tracks = this.stream.getTracks();
    tracks.forEach(track => {
      track.stop();
    });
  }

  drawPoint = (keypoint, ctx, pointColor = "red") => {
    ctx.beginPath();
    ctx.arc(keypoint.x, keypoint.y, 10, 0, 2 * Math.PI);

    ctx.fillStyle = pointColor;
    ctx.fill();
  };

  increment = () => {
    if (correctPoses.length - 1 > this.indexCorrectP) {
      this.indexCorrectP++;
    }
    // for (let body of this.bodyParts) {
    //   this.drawPoint(correctPoses[this.indexCorrectP][body], this.ctx);
    // }
  };

  // TODO: Update not to crash even if number of object does not match
  calculateScore = () => {
    const count =
      this.recordedPoses.length > correctPoses.length
        ? correctPoses.length - 1
        : this.recordedPoses.length - 1;
    for (let i = 0; i < count; i++) {
      // TODO: Make it check for all poses
      for (let body of this.bodyParts) {
        if (
          correctPoses[i][body].x <=
            Math.round(this.recordedPoses[i][body].x) + 30 &&
          correctPoses[i][body].x >=
            Math.round(this.recordedPoses[i][body].x) - 30 &&
          correctPoses[i][body].y <=
            Math.round(this.recordedPoses[i][body].y) + 30 &&
          correctPoses[i][body].y >=
            Math.round(this.recordedPoses[i][body].y) - 30
        ) {
          this.score++;
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
  };

  isPlayerInStartPosition = playersPosition => {
    const startPosition = this.startPosition;
    const margin = 30;

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

    for (let bodyPart in playersPosition) {
      playersPosition[bodyPart].x = Math.round(playersPosition[bodyPart].x);
      playersPosition[bodyPart].y = Math.round(playersPosition[bodyPart].y);
    }

    if (
      isPositionWithinMargin(playersPosition.nose, startPosition.nose) &&
      isPositionWithinMargin(
        playersPosition.rightWrist,
        startPosition.rightWrist
      ) &&
      isPositionWithinMargin(
        playersPosition.leftWrist,
        startPosition.leftWrist
      ) &&
      isPositionWithinMargin(
        playersPosition.rightAnkle,
        startPosition.rightAnkle
      ) &&
      isPositionWithinMargin(playersPosition.leftAnkle, startPosition.leftAnkle)
    ) {
      this.props.userIsReady();
    }
  };

  calculateHandRotationAngle(wristPosition, elbowPosition) {
    let diffX = wristPosition.x - elbowPosition.x;
    let diffY = wristPosition.y - elbowPosition.y;
    let angleCorrection = Math.PI / 2;

    if (wristPosition.x < elbowPosition.x) {
      angleCorrection += Math.PI;
    }

    const angle = Math.atan(diffY / diffX) + angleCorrection;
    return angle;
  }

  drawHand = (wrist, elbow, hand) => {
    const spacingX = 50;
    const spacingY = 50;
    const wristX = wrist.x;
    const wristY = wrist.y;

    this.ctx.save();
    this.ctx.translate(wristX, wristY); // change origin
    let rotationAngle = this.calculateHandRotationAngle(wrist, elbow);
    this.ctx.rotate(rotationAngle);
    this.ctx.translate(-wristX - 25, -wristY - 50);
    this.ctx.drawImage(hand, wristX, wristY, spacingX, spacingY);
    this.ctx.restore();
    this.ctx.save();
  };
  
  drawShoes = (leftAnkle, rightAnkle) => {
    const lShoe = this.leftShoeRef.current;
    const rShoe = this.rightShoeRef.current;

    const height = 50;
    const width = 75;
    const lX = leftAnkle.x;
    const lY = leftAnkle.y - 20;
    const rX = rightAnkle.x - 50;
    const rY = rightAnkle.y - 20;
    this.ctx.drawImage(lShoe, lX, lY, height, width);
    this.ctx.drawImage(rShoe, rX, rY, height, width);
  };

  drawNose = noseCoordinates => {
    const nose = this.noseRef.current;
    const height = 70;
    const width = 70;
    const x = noseCoordinates.x - 30;
    const y = noseCoordinates.y - 50;

    this.ctx.drawImage(nose, x, y, height, width);
  };

  render() {
    return (
      <div>
        {this.props.isUserReady && <div>Dance Starting</div>}
        {!this.props.isUserReady && (
          <div>Match your position to indicated position</div>
        )}
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
        </div>

        <video
          id="video"
          ref={this.videoRef}
          width="800px"
          height="600px"
          autoPlay="1"
        />
        <canvas id="canvas" ref={this.canvasRef} width="800px" height="600px" />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isUserReady: state.isUserReady,
    isDanceFinished: state.isDanceFinished,
    totalScore: state.totalScore,
    isCountdownFinished: state.isCountdownFinished,
    isAudioFinished: state.isAudioFinished,
    isRecording: state.isRecording
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userIsReady: () => {
      dispatch({
        type: "USER_READY"
      });
    },
    danceIsFinished: () => {
      dispatch({
        type: "DANCE_FINISHED"
      });
    },
    updateTotalScore: (score, maxScore) => {
      dispatch({
        type: "UPDATE_TOTAL_SCORE",
        payload: { userScore: score, maxScore: maxScore }
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoWindow);
