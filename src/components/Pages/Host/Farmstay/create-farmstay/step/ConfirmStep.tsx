import { Box, Button, CircularProgress, Divider, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles/makeStyles';
import { Container } from 'react-bootstrap';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { isAvailableArray } from '../../../../../../helpers/arrayUtils';
import React, { Fragment } from 'react';
import IconLabelDetail from '../../../../../General/Item/IconLabelDetail';
import useDelayLoading from '../../../../../../hooks/useDelayLoading';

interface GetNameStepProps {
    farmstay: any,
    onBack: () => void,
    onConfirm: () => void;
    loading: boolean;
}

const useStyles = makeStyles({
    header: {
        width: "100%",
        height: "60px",
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

interface ItemProps {
    label?: string,
    value: any
}

const Item = ({ label, value }: ItemProps) => (
    <>
        <Grid item xs={3}>
            {label}
        </Grid>
        <Grid item xs={9}>
            {value}
        </Grid>
        <Grid item xs={12}>
            <Box className='border-bottom' />
        </Grid>
    </>
);

function ConfirmStep({
    farmstay,
    onConfirm,
    onBack,
    loading,
}: GetNameStepProps) {

    const classes = useStyles();

    const delay = useDelayLoading(loading);

    const handleConfirm = () => {
        onConfirm();
    }

    return (
        <Container>
            <Box className={classes.header}>
                <Box className={classes.step}>
                    Bước 5/5
                </Box>
            </Box>

            <Box maxWidth="800px" fontSize="0.75rem">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <h2 className={classes.headline}>
                            Xác nhận thông tin
                        </h2>

                        <Box>
                            <Box className="font-weight-bold text-dark fs-16 mb-1">
                                Tên
                            </Box>
                            <p className="text-muted mt-0 tx-12">
                                {farmstay?.name}
                            </p>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box>
                            <Box className="font-weight-bold text-dark fs-16 mb-1">
                                Địa chỉ
                            </Box>
                            <Grid container spacing={1} alignItems="flex-start">
                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>

                                <Item
                                    label="Quốc gia"
                                    value={farmstay?.address.country}
                                />
                                <Item
                                    label="Tỉnh/Thành phố"
                                    value={farmstay?.address.province.name}
                                />
                                <Item
                                    label="Quận/Huyện"
                                    value={farmstay?.address.district.name}
                                />
                                <Item
                                    label="Phường/Xã"
                                    value={farmstay?.address.ward.name}
                                />
                                <Item
                                    label="Chi tiết"
                                    value={farmstay?.address.detail}
                                />
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box>
                            <Box className="font-weight-bold text-dark fs-16 mb-2">
                                Vị trí
                            </Box>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Box className='border-bottom' />
                                </Grid>

                                <Grid item xs={12}>
                                    <Box
                                        display="flex"
                                        gap="8px"
                                        flexWrap="wrap"
                                    >
                                        <IconLabelDetail
                                            icon={<i className='fa fa-map-marker'></i>}
                                            label="Kinh độ"
                                            value={farmstay?.location.lng ?? <i>Chưa có</i>}
                                        />
                                        <IconLabelDetail
                                            icon={<i className='fa fa-map-marker'></i>}
                                            label="Vĩ độ"
                                            value={farmstay?.location.lat ?? <i>Chưa có</i>}
                                        />
                                    </Box>
                                </Grid>

                                <Grid item xs={12}>
                                    <Box className='border-bottom' />
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box>
                            <Box className="font-weight-bold text-dark fs-16 mb-1" width="100%">
                                Phương thức liên lạc
                            </Box>
                            {isAvailableArray(farmstay?.contactInfo)
                                ? <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Box className='border-bottom mt-2' />
                                    </Grid>
                                    {farmstay.contactInfo.map((item: any, index: number) =>
                                        <Fragment key={index}>
                                            <Grid item xs={3}>
                                                {item.method}
                                            </Grid>
                                            <Grid item xs={9}>
                                                {item.value}
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Box className='border-bottom' />
                                            </Grid>
                                        </Fragment>
                                    )}
                                </Grid>
                                : null
                            }
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <footer className={classes.footer}>
                            <Button
                                color="primary"
                                variant="text"
                                size="large"
                                onClick={onBack}
                                startIcon={<ArrowBackIcon />}
                            >
                                Quay lại
                            </Button>
                            <Button
                                color="primary"
                                variant="contained"
                                size="large"
                                endIcon={delay ? <CircularProgress size={20} thickness={4} /> : null}
                                onClick={handleConfirm}
                            >
                                Hoàn thành
                            </Button>
                        </footer>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default ConfirmStep;