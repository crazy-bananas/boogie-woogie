const drawNose = (ctx, noseCoordinates, references) => {
  if (!references) return;

  const height = 70;
  const width = 70;
  const x = noseCoordinates.x - 30;
  const y = noseCoordinates.y - 50;

  ctx.drawImage(references, x, y, height, width);
};

const drawHand = (ctx, wrist, elbow, hand) => {
  if (!hand) return;

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
  if (!leftAnkleImg && !rightAnkleImg) return;

  const height = 50;
  const width = 75;
  const lX = leftAnkle.x;
  const lY = leftAnkle.y - 20;
  const rX = rightAnkle.x - 50;
  const rY = rightAnkle.y - 20;
  ctx.drawImage(leftAnkleImg, lX, lY, height, width);
  ctx.drawImage(rightAnkleImg, rX, rY, height, width);
};

function getDistance(a, b) {
  const distX = a.x - b.x;
  const distY = a.y - b.y;
  return Math.sqrt(distX ** 2 + distY ** 2);
}

const drawLimb = (ctx, elbow, wrist, limb) => {
  if (elbow.score < 0.7 || wrist.score < 0.7) {
    return;
  }

  if (!limb) return;

  let c = getDistance(elbow, wrist);
  let d = Math.sqrt(
    Math.pow(elbow.x - wrist.x, 2) + Math.pow(elbow.y + c - wrist.y, 2)
  );
  let rotation = Math.acos(1 - Math.pow(d, 2) / (2 * Math.pow(c, 2)));
  if (wrist.x > elbow.x) {
    rotation *= -1;
  }

  let w = (limb.width * c) / limb.height;
  ctx.save();
  ctx.translate(elbow.x, elbow.y);
  ctx.rotate(rotation);
  ctx.drawImage(limb, 0, 0, w, c);
  ctx.restore();
};

const drawPose = (ctx, pose, references) => {
  drawNose(ctx, pose.nose, references.noseRef.current);

  drawHand(ctx, pose.leftWrist, pose.leftElbow, references.leftHandRef.current);

  drawHand(
    ctx,
    pose.rightWrist,
    pose.rightElbow,
    references.rightHandRef.current
  );

  drawShoes(
    ctx,
    pose.leftAnkle,
    references.leftShoeRef.current,
    pose.rightAnkle,
    references.rightShoeRef.current
  );

  // bottom arm
  drawLimb(ctx, pose.leftElbow, pose.leftWrist, references.leftDownRef.current);
  drawLimb(
    ctx,
    pose.rightElbow,
    pose.rightWrist,
    references.rightDownRef.current
  );

  // // upper arm
  drawLimb(
    ctx,
    pose.leftShoulder,
    pose.leftElbow,
    references.leftUpperRef.current
  );
  drawLimb(
    ctx,
    pose.rightShoulder,
    pose.rightElbow,
    references.rightUpperRef.current
  );

  // upper leg
  drawLimb(
    ctx,
    pose.rightHip,
    pose.rightKnee,
    references.rightUpperRef.current
  );
  drawLimb(ctx, pose.leftHip, pose.leftKnee, references.leftUpperRef.current);

  // bottom leg
  drawLimb(
    ctx,
    pose.rightKnee,
    pose.rightAnkle,
    references.rightDownRef.current
  );
  drawLimb(ctx, pose.leftKnee, pose.leftAnkle, references.leftDownRef.current);
};

module.exports = { drawHand, drawShoes, drawPose };
