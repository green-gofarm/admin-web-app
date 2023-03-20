import { Dialog } from "@mui/material";
import { FC, memo } from "react";

interface CreateFarmstayProps {
    open?: boolean,
    onClose: () => void,
}

const CreateFarmstay: FC<CreateFarmstayProps> = ({
    open,
    onClose,
}) => {
    return (
        <Dialog
            open={Boolean(open)}
            onClose={onClose}
            fullScreen
        >

        </Dialog>
    )
}

export default memo(CreateFarmstay);