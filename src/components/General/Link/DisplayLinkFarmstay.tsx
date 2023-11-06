import { Box } from '@mui/material'
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import useBackUrl from '../../../hooks/useBackUrl';
import HomeIcon from "@mui/icons-material/Home";

interface DisplayLinkFarmstayProps {
    farmstayPath: string,
    farmstay: any,
}


function DisplayLinkFarmstay({
    farmstayPath,
    farmstay,
}: DisplayLinkFarmstayProps) {

    const name = useMemo(() => farmstay?.name ?? "unknown", [farmstay?.name]);
    const { createBackUrl } = useBackUrl();

    return (
        <Box
            component={Link}
            to={
                farmstay?.id
                    ? `${farmstayPath}/${farmstay.id}?backUrl=${createBackUrl()}`
                    : "#"
            }
            display="flex"
            alignItems="center"
            gap="8px"
            className="tag tag-rounded"
            overflow="hidden"
        >
            <HomeIcon />
            {name}
        </Box>
    )
}

export default DisplayLinkFarmstay;