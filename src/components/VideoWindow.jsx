import React, { Component } from "react";
import * as posenet from "@tensorflow-models/posenet";

export class VideoWindow extends Component {
  render() {
    const imageScaleFactor = 0.7;
    const outputStride = 16;
    let savePose = false;
    const recordedPoses = [];
    setInterval(() => {
      savePose = true;
    }, 3000);

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

    async function loadVideo() {
      const video = await setupCamera();
      video.play();
      return video;
    }

    function detectPoseInRealTime(video, net) {
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");
      const flipHorizontal = true;

      const contentWidth = 800;
      const contentHeight = 600;

      async function poseDetectionFrame() {
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
          console.log(recordedPoses);
          savePose = false;
        }

        // for (const pose of recordedPoses) {
        //   for (const part in pose) {
        //     drawPoint(pose[part], ctx);
        //   }
        // }

        const latestCatch = {};
        for (let index = 0; index < pose.keypoints.length; index++) {
          const part = pose.keypoints[index].part;
          latestCatch[part] = {};
          latestCatch[part].x = pose.keypoints[index].position.x;
          latestCatch[part].y = pose.keypoints[index].position.y;
          latestCatch[part].score = pose.keypoints[index].score;
        }

        for (const part in latestCatch) {
          //console.log(pose)
          drawPoint(latestCatch[part], ctx);
        }

        requestAnimationFrame(poseDetectionFrame);
      }

      poseDetectionFrame();
    }

    function drawPoint(keypoint, ctx) {
      ctx.beginPath();
      ctx.arc(keypoint.x, keypoint.y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = `rgb(255,255,0)`; // TODO not hardcode color
      ctx.fill();
    }

    return (
      <div>
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
