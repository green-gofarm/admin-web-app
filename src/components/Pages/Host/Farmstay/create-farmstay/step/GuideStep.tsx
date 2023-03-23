import { Box, Button, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles/makeStyles';
import { Alert, Container } from 'react-bootstrap';
import IconLabelDetail from '../../../../../General/Item/IconLabelDetail';

interface GetNameStepProps {
    onClose: () => void
}

const useStyles = makeStyles({
    header: {
        width: "100%",
        height: "100px",
        display: "flex",
        alignItems: "center",
    },
    step: {
        fontSize: '20px',
        lineHeight: '28px',
        display: 'inline',
        fontWeight: 'normal',
        margin: '0px',
    },
    headline: {
        fontSize: '36px',
        lineHeight: '54px',
        fontWeight: 500,
        marginBottom: '24px',
        maxWidth: '480px',
    },
    footer: {
        alignItems: 'center',
        alignSelf: 'stretch',
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '24px',
    },
});

function GuideStep({ onClose }: GetNameStepProps) {

    const classes = useStyles();

    return (
        <Container>
            <Box className={classes.header}>
                <Box className={classes.step}>
                    Một số lưu ý
                </Box>
            </Box>

            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <IconLabelDetail
                        icon={<i className="fa fa-phone me-2"></i>}
                        label="Hãy hoàn thiện thông tin liên lạc (sđt, email, v.v) để du khách có thể liên hệ với bạn. Hãy đảm bảo rằng số điện thoại và địa chỉ email của bạn được cập nhật và chính xác."
                    />
                    <IconLabelDetail
                        icon={<i className="fa fa-image me-2"></i>}
                        label="Tải lên hình ảnh chất lượng cao của farmstay. Hình ảnh tốt sẽ giúp du khách có được cái nhìn tổng quan và thu hút về nơi lưu trú và các hoạt động của bạn."
                    />
                    <IconLabelDetail
                        icon={<i className="fa fa-image me-2"></i>}
                        label="Mô tả rõ ràng về farmstay của bạn, bao gồm các tiện nghi và dịch vụ cung cấp, quy định, v.v. Hãy đảm bảo rằng các thông tin này được cập nhật và chính xác để giúp du khách có được trải nghiệm tuyệt vời nhất."
                    />
                    <IconLabelDetail
                        icon={<i className="fa fa-home me-2"></i>}
                        label="Hãy cân nhắc và lựa chọn giá phòng hợp lý để thu hút du khách đặt phòng và đảm bảo lợi nhuận cho bạn"
                    />
                    <Alert variant="info">
                        Lưu ý: cần bổ sung đầy đủ thông tin trước khi được đăng lên nền tảng GOFARM
                    </Alert>
                </Grid>

                <Grid item xs={12}>
                    <footer className={classes.footer}>
                        <Button
                            color="primary"
                            variant="contained"
                            size="large"
                            onClick={onClose}
                        >
                            Đóng
                        </Button>
                    </footer>
                </Grid>
            </Grid>
        </Container>
    )
}

export default GuideStep;