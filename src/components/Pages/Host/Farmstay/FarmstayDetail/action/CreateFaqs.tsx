import { memo, useCallback, useState } from 'react'
import { Button, Form, FormGroup } from 'react-bootstrap';
import { Box, CircularProgress, Dialog, DialogContent, Grid } from '@mui/material';
import CustomizedDialogActions from '../../../../../General/Dialog/CustomizedDialogActions';
import { Add, DeleteForever } from '@mui/icons-material';
import useDelayLoading from '../../../../../../hooks/useDelayLoading';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/redux-setting';
import { createFarmstayFaqs } from '../../../../../../redux/farmstay/action';
import { toast } from 'react-toastify';
import CustomizedDialogTitle from '../../../../../General/Dialog/CustomizedDialogTitle';

interface FAQItem {
    question: string,
    answer: string
}

interface CreateFaqsProps {
    open?: boolean,
    farmstay?: any,
    onClose: () => void,
    onSuccessCallback?: any,
}

function CreateFaqs({
    open,
    farmstay,
    onClose,
    onSuccessCallback,
}: CreateFaqsProps) {

    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);

    const [faqs, setFaqs] = useState<FAQItem[]>([{ question: "", answer: "" }]);

    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const delay = useDelayLoading(loading);

    const handleAdd = () => {
        setFaqs(prev => [...prev, {
            question: "",
            answer: "",
        }])
    }

    const handleUpdate = useCallback((key: string, value: string, index: number) => {
        setFaqs(prev => {
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
        setFaqs(prev => {
            return prev.filter((item, i) => i !== index);
        });
    }, []);

    const handleClose = () => {
        onClose && onClose();
    }

    const validate = (faqs: FAQItem[]) => {
        const hasOneNotValid = faqs.find((item) => !item.question || !item.answer);

        if (hasOneNotValid) {
            setError('FAQ phải có đầy đủ câu hỏi và câu trả lời');
            return false;
        }

        setError("");
        return true;
    }

    const handleSubmit = () => {
        if (!farmstay?.id) return;
        if (!user?.id) return;
        if (!validate(faqs)) return;

        dispatch(createFarmstayFaqs(
            user.id,
            farmstay.id,
            faqs,
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
            {faqs.map((item: any, index) =>
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
                                    value={item.question ?? ""}
                                    type="text"
                                    className="form-control"
                                    required
                                    autoFocus={!item.question}
                                    onChange={(e) => handleUpdate("question", e.target.value ?? "", index)}
                                    placeholder="Câu hỏi"
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
                                value={item.answer ?? ""}
                                className="form-control"
                                onChange={(e) => handleUpdate("answer", e.target.value ?? "", index)}
                                placeholder="Trả lời"
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
                title='Thêm câu hỏi'
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
                        <Add /> Thêm câu hỏi
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

export default memo(CreateFaqs);