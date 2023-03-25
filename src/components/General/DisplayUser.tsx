import { Box } from '@mui/material'
import AvatarWrapper from './Wrapper/AvatarWrapper'

interface DisplayUserProps {
    user: any,
}

function DisplayUser({
    user,
}: DisplayUserProps) {

    const name = user?.name ?? "unknown";

    return (
        <Box
            display="flex"
            alignItems="center"
            gap="8px"
        >
            <AvatarWrapper
                src={name}
                name={name}
            />
            {name}
        </Box>
    )
}

export default DisplayUser