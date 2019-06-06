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
    this.matchingPosition = [
      {
        nose: {
          x: 350,
          y: 300
        }
      }
    ];
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

  render() {
    const imageScaleFactor = 0.7;
    const outputStride = 16;

    const recordPose = pose => {
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
      // const canvas = document.getElementById("canvas");
      // const ctx = canvas.getContext("2d");
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
          recordPose(pose);
          this.savePose = false;
        }

        if (!this.props.isUserReady) {
          this.drawPoint(this.matchingPosition[0].nose, this.ctx);
          const latestCatch = {};
          for (let index = 0; index < pose.keypoints.length; index++) {
            const part = pose.keypoints[index].part;
            latestCatch[part] = {};
            latestCatch[part].x = pose.keypoints[index].position.x;
            latestCatch[part].y = pose.keypoints[index].position.y;
            latestCatch[part].score = pose.keypoints[index].score;
          }

          isMatched(latestCatch);

          for (const part in latestCatch) {
            // this.drawPoint(latestCatch[part], this.ctx);
          }
        }

        requestAnimationFrame(poseDetectionFrame);
      };

      poseDetectionFrame();
    };

    const isMatched = currentPosition => {
      if (
        this.matchingPosition[0].nose.x <=
          Math.round(currentPosition.nose.x) + 30 &&
        this.matchingPosition[0].nose.x >=
          Math.round(currentPosition.nose.x) - 30 &&
        this.matchingPosition[0].nose.y <=
          Math.round(currentPosition.nose.y) + 30 &&
        this.matchingPosition[0].nose.y >=
          Math.round(currentPosition.nose.y) - 30
      ) {
        this.a = this.displayCorrectPoses();
        this.props.userIsReady();
      }
    };

    return (
      <div>
        {this.props.isUserReady && <div>Dance Starting</div>}
        {!this.props.isUserReady && (
          <div>Match your position to indicated position</div>
        )}
        <video
          id="video"
          width="800px"
          height="600px"
          autoPlay="1"
          style={{ position: "absolute" }}
        />
        <canvas
          id="canvas"
          width="800px"
          height="600px"
          style={{ position: "absolute" }}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isUserReady: state.isUserReady,
    isDanceFinished: state.isDanceFinished
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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoWindow);
