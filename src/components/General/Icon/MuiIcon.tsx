import AppsIcon from '@mui/icons-material/Apps';
import { Box } from "@mui/material";

interface IMuiIcon {
    Icon?: any,
}

const DefaultIcon = AppsIcon;

const MuiIcon = ({
    Icon,
    ...props
}: IMuiIcon) => (
    <Box
        component={Icon ?? DefaultIcon}
        {...props}
    />
)


export default MuiIcon