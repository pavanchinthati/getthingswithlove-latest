
import React, { useState, useEffect } from 'react';
import styles from "./Text.module.scss";

const Text = (props) => {
    const { style, id, className, children, onClick, positionType = "static" } = props;

    const dynamicStyles = {
        ...style,
        // ...style?.[viewMode],
    };

    return (
        <p
            id={id}
            className={`${className} ${styles.font__style}`}
            style={{
                ...dynamicStyles,
                position: positionType,
            }}
            onClick={onClick}
        >
            {children}
        </p>
    );
};

export default React.memo(Text);
