import { memo, useCallback, useEffect, useState } from 'react'
import { Button, Form, FormGroup, InputGroup } from 'react-bootstrap';
import { Box, CircularProgress, Dialog, DialogContent, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/redux-setting';
import useDelayLoading from '../../../../../../hooks/useDelayLoading';
import { updateFarmstay } from '../../../../../../redux/farmstay/action';
import CustomizedDialogActions from '../../../../../General/Dialog/CustomizedDialogActions';
import { Address } from '../../create-farmstay/CreateFarmstay';
import useFarmstayAddress from '../../../../Management/Farmstay/FarmstayDetail/hooks/useFarmstayAddress';
import useProvinces from '../../hooks/useProvinces';
import useDistricts from '../../hooks/useDistricts';
import useWards from '../../hooks/useWards';
import VALIDATOR from './validator';
import makeStyles from '@mui/styles/makeStyles/makeStyles';
import CustomizedDialogTitle from '../../../../../General/Dialog/CustomizedDialogTitle';

const useStyles = makeStyles({
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
    name: string;
    description: string;
}

const initialErrors: Errors = {
    country: '',
    province: '',
    district: '',
    ward: '',
    detail: '',
    name: '',
    description: '',
};

interface UpdateFarmstayAvatarProps {
    open?: boolean,
    farmstay?: any,
    onClose: () => void,
    onSuccessCallback?: any,
}

interface BasicInfo {
    name: string | null,
    description: string | null,
}

function UpdateFarmstayBasic({
    open,
    farmstay,
    onClose,
    onSuccessCallback,
}: UpdateFarmstayAvatarProps) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);

    const defaultAddress = useFarmstayAddress(farmstay);

    const [loading, setLoading] = useState<boolean>(false);
    const delay = useDelayLoading(loading);

    const [provinceCode, setProvinceCode] = useState<any>(null);
    const [districtCode, setDistrictCode] = useState<any>(null);

    const { provinces, loading: loadingProvince } = useProvinces();
    const { districts, loading: loadingDistrict } = useDistricts(provinceCode);
    const { wards, loading: loadingWard } = useWards(districtCode);

    const [info, setInfo] = useState<BasicInfo>({
        name: "",
        description: "",
    })
    const [address, setAddress] = useState<Address>({
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

    useEffect(() => {
        if (farmstay) {
            setInfo({
                name: farmstay.name,
                description: farmstay.description,
            });
        }
    }, [farmstay]);

    useEffect(() => {
        if (defaultAddress) {
            setAddress(defaultAddress);
            setProvinceCode(defaultAddress.province.code);
            setDistrictCode(defaultAddress.district.code);
        }
    }, [defaultAddress]);

    const validate = () => {
        const tempAddress: { [key in keyof Address]: string } = {
            country: '',
            province: VALIDATOR.isRequired(address.province.name),
            district: VALIDATOR.isRequired(address.district.name),
            ward: VALIDATOR.isRequired(address.ward.name),
            detail: '',
        };

        const tempBasic: { [key in keyof BasicInfo]: string } = {
            name: VALIDATOR.isRequired(info.name),
            description: '',
        };


        setErrors({
            ...tempAddress,
            ...tempBasic,
        });
        return !Object.values(tempBasic).some(error => error !== '')
            && !Object.values(tempAddress).some(error => error !== '');
    };

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

    const handleOnChangeBasic = useCallback((key: keyof BasicInfo, value: any) => {
        setInfo(prev => ({
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

    const handleUpdate = () => {
        if (!user?.id) return;
        if (!farmstay?.id) return;
        if (!validate()) return;

        const data = {
            ...info,
            address: JSON.stringify(address)
        }

        dispatch(updateFarmstay(
            user.id,
            farmstay.id,
            data,
            {
                loading: setLoading,
                onSuccess: (response: any) => {
                    onClose && onClose();
                    onSuccessCallback && onSuccessCallback()
                    toast.success("Cập nhật thành công");
                },
                onFailure: () => {
                    toast.error("Cập nhật thất bại");
                }
            }))
    }

    const handleClose = () => {
        onClose && onClose();
    }

    const renderContent = () => (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormGroup>
                        <Form.Label>
                            Tên farmstay *
                        </Form.Label>
                        <Form.Control
                            aria-label="name"
                            className="form-control"
                            type="text"
                            onChange={(e) => handleOnChangeBasic("name", e.target.value ?? "")}
                            value={info.name ?? ""}
                        />
                    </FormGroup>
                    {errors.name
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
                    <FormGroup>
                        <Form.Label>
                            Mô tả
                        </Form.Label>
                        <textarea
                            className="form-control"
                            name="example-textarea-input"
                            rows={6}
                            placeholder="Mô tả"
                            onChange={(e) => handleOnChangeBasic("description", e.target.value ?? "")}
                            value={info.description ?? ""}
                        />
                    </FormGroup>
                </Grid>

                <Grid item xs={12}>
                    <Form.Label>
                        Địa chỉ
                    </Form.Label>
                </Grid>
                <Grid item xs={12} md={6}>
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
                <Grid item xs={12} md={6}>
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
                <Grid item xs={12} md={6}>
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
                <Grid item xs={12} md={6}>
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
            </Grid>
        </>
    )

    return (
        <Dialog
            open={Boolean(open)}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
        >
            <CustomizedDialogTitle
                title='Cập nhật thông tin'
                onClose={onClose}
            />
            <DialogContent>
                {renderContent()}
            </DialogContent>

            <CustomizedDialogActions>
                <Button
                    variant="secondary"
                    onClick={handleClose}
                    disabled={delay}
                >
                    Hủy
                </Button>
                <Button
                    variant="primary"
                    onClick={handleUpdate}
                    disabled={delay}
                >
                    <Box
                        display="flex"
                        alignItems="center"
                        gap="8px"
                    >
                        {delay
                            ? <CircularProgress size={16} thickness={4} sx={{ color: "#fff" }} />
                            : null
                        }
                        Lưu lại
                    </Box>

                </Button>
            </CustomizedDialogActions>
        </Dialog>
    )
}

export default memo(UpdateFarmstayBasic);