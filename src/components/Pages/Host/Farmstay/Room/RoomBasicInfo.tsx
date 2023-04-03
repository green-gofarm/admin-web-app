import React, { useState } from 'react'
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/redux-setting';
import { getRoomCategoryLabel } from '../../../../../setting/room-category-setting';
import { convertISOToNaturalFormat } from '../../../../../helpers/dateUtils';
import { convertToMoney, createCodeString } from '../../../../../helpers/stringUtils';
import UpdateRoomBasic from './action/UpdateRoomBasic';

interface RoomImageProps {
    detail: any,
    loading: any,
    refresh?: () => void
}

function RoomBasicInfo({
    detail,
    loading,
    refresh
}: RoomImageProps) {

    const categories = useSelector((state: RootState) => state.room.allRoomCategories);

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
                        Thông tin cơ bản
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
                <Box padding="0 8px" className="main-contact-info-body">
                    <div className="media-list">
                        <div className="media">
                            <div className="media-body">
                                <div>
                                    <label>Tên :</label>{" "}
                                    <span className="tx-medium">{detail?.name}</span>
                                </div>
                                <div>
                                    <label>Mã :</label>{" "}
                                    <span className="tx-medium">{createCodeString("R", detail?.id)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="media">
                            <div className="media-body">
                                <div>
                                    <label>Phân loại :</label>{" "}
                                    <span className="tx-medium">{getRoomCategoryLabel(categories, detail?.roomCategoryId)}</span>
                                </div>
                                <div>
                                    <label>Giá phòng :</label>{" "}
                                    <span className="tx-medium">{convertToMoney(detail?.price)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="media mb-0">
                            <div className="media-body">
                                <div>
                                    <label>Mô tả :</label>{" "}
                                    <span className="tx-medium">
                                        {detail?.description ?? <i>Chưa có mô tả</i>}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="media">
                            <div className="media-body">
                                <div>
                                    <label>Ngày thêm :</label>{" "}
                                    <span className="tx-medium">
                                        {detail?.createdDate
                                            ? convertISOToNaturalFormat(detail.createdDate)
                                            : ""
                                        }
                                    </span>
                                </div>
                                <div>
                                    <label>Lần cập nhật cuối :</label>{" "}
                                    <span className="tx-medium">
                                        {detail?.updatedDate
                                            ? convertISOToNaturalFormat(detail.updatedDate)
                                            : ""
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
            </div>

            {openUpdate
                ? <UpdateRoomBasic
                    room={detail}
                    open={openUpdate}
                    onClose={() => setOpenUpdate(false)}
                    onSuccessCallback={refresh}
                />
                : null
            }
        </>
    )
}

export default RoomBasicInfo