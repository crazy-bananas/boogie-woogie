import React, { Component } from "react";

export const Audio = React.forwardRef((props, ref) => (
  <audio
    ref={ref}
    src="https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"
    controls
  />
));
