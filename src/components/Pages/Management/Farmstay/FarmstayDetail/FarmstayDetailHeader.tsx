import { Box, Grid } from '@mui/material'
import { Card } from 'react-bootstrap'
import IconLabelDetail from '../../../../General/Item/IconLabelDetail';
import useContactInfo from './hooks/useContactInfo'
import StringWrapper from '../../../../General/Wrapper/StringWrapper'
import useFarmstayImages from './hooks/useFarmstayImages'
import useFarmstayAddress from './hooks/useFarmstayAddress'
import { findFarmstayStatus, renderAddress } from '../../../../../setting/farmstay-setting'
import { Status } from '../../../../../setting/Status'
import Rating from '../../../../General/Rating'
import GeneralAvatar from '../../../../General/GeneralAvatar';
import UserLinkTag from '../../../../General/Wrapper/UserLinkTag';

interface FarmstayDetailHeaderProps {
    detail?: any,
    loading?: boolean,
}

function FarmstayDetailHeader({
    detail,
    loading,
}: FarmstayDetailHeaderProps) {

    const contactInfo = useContactInfo(detail);
    const images = useFarmstayImages(detail);
    const address = useFarmstayAddress(detail);

    return (
        <Card className="custom-card customs-cards">
            <Card.Body className="d-flex bg-white">
                <div className="">
                    <span className="pos-relative">
                        <GeneralAvatar
                            avatar={images?.avatar}
                            noCamera
                        />
                    </span>
                </div>
                <Box
                    className="prof-details"
                    margin="0 0 4px 24px"
                    flexGrow="1"
                >
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            <Box
                                component="h4"
                                className="font-weight-semibold"
                                display="flex"
                                gap="8px"
                                textTransform="capitalize"
                            >
                                {detail?.name}
                                <Status statusObject={findFarmstayStatus(detail?.status)} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <IconLabelDetail
                                icon={<i className="fa fa-user me-2"></i>}
                                label="Chủ sở hữu:"
                                value={
                                    <UserLinkTag
                                        user={detail?.host}
                                    />
                                }
                            />
                        </Grid>

                        <Grid item xs={12} lg={6}>
                            <IconLabelDetail
                                icon={<i className="fa fa-location-arrow me-2"></i>}
                                label="Địa chỉ:"
                                value={renderAddress(address)}
                            />
                        </Grid>

                        <Grid item xs={12} lg={6}>
                            <IconLabelDetail
                                icon={<i className="fa fa-star me-2"></i>}
                                label="Đánh giá:"
                                value={
                                    <Rating rating={detail?.rating} />
                                }
                            />
                        </Grid>

                        <Grid item xs={12} lg={6}>
                            <IconLabelDetail
                                icon={<i className="fa fa-address-book me-2"></i>}
                                label="Liên hệ:"
                                value={
                                    contactInfo[0]
                                        ? <StringWrapper text={contactInfo[0].value} />
                                        : <i>Chưa có thông tin liên hệ</i>
                                }
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Card.Body>
        </Card>
    )
}

export default FarmstayDetailHeader