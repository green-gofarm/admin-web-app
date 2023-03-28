import { memo, useCallback, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { Box, CircularProgress, Dialog, DialogContent, Grid } from '@mui/material';
import CustomizedDialogActions from '../../../../../General/Dialog/CustomizedDialogActions';
import { Add, DeleteForever } from '@mui/icons-material';
import useContactInfo from '../../../../Management/Farmstay/FarmstayDetail/hooks/useContactInfo';
import { ContactItem } from '../../create-farmstay/CreateFarmstay';
import { isAvailableArray } from '../../../../../../helpers/arrayUtils';
import useDelayLoading from '../../../../../../hooks/useDelayLoading';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/redux-setting';
import { updateFarmstay } from '../../../../../../redux/farmstay/action';
import { toast } from 'react-toastify';

interface UpdateFarmstayContactInfoProps {
    open?: boolean,
    farmstay?: any,
    onClose: () => void,
    onSuccessCallback?: any,
}

function UpdateFarmstayContactInfo({
    open,
    farmstay,
    onClose,
    onSuccessCallback,
}: UpdateFarmstayContactInfoProps) {

    const defaultContactInfo = useContactInfo(farmstay);

    const [contactInfo, setContactInfo] = useState<ContactItem[]>(
        isAvailableArray(defaultContactInfo)
            ? defaultContactInfo
            : [{ method: "", value: "" }]
    );

    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const delay = useDelayLoading(loading);

    const handleAdd = () => {
        setContactInfo(prev => [...prev, {
            method: "",
            value: "",
        }])
    }

    const handleUpdate = useCallback((key: string, value: string, index: number) => {
        setContactInfo(prev => {
            return prev.map((item, i) => {
                if (i === index) {
                    return {
                        ...item,
                        [key]: value
                    };
                }
                return item;
            });
        });
    }, []);

    const handleRemove = useCallback((index: number) => {
        setContactInfo(prev => {
            return prev.filter((item, i) => i !== index);
        });
    }, []);

    const handleClose = () => {
        onClose && onClose();
    }

    const validate = (contactInfo: ContactItem[]) => {
        if (contactInfo.length === 0) {
            setError('Vui lòng cung cấp ít nhất 1 phương thức liên lạc.');
            return false;
        }

        const hasOneValid = contactInfo.find((item) => !!item.method && !!item.value);

        if (!hasOneValid) {
            setError('Vui lòng cung cấp ít nhất 1 phương thức liên lạc.');
            return false;
        }

        setError("");
        return true;
    }

    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);
    const handleSubmit = () => {
        if (!farmstay?.id) return;
        if (!user?.id) return;
        if (!validate(contactInfo)) return;

        const validContactItems = contactInfo.filter((item) => !!item.method && !!item.value);
        const json = JSON.stringify(validContactItems);

        dispatch(updateFarmstay(
            user.id,
            farmstay.id,
            { contactInformation: json },
            {
                loading: setLoading,
                onSuccess: () => {
                    onSuccessCallback() && onSuccessCallback();
                    onClose && onClose();
                    toast.success("Cập nhật thành công");
                },
                onFailure: () => {
                    toast.error("Cập nhật thất bại");
                }
            }
        ))
    }

    const renderContent = () => (
        <Box
            display="flex"
            flexDirection="column"
            gap="1rem"
        >
            <Box className='h5 card-title mb-0'>
                Phương thức liên lạc
            </Box>

            <Grid container spacing={2}>
                {contactInfo.map((item: any, index) =>
                    <Grid item xs={12} md={6} key={index}>
                        <Box
                            display="flex"
                            alignItems="center"
                            width="100%"
                            gap="8px"
                        >
                            <Box flexGrow={1}>
                                <Form.Control
                                    value={item.method ?? ""}
                                    type="text"
                                    className="form-control"
                                    required
                                    autoFocus={!item.method}
                                    onChange={(e) => handleUpdate("method", e.target.value ?? "", index)}
                                    placeholder="Tên phương thức"
                                />
                            </Box>
                            <Box flexGrow={2}>
                                <Form.Control
                                    value={item.value ?? ""}
                                    type="text"
                                    className="form-control"
                                    required
                                    autoFocus={index === 0}
                                    onChange={(e) => handleUpdate("value", e.target.value ?? "", index)}
                                    placeholder=""
                                />
                            </Box>
                            <Box className="btn btn-secondary shadow" onClick={() => handleRemove(index)}>
                                <DeleteForever />
                            </Box>
                        </Box>
                    </Grid>
                )}

                <Grid item xs={12}>
                    <Box className="btn btn-primary shadow" onClick={handleAdd}>
                        <Add /> Thêm phương thức khác
                    </Box>
                </Grid>

                {error
                    ? <Grid item xs={12}>
                        <Form.Control.Feedback
                            style={{ display: "inline-block" }}
                            type="invalid"
                        >
                            {error}
                        </Form.Control.Feedback>
                    </Grid>
                    : null
                }
            </Grid>
        </Box >
    )

    return (
        <Dialog
            open={Boolean(open)}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
        >
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
                    onClick={handleSubmit}
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

export default memo(UpdateFarmstayContactInfo);