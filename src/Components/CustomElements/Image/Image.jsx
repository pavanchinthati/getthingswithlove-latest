
import React, { } from 'react'
import { useSelector} from 'react-redux';

const Image = (props) => {
    const { imgSrc, alt, style, className, id, onClick} = props;
    // const viewMode = useSelector(state => state.uiDetails.viewMode);

    return (
        <img
            id={id}
            src={imgSrc}
            alt={alt || "image"}
            className={`${className}`}
            onClick={onClick}
            style={{
                ...style,
                // ...style?.[viewMode],
            }}
            loading='lazy'
        />
    )
};

export default React.memo(Image);
