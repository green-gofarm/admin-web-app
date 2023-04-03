import { memo, useCallback, useState } from 'react'
import { Button, Form, FormGroup } from 'react-bootstrap';
import { Box, CircularProgress, Dialog, DialogContent, Grid } from '@mui/material';
import CustomizedDialogActions from '../../../../../General/Dialog/CustomizedDialogActions';
import useDelayLoading from '../../../../../../hooks/useDelayLoading';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/redux-setting';
import { toast } from 'react-toastify';
import CustomizedDialogTitle from '../../../../../General/Dialog/CustomizedDialogTitle';
import { updateFarmstayFaqs } from '../../../../../../redux/farmstay/action';
import InvalidFeedback from '../../../../../General/InvalidFeedback';


interface FAQItem {
    question: string,
    answer: string
}

interface UpdateFaqProps {
    open?: boolean,
    faq?: any,
    onClose: () => void,
    onSuccessCallback?: any,
}

function UpdateFaq({
    open,
    faq,
    onClose,
    onSuccessCallback,
}: UpdateFaqProps) {

    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);

    const [data, setData] = useState<FAQItem>({
        question: faq?.question ?? "",
        answer: faq?.answer ?? ""
    });

    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const delay = useDelayLoading(loading);

    const handleUpdate = useCallback((key: keyof FAQItem, value: string) => {
        setData(prev => ({
            ...prev,
            [key]: value
        }));
    }, []);

    const handleClose = () => {
        onClose && onClose();
    }

    const validate = (faq: FAQItem) => {
        const hasOneNotValid = !faq.question || !faq.answer

        if (hasOneNotValid) {
            setError('Quy định phải có đầy đủ tiêu chí và nội dung.');
            return false;
        }

        setError("");
        return true;
    }

    const handleSubmit = () => {
        if (!user?.id) return;
        if (!faq?.id) return;
        if (!faq?.farmstayId) return;
        if (!validate(data)) return;

        dispatch(updateFarmstayFaqs(
            user.id,
            faq.farmstayId,
            faq.id,
            data,
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

        <Grid container spacing={2}>
            <Grid item xs={12}>
                <FormGroup>
                    <Form.Label>
                        Câu hỏi
                    </Form.Label>
                    <Form.Control
                        value={data.question ?? ""}
                        type="text"
                        className="form-control"
                        required
                        autoFocus
                        onChange={(e) => handleUpdate("question", e.target.value ?? "")}
                    />
                </FormGroup>
            </Grid>
            <Grid item xs={12}>
                <FormGroup>
                    <Form.Label>
                        Nội dung trả lời
                    </Form.Label>
                    <textarea
                        value={data.answer ?? ""}
                        className="form-control"
                        onChange={(e) => handleUpdate("answer", e.target.value ?? "")}
                    />
                </FormGroup>
            </Grid>

            {error
                ? <Grid item xs={12}>
                    <InvalidFeedback message={error} />
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
                title='Cập nhật câu hỏi'
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
            </CustomizedDialogActions>
        </Dialog>
    )
}

export default memo(UpdateFaq);