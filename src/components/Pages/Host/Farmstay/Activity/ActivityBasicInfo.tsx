import React, { useMemo, useState } from 'react'
import { Box } from '@mui/material';
import { convertISOToNaturalFormat } from '../../../../../helpers/dateUtils';
import { convertToMoney, createCodeString } from '../../../../../helpers/stringUtils';
import UpdateActivityBasicInfo from './action/UpdateActivityBasicInfo';
import { isAvailableArray } from '../../../../../helpers/arrayUtils';
import { getTagCategoryLabel } from '../../../../../setting/tag-category-setting';
import useAllTagCategories from '../../../Management/Tag/hooks/useAllTagCategories';

interface ActivityBasicInfoProps {
    detail: any,
    loading: any,
    refresh?: () => void
}

function ActivityBasicInfo({
    detail,
    loading,
    refresh
}: ActivityBasicInfoProps) {

    const [openUpdate, setOpenUpdate] = useState<boolean>(false);
    const categories = useAllTagCategories();

    const tags: any[] = useMemo(() => {
        if (!isAvailableArray(detail?.tags)) return [];
        return detail.tags;
    }, [detail?.tags]);

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
                                    <label>Số người mỗi lượt :</label>{" "}
                                    <span className="tx-medium">{detail?.slot}</span>
                                </div>
                                <div>
                                    <label>Đơn giá :</label>{" "}
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

                                    {tags.length > 0
                                        ? <Box
                                            marginTop="8px"
                                            display="flex"
                                            alignItems="center"
                                            gap="8px"
                                        >
                                            {tags.map((item, index) =>
                                                <span className='tag tag-rounded' key={index}>
                                                    {getTagCategoryLabel(categories, item)}
                                                </span>
                                            )}
                                        </Box>
                                        : null
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="media">
                            <div className="media-body">
                                <div>
                                    <label>Ngày tạo :</label>{" "}
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
                ? <UpdateActivityBasicInfo
                    activity={detail}
                    open={openUpdate}
                    onClose={() => setOpenUpdate(false)}
                    onSuccessCallback={refresh}
                />
                : null
            }
        </>
    )
}

export default ActivityBasicInfo