import { Box, BoxProps } from '@mui/material';
import React, { FC, memo, ReactNode } from 'react';

interface FakeLinkProps extends BoxProps {
    onClick?: () => void;
    children?: ReactNode;
    rootProps?: any;
}

const FakeLink: FC<FakeLinkProps> = ({
    onClick,
    children,
    rootProps,
}: FakeLinkProps) => {
    return (
        <Box
            component="div"
            display="inline-block"
            color="#3366CC"
            sx={{
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" }
            }}
            onClick={onClick}
            {...rootProps ?? {}}
        >
            {children}
        </Box>
    );
};

export default memo(FakeLink);