import { Box, Button, Grid } from '@mui/material'
import { Card } from 'react-bootstrap'
import IconLabelDetail from '../../../../General/Item/IconLabelDetail'
import useBackUrl from '../../../../../hooks/useBackUrl'
import useContactInfo from './hooks/useContactInfo'
import StringWrapper from '../../../../General/Wrapper/StringWrapper'
import useFarmstayImages from './hooks/useFarmstayImages'
import { useState } from 'react'
import ApproveFarmstay from '../action/ApproveFarmstay'
import useFarmstayAddress from './hooks/useFarmstayAddress'
import { FARMSTAY_STATUSES, renderAddress } from '../../../../../setting/farmstay-setting'
import GradingIcon from '@mui/icons-material/Grading';
import UserLinkTag from '../../../../General/Wrapper/UserLinkTag'
import { useNavigate } from 'react-router-dom'

interface FarmstayPreviewHeaderProps {
    detail?: any,
    loading?: boolean,
    refresh: () => void
}

function FarmstayPreviewHeader({
    detail,
    refresh,
    loading
}: FarmstayPreviewHeaderProps) {

    const navigate = useNavigate();
    const { getBackUrl } = useBackUrl();

    const contactInfo = useContactInfo(detail);
    const images = useFarmstayImages(detail);
    const address = useFarmstayAddress(detail);

    // State
    const [openApprove, setOpenApprove] = useState<boolean>(false);

    return (
        <>
            <Card className="custom-card customs-cards">
                <Card.Body className="d-flex bg-white">
                    <div className="">
                        <span className="pos-relative">
                            <Box
                                component="img"
                                className="br-5 "
                                src={images?.avatar ?? require("../../../../../assets/img/photos/1.jpg")}
                                alt="Farmstay logo"
                                sx={{
                                    position: "relative",
                                    width: "120px",
                                    height: "120px",
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat"
                                }}
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
                                <h4 className="font-weight-semibold">
                                    {detail?.name}
                                </h4>
                            </Grid>
                            <Grid item xs={12} lg={9}>
                                <IconLabelDetail
                                    icon={<i className="fa fa-user me-2"></i>}
                                    label="Chủ sở hữu:"
                                    value={
                                        <UserLinkTag
                                            user={detail?.host}
                                        />
                                    }
                                />
                                <IconLabelDetail
                                    icon={<i className="fa fa-location-arrow me-2"></i>}
                                    label="Địa chỉ:"
                                    value={renderAddress(address)}
                                />

                                <IconLabelDetail
                                    icon={<i className="fa fa-address-book me-2"></i>}
                                    label="Liên hệ"
                                    value={
                                        contactInfo[0]
                                            ? <StringWrapper text={contactInfo[0].value} />
                                            : <i>Chưa có thông tin liên hệ</i>
                                    }
                                />
                            </Grid>
                            {detail?.status === FARMSTAY_STATUSES.PENDING
                                ? <Grid item xs={12} lg={3}>
                                    <Box
                                        display="flex"
                                        flexDirection="column"
                                        gap="1rem"
                                    >
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            startIcon={<GradingIcon sx={{ color: "#fff" }} />}
                                            onClick={() => setOpenApprove(true)}
                                        >
                                            <Box
                                                color="#fff"
                                                textTransform="uppercase"
                                                fontWeight="600"
                                            >
                                                Thực hiện phê duyệt
                                            </Box>
                                        </Button>
                                    </Box>
                                </Grid>
                                : null
                            }
                        </Grid>
                    </Box>
                </Card.Body>
            </Card>
            {openApprove
                ? <ApproveFarmstay
                    open={openApprove && !!detail}
                    farmstay={detail}
                    refresh={refresh}
                    onClose={() => setOpenApprove(false)}
                    onSuccessCallback={() => navigate(getBackUrl() ?? "/management/farmstay/preview")}
                />
                : null
            }
        </>
    )
}

export default FarmstayPreviewHeader;