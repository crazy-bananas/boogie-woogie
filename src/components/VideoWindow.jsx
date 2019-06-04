import React, { Component } from "react";
import * as posenet from '@tensorflow-models/posenet';

export class VideoWindow extends Component{
  render(){
    const imageScaleFactor = 0.2;
    const outputStride = 16;
    let savePose = false;
    const recordedPoses = [];
    setInterval(() => {
      savePose = true;
    }, 3000)

    async function bindPage() {
      const net = await posenet.load();
      let video;
      try{
        video = await loadVideo();
      } catch (e) {
        alert (e);
        return;
      }

      detectPoseInRealTime(video, net)
    }

    bindPage();

    async function setupCamera() {
      const video = document.getElementById("video");
      console.log(video);

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia( {
          "audio": false,
          "video": true
        })

        video.srcObject = stream;

        return new Promise( resolve => {
          video.onloadedmetadata = () =>{
            resolve (video);
          }
        });
      } else {
        const ErrorMessage = "This Browser Does Not Support Video Capture, Or This Device Does Not Have A Camera";
        alert (ErrorMessage);
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
        const pose = await net.estimateSinglePose(video, imageScaleFactor, flipHorizontal, outputStride);;

        ctx.clearRect(0, 0, contentWidth, contentHeight);
        ctx.save();
        ctx.scale(-1, 1);
        ctx.translate(-contentWidth, 0);
        ctx.drawImage(video, 0, 0, contentWidth, contentHeight);
        ctx.restore();

        if(savePose) {
          recordedPoses.push(pose);
          console.log(recordedPoses)
          savePose = false;
        }


        recordedPoses.forEach(pose => {
          drawWristPoint(pose.keypoints[0], ctx)
        })

        requestAnimationFrame(poseDetectionFrame);
      }

      poseDetectionFrame();
    }

    function drawWristPoint(keypoint, ctx) {
      ctx.beginPath();
      ctx.arc(keypoint.position.x, keypoint.position.y, 20, 0, 2 * Math.PI)
      ctx.fillStyle = `rgb(255,255,0)`; // TODO not hardcode color
      ctx.fill();
    }

    return (
      <div>
        <video id="video" width="800px" height="600px" autoPlay="1" style={{position: "absolute"}}></video>
        <canvas id="canvas" width="800px" height="600px" style={{position: "absolute"}}></canvas>
      </div>
    )
  }
}