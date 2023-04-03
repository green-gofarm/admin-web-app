import React, { useState } from 'react'
import ImageView from '../../../../General/ImageView'
import { Box } from '@mui/material';
import UpdateRoomImages from './action/UpdateRoomImages';

interface RoomImageProps {
    detail: any,
    loading: any,
    images?: any,
    refresh?: () => void
}

function RoomImage({
    detail,
    loading,
    images,
    refresh
}: RoomImageProps) {

    const [openUpdate, setOpenUpdate] = useState<boolean>(false);
    return (
        <>
            <div className="main-content-body main-content-body-contacts card custom-card">
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    className="main-contact-info-header"
                    padding="16px 20px 20px 20px !important"
                >
                    <Box
                        className='h5'
                        margin="0 !important"
                    >
                        Hình ảnh
                    </Box>

                    <Box
                        className="btn ripple border btn-icon"
                        width="32px !important"
                        height="32px !important"
                        padding="0"
                        title="Cập nhật"
                        onClick={() => setOpenUpdate(true)}
                    >
                        <i className="fe fe-edit"></i>
                    </Box>
                </Box>
                <Box padding="20px" className="main-contact-info-body">
                    <ImageView
                        images={images?.others}
                    />
                </Box>
            </div>

            {openUpdate
                ? <UpdateRoomImages
                    open={openUpdate}
                    onSuccessCallback={refresh}
                    room={detail}
                    onClose={() => setOpenUpdate(false)}
                />
                : null
            }
        </>
    )
}

export default RoomImage