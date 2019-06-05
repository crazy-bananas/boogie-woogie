import React, { Component } from "react";

export const Audio = React.forwardRef((props, ref) => (
  <audio
    ref={ref}
    src="https://boogie-woogie-banana.s3-ap-northeast-1.amazonaws.com/radio_taiso.mp3"
    controls
  />
));
