import { Box } from '@mui/material'
import React from 'react'
import AvatarWrapper from './AvatarWrapper'
import useBackUrl from '../../../hooks/useBackUrl';
import { ROLES } from '../../../setting/setting';
import { Link } from 'react-router-dom';

const getRolePath = (role: any) => {
    if (role === ROLES.ADMIN) return "admin";
    if (role === ROLES.HOST) return "host";
    if (role === ROLES.CUSTOMER) return "customer";
    return "";
}

interface UserLinkTagProps {
    user?: any
}

function UserLinkTag({ user }: UserLinkTagProps) {

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
            className="tag tag-rounded"
        >
            {user?.avatar
                ?
                <Box
                    component="img"
                    src={user.avatar}
                    alt="Ảnh đại diện"
                    width="22px !important"
                    height="22px !important"
                    borderRadius="100%"
                />
                : <AvatarWrapper
                    name={user?.name}
                    avatarProps={{
                        width: "22px !important",
                        height: "22px !important",
                        fontSize: "12px !important"
                    }}
                />

            }

            <Box marginLeft="8px">
                {user?.name ?? "UNKNOWN_NAME"}
            </Box>
        </Box>
    )
}

export default UserLinkTag;