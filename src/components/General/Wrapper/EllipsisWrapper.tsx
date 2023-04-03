import { Box } from "@mui/material";
import React from "react";

interface IEllipsisWrapper {
    children: React.ReactNode,
    breakWidth?: number,
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
            whiteSpace="nowrap"
        >
            {childrenWithProps}
        </Box>
    );
}

export default EllipsisWrapper;