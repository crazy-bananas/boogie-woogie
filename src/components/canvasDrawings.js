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

module.exports = {drawHand, drawShoes}