import { Box } from '@mui/material'
import React from 'react'
import AvatarWrapper from './AvatarWrapper'

interface UserTagProps {
    user?: any
}

function UserTag({ user }: UserTagProps) {
    return (
        <Box
            display="flex"
            alignItems="center"
            className="tag tag-rounded"
        >
            {user?.avatar
                ? <Box
                    component="img"
                    src={user.avatar}
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

export default UserTag;