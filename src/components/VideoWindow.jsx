import React, { Component } from "react";
import * as posenet from "@tensorflow-models/posenet";
import "../styles/videowindow.css";
import { connect } from "react-redux";
import correctPoses from "./correctPose";

export class VideoWindow extends Component {
  constructor(props) {
    super(props);
    this.canvas = "";
    this.ctx = "";
    this.a = 0;
    this.indexCorrectP = 0;
    this.savePose = false;
    //   this.userReady = false;
    this.danceFinished = false;
    this.score = 0;
    this.recordedPoses = [];
    this.bodyParts = [
      "leftAnkle",
      "leftEar",
      "leftElbow",
      "leftEye",
      "leftHip",
      "leftKnee",
      "leftShoulder",
      "leftWrist",
      "nose",
      "rightAnkle",
      "rightEar",
      "rightElbow",
      "rightEye",
      "rightHip",
      "rightKnee",
      "rightShoulder",
      "rightWrist"
    ];
    // to check user's standing at right position before dancing
    this.matchingPosition = {
      nose: {
        x: 404,
        y: 165
      },
      leftWrist: {
        x: 615,
        y: 218
      },
      rightWrist: {
        x: 203,
        y: 217
      },
      leftKnee: {
        x: 471,
        y: 519
      },
      rightKnee: {
        x: 355,
        y: 519
      }
    };
  }

  componentDidMount() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
  }

  drawPoint = (keypoint, ctx) => {
    ctx.beginPath();
    ctx.arc(keypoint.x, keypoint.y, 10, 0, 2 * Math.PI);

    ctx.fillStyle = "red"; // TODO not hardcode color
    ctx.fill();
  };

  increment = () => {
    this.indexCorrectP++;
    this.drawPoint(correctPoses[this.indexCorrectP].rightWrist, this.ctx);
    this.drawPoint(correctPoses[this.indexCorrectP].leftWrist, this.ctx);
  };

  displayCorrectPoses = () => {
    return setInterval(() => {
      this.savePose = true;
      this.increment();
      if (this.indexCorrectP >= correctPoses.length - 1) {
        this.props.danceIsFinished();
        this.calculateScore();
        this.props.updateTotalScore(this.score);
        clearInterval(this.a);
      }
    }, 500);
  };

  calculateScore = () => {
    for (let i = 0; i < 10; i++) {
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
      correctPose[part].x = pose.keypoints[index].position.x;
      correctPose[part].y = pose.keypoints[index].position.y;
      correctPose[part].score = pose.keypoints[index].score;
    }
    this.recordedPoses.push(correctPose);
  };

  isMatched = cp => {
    const mp = this.matchingPosition;
    const noseX = Math.round(cp.nose.x);
    const noseY = Math.round(cp.nose.y);
    const rWristX = Math.round(cp.rightWrist.x);
    const rWristY = Math.round(cp.rightWrist.y);
    const lWristX = Math.round(cp.leftWrist.x);
    const lWristY = Math.round(cp.leftWrist.y);
    const rKneeX = Math.round(cp.rightKnee.x);
    const rKneeY = Math.round(cp.rightKnee.y);
    const lKneeX = Math.round(cp.leftKnee.x);
    const lKneeY = Math.round(cp.leftKnee.y);
    const margin = 30;

    if (
      mp.nose.x <= noseX + margin &&
      mp.nose.x >= noseX - margin &&
      mp.nose.y <= noseY + margin &&
      mp.nose.y >= noseY - margin &&
      mp.rightWrist.x <= rWristX + margin &&
      mp.rightWrist.x >= rWristX - margin &&
      mp.rightWrist.y <= rWristY + margin &&
      mp.rightWrist.y >= rWristY - margin &&
      mp.leftWrist.x <= lWristX + margin &&
      mp.leftWrist.x >= lWristX - margin &&
      mp.leftWrist.y <= lWristY + margin &&
      mp.leftWrist.y >= lWristY - margin &&
      mp.rightKnee.x <= rKneeX + margin &&
      mp.rightKnee.x >= rKneeX - margin &&
      mp.rightKnee.y <= rKneeY + margin &&
      mp.rightKnee.y >= rKneeY - margin &&
      mp.leftKnee.x <= lKneeX + margin &&
      mp.leftKnee.x >= lKneeX - margin &&
      mp.leftKnee.y <= lKneeY + margin &&
      mp.leftKnee.y >= lKneeY - margin
    ) {
      this.a = this.displayCorrectPoses();
      this.props.userIsReady();
    }
  };

  render() {
    const imageScaleFactor = 0.7;
    const outputStride = 16;

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

    async function setupCamera() {
      const video = document.getElementById("video");

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: true
        });

        video.srcObject = stream;

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
    }

    const loadVideo = async () => {
      const video = await setupCamera();
      video.play();
      return video;
    };

    const detectPoseInRealTime = (video, net) => {
      const flipHorizontal = true;
      const contentWidth = 800;
      const contentHeight = 600;

      const poseDetectionFrame = async () => {
        const pose = await net.estimateSinglePose(
          video,
          imageScaleFactor,
          flipHorizontal,
          outputStride
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
          this.drawPoint(this.matchingPosition.nose, this.ctx);
          this.drawPoint(this.matchingPosition.leftWrist, this.ctx);
          this.drawPoint(this.matchingPosition.rightWrist, this.ctx);
          this.drawPoint(this.matchingPosition.leftKnee, this.ctx);
          this.drawPoint(this.matchingPosition.rightKnee, this.ctx);
          const latestCatch = {};
          for (let index = 0; index < pose.keypoints.length; index++) {
            const part = pose.keypoints[index].part;
            latestCatch[part] = {};
            latestCatch[part].x = pose.keypoints[index].position.x;
            latestCatch[part].y = pose.keypoints[index].position.y;
            latestCatch[part].score = pose.keypoints[index].score;
          }
          this.isMatched(latestCatch);
        }

        requestAnimationFrame(poseDetectionFrame);
      };

      poseDetectionFrame();
    };

    return (
      <div>
        {this.props.isUserReady && <div>Dance Starting</div>}
        {!this.props.isUserReady && (
          <div>Match your position to indicated position</div>
        )}
        <video id="video" width="800px" height="600px" autoPlay="1" />
        <canvas id="canvas" width="800px" height="600px" />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isUserReady: state.isUserReady,
    isDanceFinished: state.isDanceFinished,
    totalScore: state.totalScore
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
    updateTotalScore: score => {
      dispatch({
        type: "UPDATE_TOTALSCORE",
        payload: score
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoWindow);
