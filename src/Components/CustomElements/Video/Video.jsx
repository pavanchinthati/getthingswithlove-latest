
import React from 'react'
import { useSelector } from 'react-redux';

const Video = React.memo((props) => {
    const { src, alt, style, className, id, autoPlay = "autoplay", loop = "loop", muted = "muted"} = props;
  
    return (
        <video
            id={id}
            src={src}
            className={`${className}`}
            style={{
                ...style,
            }}
            autoPlay={autoPlay}
            muted={muted}
            loop={loop}
        />
    )
});

export default Video;
