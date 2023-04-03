import React, { ReactNode } from "react";

interface IConditionWrapper {
    isRender?: boolean | null,
    children: ReactNode,
}

function ConditionWrapper({ isRender, children, ...props }: IConditionWrapper) {

    if (!isRender) {
        return null;
    }

    return <>
        {React.Children.map(children, child => {
            if (React.isValidElement(child)) {
                return React.cloneElement(child, props);
            }
            return child;
        })}
    </>
}

export default ConditionWrapper;