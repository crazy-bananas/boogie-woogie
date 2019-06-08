import React, { Component } from "react";
import * as posenet from "@tensorflow-models/posenet";
import "../styles/videowindow.css";
import { connect } from "react-redux";
import correctPoses from "./correctPose";
export class VideoWindow extends Component {
  constructor(props) {
    super(props);

    // Posenet settings
    this.imageScaleFactor = 0.7;
    this.flipPosenetHorizontal = true;
    this.outputStride = 16;

    // Other
    this.canvasRef = new React.createRef();
    this.videoRef = new React.createRef();
    this.ctx = "";
    this.danceIntervalStopValue = 0;
    this.indexCorrectP = 0;
    this.savePose = false;
    this.danceFinished = false;
    this.score = 0;
    this.recordedPoses = [];
    this.stream = null; // Video stream
    this.called = true;
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
    this.state = { danceStart: false };
    // to check user's standing at right position before dancing
    this.startPosition = {
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

  displayCorrectPoses = () => {
    return setInterval(() => {
      this.savePose = true;
      // Commented out to record user's movement
      // this.increment();
      if (this.props.isAudioFinished) {
        this.props.danceIsFinished();
        // Commented out to record user's movement
        // this.calculateScore();
        this.props.updateTotalScore(this.score);
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
      link.href = "data:" + contentType + "," + encodeURIComponent(JSON.stringify(objectData));
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  componentDidUpdate = () => {
    if (this.props.isCountdownFinished) {
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

        this.drawPoint(pose.keypoints["0"].position, this.ctx, "blue");
        this.drawPoint(pose.keypoints["9"].position, this.ctx, "blue");
        this.drawPoint(pose.keypoints["10"].position, this.ctx, "blue");
        this.drawPoint(pose.keypoints["13"].position, this.ctx, "blue");
        this.drawPoint(pose.keypoints["14"].position, this.ctx, "blue");

        if (!this.props.isUserReady) {
          for (let bodyPart in this.startPosition) {
            this.drawPoint(this.startPosition[bodyPart], this.ctx)
          }
          
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

        requestAnimationFrame(poseDetectionFrame);
      };

      poseDetectionFrame();
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
    clearInterval(this.danceIntervalStopValue);
    this.exportToJson(this.recordedPoses);
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
    this.indexCorrectP++;
    this.drawPoint(correctPoses[this.indexCorrectP].rightWrist, this.ctx);
    this.drawPoint(correctPoses[this.indexCorrectP].leftWrist, this.ctx);
  };

  // TODO: Update not to crash even if number of object does not match
  calculateScore = () => {
    for (let i = 0; i < this.recordedPoses.length; i++) {
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
      correctPose[part].x = pose.keypoints[index].position.x;
      correctPose[part].y = pose.keypoints[index].position.y;
      correctPose[part].score = pose.keypoints[index].score;
    }
    this.recordedPoses.push(correctPose);
  };

  isPlayerInStartPosition = playersPosition => {
    const startPosition = this.startPosition;
    const margin = 30;

    const isPositionWithinMargin = (playersBodyPartsPosition, correctPositionsBodyPart) => {
      const correctX = playersBodyPartsPosition.x <= correctPositionsBodyPart.x + margin &&
      playersBodyPartsPosition.x >= correctPositionsBodyPart.x - margin;

      const correctY = playersBodyPartsPosition.y <= correctPositionsBodyPart.y + margin &&
      playersBodyPartsPosition.y >= correctPositionsBodyPart.y - margin;

      return correctX && correctY;
    }

    for(let bodyPart in playersPosition) {
      playersPosition[bodyPart].x = Math.round(playersPosition[bodyPart].x)
      playersPosition[bodyPart].y = Math.round(playersPosition[bodyPart].y)
    }

    if (
      isPositionWithinMargin(playersPosition.nose, startPosition.nose)
      && isPositionWithinMargin(playersPosition.rightWrist, startPosition.rightWrist)
      && isPositionWithinMargin(playersPosition.leftWrist, startPosition.leftWrist)
      && isPositionWithinMargin(playersPosition.rightKnee, startPosition.rightKnee)
      && isPositionWithinMargin(playersPosition.leftKnee, startPosition.leftKnee)
    ) {
      this.props.userIsReady();
    }
  };

  render() {
    return (
      <div>
        {this.props.isUserReady && <div>Dance Starting</div>}
        {!this.props.isUserReady && (
          <div>Match your position to indicated position</div>
        )}
        <video id="video" ref={this.videoRef} width="800px" height="600px" autoPlay="1" />
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
    isAudioFinished: state.isAudioFinished
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
