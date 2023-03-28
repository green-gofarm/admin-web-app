import { Box, Grid } from '@mui/material'
import { useState } from 'react';
import useFarmstayAddress from '../../../../Management/Farmstay/FarmstayDetail/hooks/useFarmstayAddress';
import { renderAddress } from '../../../../../../setting/farmstay-setting';
import { convertISOToNaturalFormat } from '../../../../../../helpers/dateUtils';
import UpdateFarmstayBasic from '../action/UpdateFarmstayBasic';
import useFarmstayImages from '../../../../Management/Farmstay/FarmstayDetail/hooks/useFarmstayImages';
import UpdateFarmstayImage from '../action/UpdateFarmstayImage';
import useContactInfo from '../../../../Management/Farmstay/FarmstayDetail/hooks/useContactInfo';
import UpdateFarmstayContactInfo from '../action/UpdateFarmstayContactInfo';
import ImageView from '../../../../../General/ImageView';
import LeafletViewMap from '../../../../../General/Map/LeafletViewMap';
import UpdateFarmstayLocation from '../action/UpdateFarmstayLocation';

interface IBasicInfo {
    detail: any,
    loading: boolean,
    refresh: () => void
}

function BasicInfoTab({
    detail,
    loading,
    refresh,
}: IBasicInfo) {

    const [openEditBasic, setOpenEditBasic] = useState<boolean>(false);
    const [openEditImages, setOpenEditImages] = useState<boolean>(false);
    const [openEditContactInfo, setOpenEditContactInfo] = useState<boolean>(false);
    const [openEditLocation, setOpenEditLocation] = useState<boolean>(false);

    const address = useFarmstayAddress(detail);
    const images = useFarmstayImages(detail);
    const contactInfo = useContactInfo(detail);

    const renderBasic = () => (
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
                    onClick={() => setOpenEditBasic(true)}
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
                                <label>Địa chỉ :</label>{" "}
                                <span className="tx-medium">{renderAddress(address)}</span>
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
    )

    const renderContactInfo = () => (
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
                    Phương thức liên lạc
                </Box>

                <Box
                    className="btn ripple border btn-icon"
                    width="32px !important"
                    height="32px !important"
                    padding="0"
                    title="Cập nhật"
                    onClick={() => setOpenEditContactInfo(true)}
                >
                    <i className="fe fe-edit"></i>
                </Box>
            </Box>
            <Box padding="0 8px" className="main-contact-info-body">
                <div className="media-list">
                    {contactInfo.map((contact, index) => {
                        if (index % 2 === 0) {
                            // create a new media-body every two items
                            return (
                                <div key={index} className="media">
                                    <div className="media-body">
                                        <div>
                                            <label>{contact.method}:</label>{" "}
                                            <span className="tx-medium">{contact.value}</span>
                                        </div>
                                        {contactInfo.length > index + 1 && (
                                            <div>
                                                <label>{contactInfo[index + 1].method}:</label>{" "}
                                                <span className="tx-medium">
                                                    {contactInfo[index + 1].value}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        }
                        return null;
                    })}
                </div>
            </Box>
        </div>
    )

    const renderImages = () => (
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
                    onClick={() => setOpenEditImages(true)}
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
    )

    const renderLocation = () => (
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
                    Vị trí
                </Box>

                <Box
                    className="btn ripple border btn-icon"
                    width="32px !important"
                    height="32px !important"
                    padding="0"
                    title="Cập nhật"
                    onClick={() => setOpenEditLocation(true)}
                >
                    <i className="fe fe-edit"></i>
                </Box>
            </Box>
            <Box padding="20px" className="main-contact-info-body">
                <LeafletViewMap
                    location={{
                        lat: detail?.latitude,
                        lng: detail?.longitude
                    }}
                />
            </Box>
        </div>
    )



    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                {renderBasic()}
            </Grid>

            <Grid item xs={12}>
                {renderContactInfo()}
            </Grid>

            <Grid item xs={12}>
                {renderImages()}
            </Grid>

            <Grid item xs={12}>
                {renderLocation()}
            </Grid>

            {openEditBasic
                ? <UpdateFarmstayBasic
                    open={openEditBasic}
                    onClose={() => setOpenEditBasic(false)}
                    onSuccessCallback={refresh}
                    farmstay={detail}
                />
                : null
            }

            {openEditImages
                ? <UpdateFarmstayImage
                    open={openEditImages}
                    onClose={() => setOpenEditImages(false)}
                    onSuccessCallback={refresh}
                    farmstay={detail}
                />
                : null
            }

            {openEditContactInfo
                ? <UpdateFarmstayContactInfo
                    open={openEditContactInfo}
                    onClose={() => setOpenEditContactInfo(false)}
                    onSuccessCallback={refresh}
                    farmstay={detail}
                />
                : null
            }

            {openEditLocation
                ? <UpdateFarmstayLocation
                    open={openEditLocation}
                    onClose={() => setOpenEditLocation(false)}
                    onSuccessCallback={refresh}
                    farmstay={detail}
                />
                : null
            }
        </Grid>
    )
}

export default BasicInfoTab;