
import React from 'react'
import { useSelector, useStore } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Button = React.memo((props) => {
    const { id, style, className, children, href, positionType = "static" } = props;
    // const viewMode = useSelector(state => state.uiDetails.viewMode);
    const history = useHistory();
    const store = useStore();

    function handleOnClick(e) {
        e.stopPropagation();
        e.preventDefault();
        const state = store.getState();
        const tenantId = state.tenantDetails.tenantId;
        let cleanedHref = href;
        if (cleanedHref?.[0] === "/") {
            cleanedHref = cleanedHref.slice(1);
        }
        history.push(href);
    }
    return (
        <button
            id={id}
            className={className}
            style={{
                position: positionType,
                ...style,
                // ...style?.[viewMode],
            }}
            onClick={handleOnClick}
        >
            {children}
        </button>
    )
});

export default Button
