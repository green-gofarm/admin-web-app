import React, { useEffect } from 'react'


interface EllipsisWrapperProps {
    children: React.ReactNode,
    onEscape?: () => void,
}


function EscapeWrapper({
    children,
    onEscape,
    ...props
}: EllipsisWrapperProps) {

    useEffect(() => {
        function listEscape(event: any) {
            if (event.key === "Escape") {
                onEscape && onEscape();
            }
        }

        document.addEventListener("keydown", listEscape);
        return () => {
            document.removeEventListener("keydown", listEscape);
        }
    }, [onEscape])

    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, props);
        }
        return child;
    });


    return <>{childrenWithProps}</>;
}

export default EscapeWrapper;