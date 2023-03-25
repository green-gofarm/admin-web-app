import { Box } from '@mui/material'
import AvatarWrapper from './Wrapper/AvatarWrapper'
import { Link } from 'react-router-dom';
import useBackUrl from '../../hooks/useBackUrl';
import { useMemo } from 'react';
import { ROLES } from '../../setting/setting';

interface DisplayLinkUserProps {
    user: any,
}

const getRolePath = (role: any) => {
    if (role === ROLES.ADMIN) return "admin";
    if (role === ROLES.HOST) return "host";
    if (role === ROLES.CUSTOMER) return "customer";
    return "";
}

function DisplayLinkUser({
    user,
}: DisplayLinkUserProps) {

    const name = useMemo(() => user?.name ?? "unknown", [user?.name]);
    const { createBackUrl } = useBackUrl();

    return (
        <Box
            component={Link}
            to={
                user?.id && user?.role
                    ? `/management/account/${getRolePath(user.role)}/${user.id}?backUrl=${createBackUrl()}`
                    : "#"
            }
            display="flex"
            alignItems="center"
            gap="8px"
            className="tag tag-rounded"
        >
            <AvatarWrapper
                name={name}
                avatarProps={{
                    width: "22px !important",
                    height: "22px !important",
                    fontSize: "12px !important"
                }}
            />
            {name}
        </Box>
    )
}

export default DisplayLinkUser;