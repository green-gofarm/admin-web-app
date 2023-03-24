import { Box, Grid } from '@mui/material';
import IconLabelDetail from '../../../../General/Item/IconLabelDetail';
import { Status } from '../../../../../setting/Status';
import { findActivityStatus } from '../../../../../setting/activity-status-setting';

interface IActivityDetailHeader {
    detail?: any,
    loading?: boolean,
    images?: any,
}


const tags: any[] = [
    {
        name: "Ngoài trời",
    },
    {
        name: "Thể thao",
    },
    {
        name: "Khám phá",
    },
    {
        name: "Tham quan",
    },
    {
        name: "Ẩm thực",
    },
    {
        name: "Mua sắm",
    },
    {
        name: "Cộng đồng",
    },
    {
        name: "Thiên nhiên",
    },
    {
        name: "Văn hóa địa phương",
    },
    {
        name: "Giải trí",
    },
    {
        name: "Nghỉ dưỡng",
    },
    {
        name: "Thành phố",
    },
    {
        name: "Học tập",
    },
    {
        name: "Tôn giáo",
    },
]

function ActivityDetailHeader({
    detail,
    loading,
    images,
}: IActivityDetailHeader) {

    const renderContent = () => (
        <Grid container spacing={0} alignItems="center">
            <Grid item xs={12}>
                <Box
                    display="flex"
                    alignItems="center"
                    gap="8px"

                    component="h4"
                    className="font-weight-semibold"
                >
                    {detail?.name ?? "NO_NAME"}
                    <Box>
                        <Status statusObject={findActivityStatus(detail?.status)} />
                    </Box>
                </Box>
            </Grid>

            <Grid item xs={12}>
                <IconLabelDetail
                    icon={<i className="fa fa-ticket-alt"></i>}
                    label="Sức chứa:"
                    value={detail?.slot}
                />
            </Grid>

            <Grid item xs={12}>
                <IconLabelDetail
                    icon={<i className="fa fa-credit-card"></i>}
                    label="Giá vé:"
                    value={detail?.price}
                />
            </Grid>
        </Grid>
    )

    return (

        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Box display="flex" gap="16px">
                    <Box
                        className="pos-relative"
                        minWidth="96px !important"
                        minHeight="96px !important"
                    >
                        <Box
                            component="img"
                            className="br-5 "
                            src={images?.avatar ?? require("../../../../../assets/img/photos/farmstay.jpg")}
                            alt="Farmstay logo"
                            sx={{
                                position: "relative",
                                width: "96px",
                                height: "96px",
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat"
                            }}
                        />
                        <span className="bg-success text-white wd-1 ht-1 rounded-pill profile-online"></span>
                    </Box>
                    {renderContent()}
                </Box>
            </Grid>
            <Grid item xs={12}>
                <h5 className="mt-1 fw-semibold">Nội dung hoạt động</h5>
                <p className="mb-3 tx-13">
                    {detail?.description}
                </p>

                <Box display="flex" gap="8px" flexWrap="wrap">
                    {tags.map((item, index) =>
                        <span
                            key={index}
                            className="tag tag-rounded"
                        >
                            {item.name}
                        </span>
                    )}
                </Box>
            </Grid>
        </Grid>
    )
}

export default ActivityDetailHeader;