import { Box } from '@material-ui/core';
import React from 'react'

interface IEllipsisWrapper {
    children: React.ReactNode,
    breakWidth: number,
}

function EllipsisWrapper({
    children,
    breakWidth = 160,
    ...props
}: IEllipsisWrapper) {

    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, props);
        }
        return child;
    });


    return (
        <Box
            width={breakWidth}
            overflow="hidden"
            display="inline-block"
            textOverflow="ellipsis"
        >
            {childrenWithProps}
        </Box>
    );
}

export default EllipsisWrapper;