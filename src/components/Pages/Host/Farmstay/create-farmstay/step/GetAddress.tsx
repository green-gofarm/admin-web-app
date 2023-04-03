import { Box, Button, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles/makeStyles';
import { Container, Form, InputGroup } from 'react-bootstrap';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useCallback, useState } from 'react';
import { Address } from '../CreateFarmstay';
import useProvinces from '../../hooks/useProvinces';
import useDistricts from '../../hooks/useDistricts';
import useWards from '../../hooks/useWards';
import VALIDATOR from '../validator';


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
    label: {
        minWidth: "140px",
        textAlign: "right",
        justifyContent: "right",
    },
});


interface Errors {
    country: string;
    province: string;
    district: string;
    ward: string;
    detail: string;
}

const initialErrors: Errors = {
    country: '',
    province: '',
    district: '',
    ward: '',
    detail: '',
};

interface GetNameStepProps {
    defaultAddress?: Address,
    onBack: () => void,
    onContinue: (address: Address) => void;
}

function GetAddress({
    defaultAddress,
    onContinue,
    onBack,
}: GetNameStepProps) {

    const classes = useStyles();

    const [provinceCode, setProvinceCode] = useState<any>(defaultAddress?.province.code ?? null);
    const [districtCode, setDistrictCode] = useState<any>(defaultAddress?.district.code ?? null);

    const { provinces, loading: loadingProvince } = useProvinces();
    const { districts, loading: loadingDistrict } = useDistricts(provinceCode);
    const { wards, loading: loadingWard } = useWards(districtCode);

    const [address, setAddress] = useState<Address>(defaultAddress ?? {
        country: "Việt Nam",
        province: {
            code: null,
            name: '',
        },
        district: {
            code: null,
            name: '',
        },
        ward: {
            code: null,
            name: '',
        },
        detail: "",
    });

    const [errors, setErrors] = useState<Errors>(initialErrors);

    const validateAddress = (address: Address) => {
        const temp: { [key in keyof Address]: string } = {
            country: '',
            province: VALIDATOR.isRequired(address.province.name),
            district: VALIDATOR.isRequired(address.district.name),
            ward: VALIDATOR.isRequired(address.ward.name),
            detail: '',
        };

        setErrors(temp);
        return temp;
    };

    const hasErrors = (errors: { [key in keyof Address]: string }): boolean => {
        return Object.values(errors).some(error => error !== '');
    };

    const handleContinue = () => {
        if (!hasErrors(validateAddress(address))) {
            onContinue(address);
        }
    }

    const handleOnChangeAddress = useCallback((key: keyof Address, value: any) => {
        setAddress(prev => ({
            ...prev,
            [key]: value,
        }));

        setErrors(prev => ({
            ...prev,
            [key]: VALIDATOR.NO_ERROR,
        }));
    }, []);

    const handleSelectProvince = useCallback((value: any) => {
        if (value != null) {
            const item = provinces.find(e => e.code + "" === value);
            handleOnChangeAddress("province", { name: item?.name, code: item?.code });
            handleOnChangeAddress("district", { name: "", code: null });
            handleOnChangeAddress("ward", { name: "", code: null });
            setProvinceCode(item?.code);
        }
    }, [handleOnChangeAddress, provinces]);

    const handleSelectDistrict = useCallback((value: any) => {
        if (value != null) {
            const item = districts.find(e => e.code + "" === value);
            handleOnChangeAddress("district", { name: item?.name, code: item?.code });
            handleOnChangeAddress("ward", { name: "", code: null });
            setDistrictCode(item?.code);
        }
    }, [districts, handleOnChangeAddress]);

    const handleSelectWard = useCallback((value: any) => {
        if (value != null) {
            const item = wards.find(e => e.code + "" === value);
            handleOnChangeAddress("ward", { name: item?.name, code: item?.code });
        }
    }, [handleOnChangeAddress, wards]);

    return (
        <Container>
            <Box className={classes.header}>
                <Box className={classes.step}>
                    Bước 2/5
                </Box>
            </Box>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <h2 className={classes.headline}>
                        Địa chỉ
                    </h2>
                </Grid>

                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <InputGroup className="input-group mb-1">
                                <InputGroup.Text
                                    className={`input-group-text ${classes.label}`}
                                >
                                    * Quốc gia
                                </InputGroup.Text>
                                <Form.Control
                                    aria-label="Country"
                                    className="form-control"
                                    type="text"
                                    disabled
                                    onChange={(e) => handleOnChangeAddress("detail", e.target.value ?? "")}
                                    defaultValue={address.country}
                                />
                            </InputGroup>
                        </Grid>
                        <Grid item xs={12}>
                            <InputGroup className="input-group mb-1 is-loading">
                                <InputGroup.Text
                                    className={`input-group-text ${classes.label}`}

                                >
                                    * Tỉnh/Thành phố
                                </InputGroup.Text>
                                <Form.Select
                                    aria-label="Province"
                                    className="form-control"
                                    disabled={loadingProvince}
                                    value={address.province.code ?? ""}
                                    autoFocus
                                    onChange={(e) => handleSelectProvince(e.target.value)}
                                >
                                    <option>Chọn tỉnh/thành phố</option>
                                    {provinces.map(item =>
                                        <option value={item.code} key={item.code}>
                                            {item.name}
                                        </option>
                                    )}
                                </Form.Select>
                                {loadingProvince
                                    ? <Box
                                        right="40px !important"
                                        className="spinner-border spinner-border-sm"
                                    />
                                    : null
                                }
                            </InputGroup>
                            {errors.province
                                ? <Form.Control.Feedback
                                    style={{ display: "inline-block" }}
                                    type="invalid"
                                >
                                    Thông tin bắt buộc.
                                </Form.Control.Feedback>
                                : null
                            }
                        </Grid>
                        <Grid item xs={12}>
                            <InputGroup className="input-group mb-1 is-loading">
                                <InputGroup.Text
                                    className={`input-group-text ${classes.label}`}
                                >
                                    * Quận/Huyện
                                </InputGroup.Text>
                                <Form.Select
                                    aria-label="Province"
                                    className="form-control"
                                    disabled={loadingDistrict && provinceCode}
                                    value={address.district.code ?? ""}
                                    onChange={(e) => handleSelectDistrict(e.target.value)}
                                >
                                    <option>Chọn quận/huyện</option>
                                    {districts.map(item =>
                                        <option value={item.code} key={item.code}>
                                            {item.name}
                                        </option>
                                    )}
                                </Form.Select>
                                {loadingDistrict
                                    ? <Box
                                        right="40px !important"
                                        className="spinner-border spinner-border-sm"
                                    />
                                    : null
                                }
                            </InputGroup>
                            {errors.district
                                ? <Form.Control.Feedback
                                    style={{ display: "inline-block" }}
                                    type="invalid"
                                >
                                    Thông tin bắt buộc.
                                </Form.Control.Feedback>
                                : null
                            }
                        </Grid>
                        <Grid item xs={12}>
                            <InputGroup className="input-group mb-1 is-loading">
                                <InputGroup.Text
                                    className={`input-group-text ${classes.label}`}

                                >
                                    * Phường/Xã
                                </InputGroup.Text>
                                <Form.Select
                                    aria-label="Province"
                                    className="form-control"
                                    disabled={loadingWard && districtCode}
                                    value={address.ward.code ?? ""}
                                    onChange={(e) => handleSelectWard(e.target.value)}
                                >
                                    <option>Chọn phường/xã</option>
                                    {wards.map(item =>
                                        <option value={item.code} key={item.code}>
                                            {item.name}
                                        </option>
                                    )}
                                </Form.Select>
                                {loadingWard
                                    ? <Box
                                        right="40px !important"
                                        className="spinner-border spinner-border-sm"
                                    />
                                    : null
                                }
                            </InputGroup>
                            {errors.ward
                                ? <Form.Control.Feedback
                                    style={{ display: "inline-block" }}
                                    type="invalid"
                                >
                                    Thông tin bắt buộc.
                                </Form.Control.Feedback>
                                : null
                            }
                        </Grid>
                        <Grid item xs={12}>
                            <InputGroup className="input-group mb-1">
                                <InputGroup.Text
                                    className={`input-group-text ${classes.label}`}
                                >
                                    Chi tiết
                                </InputGroup.Text>
                                <Form.Control
                                    aria-label="Country"
                                    className="form-control"
                                    placeholder='Số nhà, tên đường, hẻm, thôn, v.v'
                                    type="text"
                                    onChange={(e) => handleOnChangeAddress("detail", e.target.value ?? "")}
                                    defaultValue={address.detail ?? ""}
                                />
                            </InputGroup>
                        </Grid>

                        <Grid item xs={12}>
                            <i>(*) Thông tin bắt buộc</i>
                        </Grid>
                    </Grid>


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
                            onClick={handleContinue}
                            endIcon={<ArrowForwardIcon />}
                        >
                            Tiếp tục
                        </Button>
                    </footer>
                </Grid>
            </Grid>
            <Box marginTop="24px" />
        </Container>
    )
}

export default GetAddress;