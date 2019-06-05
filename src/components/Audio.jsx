import React from "react";

const Audio = function() {
  class AudioPlayer extends React.Component {
    render() {
      const { forwardedRef } = this.props;
      return (
        <audio
          ref={forwardedRef}
          src="https://boogie-woogie-banana.s3-ap-northeast-1.amazonaws.com/radio_taiso.mp3"
          controls
          autoPlay
        />
      );
    }
  }

  return React.forwardRef((props, ref) => {
    return <AudioPlayer forwardRef={ref} />;
  });
};

export default Audio();
// export const Audio = React.forwardRef((props, ref) => (
//   <audio
//     ref={ref}
//     src="https://boogie-woogie-banana.s3-ap-northeast-1.amazonaws.com/radio_taiso.mp3"
//     controls
//   />
// ));

// function logProps(Component) {
//   class LogProps extends React.Component {
//     componentDidUpdate(prevProps) {
//       console.log('old props:', prevProps);
//       console.log('new props:', this.props);
//     }

//     render() {
//       const {forwardedRef, ...rest} = this.props;

//       // Assign the custom prop "forwardedRef" as a ref
//       return <Component ref={forwardedRef} {...rest} />;
//     }
//   }

//   // Note the second param "ref" provided by React.forwardRef.
//   // We can pass it along to LogProps as a regular prop, e.g. "forwardedRef"
//   // And it can then be attached to the Component.
//   return React.forwardRef((props, ref) => {
//     return <LogProps {...props} forwardedRef={ref} />;
//   });
// }
