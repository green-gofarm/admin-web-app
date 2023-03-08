import { Box } from "@mui/material";
import { ReactNode, memo } from "react"

interface IDetailItem {
    label?: string | ReactNode,
    icon?: any,
    value?: any
}


function IconLabelDetail({
    icon,
    label,
    value,
    ...props
}: IDetailItem) {
    return (
        <Box
            display="flex"
            gap="8px"
            alignItems="center"
            className="text-muted mb-2"
            {...props}
        >
            {icon
                ? <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="flex-start"
                    width="20px"
                >
                    {icon}
                </Box>
                : null
            }
            {label
                ? <Box
                    className="font-weight-semibold"
                >
                    {label}
                </Box>
                : null
            }

            {value
                ? <span>
                    {value}
                </span>
                : null
            }
        </Box>
    )
}
export default memo(IconLabelDetail);