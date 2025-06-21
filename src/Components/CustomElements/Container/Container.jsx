
import React from 'react';
import { useSelector } from 'react-redux';
import containerStyles from "./Container.module.scss"

const Container = React.memo((props) => {
    const { id, className, style, children, noOfCols, noOfRows, containsGrid = false, htmlElement = "div" } = props;
    // const viewMode = useSelector(state => state.uiDetails.viewMode);

    const Tag = htmlElement;
    
    return (
        <Tag
            id={id}
            className={`${className} ${containerStyles.container}`}
            style={{
                ...style,
                // ...style?.[viewMode],
                // position: positionType,
                display: containsGrid && "grid",
                gridTemplateColumns: containsGrid && `repeat(${noOfCols},1fr)`,
                gridTemplateRows: containsGrid && `repeat(${noOfRows}, 1fr)`
            }}
        >
            {children}
        </Tag>
    );
});
export default Container;
