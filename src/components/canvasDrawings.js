const drawHand = (ctx, wrist, elbow, hand) => {
  const spacingX = 50;
  const spacingY = 50;
  const wristX = wrist.x;
  const wristY = wrist.y;

  ctx.save();
  ctx.translate(wristX, wristY); // change origin
  let rotationAngle = calculateHandRotationAngle(wrist, elbow);
  ctx.rotate(rotationAngle);
  ctx.translate(-wristX - 25, -wristY - 50);
  ctx.drawImage(hand, wristX, wristY, spacingX, spacingY);
  ctx.restore();
};

function calculateHandRotationAngle(wristPosition, elbowPosition) {
  let diffX = wristPosition.x - elbowPosition.x;
  let diffY = wristPosition.y - elbowPosition.y;
  let angleCorrection = Math.PI / 2;

  if (wristPosition.x < elbowPosition.x) {
    angleCorrection += Math.PI;
  }

  return Math.atan(diffY / diffX) + angleCorrection;
}

const drawShoes = (ctx, leftAnkle, leftAnkleImg, rightAnkle, rightAnkleImg) => {
  const height = 50;
  const width = 75;
  const lX = leftAnkle.x;
  const lY = leftAnkle.y - 20;
  const rX = rightAnkle.x - 50;
  const rY = rightAnkle.y - 20;
  ctx.drawImage(leftAnkleImg, lX, lY, height, width);
  ctx.drawImage(rightAnkleImg, rX, rY, height, width);
};

const drawNose = (ctx, noseCoordinates, references) => {
  if (!references) return;
  const height = 70;
  const width = 70;
  const x = noseCoordinates.x - 30;
  const y = noseCoordinates.y - 50;

  ctx.drawImage(references, x, y, height, width);
};

const drawPose = (ctx, pose, references) => {
  drawNose(ctx, pose.nose, references.noseRef.current);

  drawHand(
    ctx,
    pose.leftWrist,
    pose.leftElbow,
    references.leftHandRef.current
  );

  drawHand(
    ctx,
    pose.rightWrist,
    pose.rightElbow,
    references.rightHandRef.current
  );

  console.log("the pose", pose);
  drawShoes(
    ctx, 
    pose.leftAnkle, 
    references.leftShoeRef.current, 
    pose.rightAnkle, 
    references.rightShoeRef.current);

  // bottom arm
  // drawLimb(
  //   pose["leftElbow"],
  //   pose["leftWrist"],
  //   references.leftDownRef.current
  // );
  // drawLimb(
  //   pose["rightElbow"],
  //   pose["rightWrist"],
  //   references.rightDownRef.current
  // );

  // // upper arm
  // drawLimb(
  //   pose["leftShoulder"],
  //   pose["leftElbow"],
  //   references.leftUpperRef.current
  // );
  // drawLimb(
  //   pose["rightShoulder"],
  //   pose["rightElbow"],
  //   references.rightUpperRef.current
  // );

  // // upper leg
  // drawLimb(
  //   pose["rightHip"],
  //   pose["rightKnee"],
  //   references.rightUpperRef.current
  // );
  // drawLimb(
  //   pose["leftHip"],
  //   pose["leftKnee"],
  //   references.leftUpperRef.current
  // );

  // // bottom leg
  // drawLimb(
  //   pose["rightKnee"],
  //   pose["rightAnkle"],
  //   references.rightDownRef.current
  // );
  // drawLimb(
  //   pose["leftKnee"],
  //   pose["leftAnkle"],
  //   references.leftDownRef.current
  // );


};

module.exports = {drawHand, drawShoes, drawPose}