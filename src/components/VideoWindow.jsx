import React, { Component } from "react";
import * as posenet from "@tensorflow-models/posenet";
import "../styles/videowindow.css";
import { connect } from "react-redux";
import correctPoses from "./correctPose";

export class VideoWindow extends Component {
  constructor(props) {
    super(props);
    this.userReady = false;
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

  render() {
    const imageScaleFactor = 0.7;
    const outputStride = 16;
    let savePose = false;
    const recordedPoses = [];
    let indexCorrectP = 0;
    if (this.props.userIsReady) {
      setInterval(() => {
        savePose = true;
        indexCorrectP++;
      }, 500);
    }

    function recordPose(pose) {
      const correctPose = {};
      for (let index = 0; index < pose.keypoints.length; index++) {
        const part = pose.keypoints[index].part;
        correctPose[part] = {};
        correctPose[part].x = pose.keypoints[index].position.x;
        correctPose[part].y = pose.keypoints[index].position.y;
        correctPose[part].score = pose.keypoints[index].score;
      }
      recordedPoses.push(correctPose);
    }

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

        return new Promise((resolve) => {
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
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");
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

        ctx.clearRect(0, 0, contentWidth, contentHeight);
        ctx.save();
        ctx.scale(-1, 1);
        ctx.translate(-contentWidth, 0);
        ctx.drawImage(video, 0, 0, contentWidth, contentHeight);
        ctx.restore();

        if (savePose) {
          recordPose(pose);
          savePose = false;
        }

        drawPoint(correctPoses[indexCorrectP].rightWrist, ctx);
        drawPoint(correctPoses[indexCorrectP].leftWrist, ctx);

        if (!this.props.userReady) {
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
            // drawPoint(latestCatch[part], ctx);
          }
        }

        requestAnimationFrame(poseDetectionFrame);
      };

      poseDetectionFrame();
    };

    const drawPoint = (keypoint, ctx) => {
      ctx.beginPath();
      ctx.arc(keypoint.x, keypoint.y, 20, 0, 2 * Math.PI);
      ctx.arc(
        this.matchingPosition[0].nose.x,
        this.matchingPosition[0].nose.y,
        20,
        0,
        2 * Math.PI
      );

      ctx.fillStyle = "red"; // TODO not hardcode color
      ctx.fill();
    };

    const isMatched = (currentPosition) => {
      if (
        correctPoses[indexCorrectP].rightWrist.x <=
          Math.round(currentPosition.rightWrist.x) + 30 &&
        correctPoses[indexCorrectP].rightWrist.x >=
          Math.round(currentPosition.rightWrist.x) - 30 &&
        correctPoses[indexCorrectP].rightWrist.y <=
          Math.round(currentPosition.rightWrist.y) + 30 &&
        correctPoses[indexCorrectP].rightWrist.y >=
          Math.round(currentPosition.rightWrist.y) - 30
      ) {
        console.log("Matched!!");
        this.props.userIsReady();
      }
    };

    return (
      <div>
        {this.props.userReady && <div>Dance Starting</div>}
        {!this.props.userReady && (
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
const mapStateToProps = (state) => {
  return {
    userReady: state.userReady
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userIsReady: () => {
      dispatch({
        type: "USER_READY"
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoWindow);
