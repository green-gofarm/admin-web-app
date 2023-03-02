import { Box } from "@mui/material";

interface IStatus {
    statusObject: any,
}

export const Status = ({ statusObject }: IStatus) => {
    if (!statusObject) return null;
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            padding="4px 8px"
            borderRadius="4px"
            width="fit-content"
            fontSize="0.75rem"
            fontWeight={600}
            color={statusObject.textColor}
            bgcolor={statusObject.bgColor}
        >
            {statusObject.label}
        </Box>
    )
}