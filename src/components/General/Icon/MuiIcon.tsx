import AppsIcon from '@mui/icons-material/Apps';
import { Box, IconTypeMap } from "@mui/material";
import { OverridableComponent } from '@mui/material/OverridableComponent';

interface IMuiIcon {
    Icon?: OverridableComponent<IconTypeMap>,
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