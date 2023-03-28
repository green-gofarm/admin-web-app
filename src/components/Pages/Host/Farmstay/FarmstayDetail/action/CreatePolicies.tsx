import { memo, useCallback, useState } from 'react'
import { Button, Form, FormGroup } from 'react-bootstrap';
import { Box, CircularProgress, Dialog, DialogContent, Grid } from '@mui/material';
import CustomizedDialogActions from '../../../../../General/Dialog/CustomizedDialogActions';
import { Add, DeleteForever } from '@mui/icons-material';
import useDelayLoading from '../../../../../../hooks/useDelayLoading';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/redux-setting';
import { createFarmstayPolicies } from '../../../../../../redux/farmstay/action';
import { toast } from 'react-toastify';
import CustomizedDialogTitle from '../../../../../General/Dialog/CustomizedDialogTitle';

interface PolicyItem {
    name: string,
    description: string
}

interface CreatePolicyProps {
    open?: boolean,
    farmstay?: any,
    onClose: () => void,
    onSuccessCallback?: any,
}

function CreatePolicies({
    open,
    farmstay,
    onClose,
    onSuccessCallback,
}: CreatePolicyProps) {

    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);

    const [policies, setPolicies] = useState<PolicyItem[]>([{ name: "", description: "" }]);

    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const delay = useDelayLoading(loading);

    const handleAdd = () => {
        setPolicies(prev => [...prev, {
            name: "",
            description: "",
        }])
    }

    const handleUpdate = useCallback((key: string, value: string, index: number) => {
        setPolicies(prev => {
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
        setPolicies(prev => {
            return prev.filter((item, i) => i !== index);
        });
    }, []);

    const handleClose = () => {
        onClose && onClose();
    }

    const validate = (policies: PolicyItem[]) => {
        const hasOneNotValid = policies.find((item) => !item.name || !item.description);

        if (hasOneNotValid) {
            setError('Quy định phải có đầy đủ tiêu chí và nội dung.');
            return false;
        }

        setError("");
        return true;
    }

    const handleSubmit = () => {
        if (!farmstay?.id) return;
        if (!user?.id) return;
        if (!validate(policies)) return;

        dispatch(createFarmstayPolicies(
            user.id,
            farmstay.id,
            policies,
            {
                loading: setLoading,
                onSuccess: () => {
                    onSuccessCallback() && onSuccessCallback();
                    onClose && onClose();
                    toast.success("Thêm mới thành công");
                },
                onFailure: () => {
                    toast.error("Thêm mới thất bại");
                }
            }
        ))
    }

    const renderContent = () => (

        <Grid container spacing={2}>
            {policies.map((item: any, index) =>
                <>
                    <Grid item xs={12} key={index}>
                        <Box
                            display="flex"
                            alignItems="center"
                            width="100%"
                            gap="8px"
                        >
                            <Box flexGrow={1}>
                                <Form.Control
                                    value={item.name ?? ""}
                                    type="text"
                                    className="form-control"
                                    required
                                    autoFocus={!item.name}
                                    onChange={(e) => handleUpdate("name", e.target.value ?? "", index)}
                                    placeholder="Tiêu chí"
                                />
                            </Box>
                            <Box className="btn btn-secondary shadow" onClick={() => handleRemove(index)}>
                                <DeleteForever />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <FormGroup>
                            <textarea
                                value={item.description ?? ""}
                                className="form-control"
                                onChange={(e) => handleUpdate("description", e.target.value ?? "", index)}
                                placeholder="Nội dung"
                            />
                        </FormGroup>
                    </Grid>
                </>
            )}

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
    )

    return (
        <Dialog
            open={Boolean(open)}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
        >
            <CustomizedDialogTitle
                title='Thêm quy định'
                onClose={onClose}
            />
            <DialogContent>
                {renderContent()}
            </DialogContent>

            <CustomizedDialogActions>
                <Box
                    width="100%"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Box className="btn btn-primary shadow" onClick={handleAdd}>
                        <Add /> Thêm quy định
                    </Box>

                    <Box
                        display="flex"
                        alignItems="center"
                        gap="8px"
                    >
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
                    </Box>
                </Box>

            </CustomizedDialogActions>
        </Dialog>
    )
}

export default memo(CreatePolicies);