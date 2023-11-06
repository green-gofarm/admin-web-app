import { memo, useMemo, useState } from 'react'
import { Box, CircularProgress, Dialog, DialogContent, Grid } from '@mui/material';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import useDelayLoading from '../../../../../hooks/useDelayLoading';
import CustomizedDialogTitle from '../../../../General/Dialog/CustomizedDialogTitle';
import CustomizedDialogActions from '../../../../General/Dialog/CustomizedDialogActions';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';
import { reviewFarmstay } from '../../../../../redux/farmstay/action';
import { toast } from 'react-toastify';
import { FARMSTAY_STATUSES } from '../../../../../setting/farmstay-setting';

export const farmstayCriteriaObj = {
    "Tên thích hợp, không vi phạm giá trị truyền thống, lịch sử và thuần phong mỹ tục": false,
    "Có mô tả tổng quan về farmstay.": false,
    "Có ít nhất 2 hương thức liên hệ, bao gồm hotline (số điện thoại).": false,
    "Có ảnh đại diện.": false,
    "Có ít nhất 5 hình ảnh rõ nét về farmstay.": false,
    "Có địa chỉ rõ ràng, vị trí trên bản đồ khớp với địa chỉ bằng chữ.": false,
    "Có ít nhất 1 hoạt động": false,
    "Có ít nhất 1 phòng": false,
    "Có ít nhất 1 dịch vụ": false,
    "Có ít nhất 1 quy định.": false,
}

export const activityCriteriaObj = {
    "Tên thích hợp, không vi phạm giá trị truyền thống, lịch sử và thuần phong mỹ tục": false,
    "Có ảnh đại diện.": false,
    "Có ít nhất 2 hình ảnh rõ nét về hoạt động.": false,
    "Phần mô tả cần có thêm khung giờ tham gia.": false,
    "Giá vé thấp nhất 10.000đ": false,
}

export const roomCriteriaObj = {
    "Tên thích hợp, không vi phạm giá trị truyền thống, lịch sử và thuần phong mỹ tục": false,
    "Có ảnh đại diện.": false,
    "Có ít nhất 2 hình ảnh rõ nét mô tả phòng ở.": false,
    "Có mô tả tổng quan về phòng": false,
    "Giá tiền phòng phải lớn hơn 100.000đ/ngày": false,
}

export const serviceCriteriaObj = {
    "Tên thích hợp, không vi phạm giá trị truyền thống, lịch sử và thuần phong mỹ tục": false,
    "Có ảnh đại diện.": false,
    "Cần có mô tả rõ ràng.": false,
}

export const policyCriteriaObj = {
    "Tên chí cần phù hợp, có nội dụng mô tả rõ ràng": false,
    "Có tối thiểu 1 quy định về thời gian nhận/trả phòng": false,
}

const renderCriteriaCheckboxes = (
    criteria: object,
    setCriteria: Function
) => {
    return Object.entries(criteria).map(([criterion, checked]) => (
        <Form.Label className="custom-control custom-checkbox" key={criterion}>
            <Form.Control
                type="checkbox"
                className="custom-control-input"
                name={criterion}
                value={criterion}
                checked={checked}
                onChange={() => {
                    setCriteria({ ...criteria, [criterion]: !checked });
                }}
            />
            <Box
                component="span"
                className="custom-control-label"
                color="#7987a1"
            >
                {criterion}
            </Box>
        </Form.Label>
    ));
};

export const mergeExtrasWithObjects = (data: object | null, defaultObjects: object) => {
    const mergedObjects: { [key: string]: boolean } = { ...defaultObjects };
    console.log(data);
    if (data) {
        Object.entries(data).forEach(([key, value]) => {
            mergedObjects[key] = !!value;
        });
    }
    return mergedObjects;
};

const isAllChecked = (criteriaObjects: object) => {
    return Object.values(criteriaObjects).every(criteria => {
        return Object.values(criteria).every(value => value === true);
    });
};

interface ApproveFarmstayProps {
    open?: boolean,
    farmstay?: any,
    onSuccessCallback: () => void,
    onClose: () => void,
    refresh: () => void
}

function ApproveFarmstay({
    open,
    farmstay,
    onSuccessCallback,
    refresh,
    onClose,
}: ApproveFarmstayProps) {

    const dispatch = useDispatch();
    const [loadingSave, setLoadingSave] = useState<boolean>(false);
    const delaySave = useDelayLoading(loadingSave);

    const [loadingPreview, setLoadingPreview] = useState<boolean>(false);
    const delayPreview = useDelayLoading(loadingPreview);

    const extras = useMemo(() => {
        try {
            if (!farmstay?.extras || farmstay.extras === "") return null;
            return JSON.parse(farmstay.extras);
        } catch {
            return null;
        }
    }, [farmstay?.extras]);

    const [farmstayDetailCriteria, setFarmstayDetailCriteria] = useState<{ [key: string]: boolean }>(mergeExtrasWithObjects(extras?.farmstayDetailCriteria, farmstayCriteriaObj));
    const [activityCriteria, setActivityCriteria] = useState<{ [key: string]: boolean }>(mergeExtrasWithObjects(extras?.activityCriteria, activityCriteriaObj));
    const [roomCriteria, setRoomCriteria] = useState<{ [key: string]: boolean }>(mergeExtrasWithObjects(extras?.roomCriteria, roomCriteriaObj));
    const [serviceCriteria, setServiceCriteria] = useState<{ [key: string]: boolean }>(mergeExtrasWithObjects(extras?.serviceCriteria, serviceCriteriaObj));
    const [policyCriteria, setPolicyCriteria] = useState<{ [key: string]: boolean }>(mergeExtrasWithObjects(extras?.policyCriteria, policyCriteriaObj));


    const handleSave = () => {
        const extrasJson = JSON.stringify({
            farmstayDetailCriteria,
            activityCriteria,
            roomCriteria,
            serviceCriteria,
            policyCriteria,
        });

        dispatch(reviewFarmstay(
            farmstay?.id,
            {
                extras: extrasJson,
                status: farmstay.status
            },
            {
                loading: setLoadingSave,
                onSuccess: () => {
                    toast.success("Lưu thành công.");
                    refresh();
                },
                onFailure: () => {
                    toast.error("Lưu thất bại");
                }
            })
        )
    }

    const handleSend = () => {
        const extras = {
            farmstayDetailCriteria,
            activityCriteria,
            roomCriteria,
            serviceCriteria,
            policyCriteria,
        }

        const isCheckedAll = isAllChecked(extras);

        dispatch(reviewFarmstay(
            farmstay?.id,
            {
                extras: JSON.stringify(extras),
                status: isCheckedAll ? FARMSTAY_STATUSES.ACTIVE : FARMSTAY_STATUSES.DRAFT
            },
            {
                loading: setLoadingPreview,
                onSuccess: () => {
                    toast.success("Phê duyệt thành công.");
                    onClose();
                    onSuccessCallback();
                },
                onFailure: () => {
                    toast.error("Gửi thất bại");
                }
            })
        )
    }


    const renderContent = () => (
        <Grid
            container
            spacing={2}
            sx={{ padding: "1rem" }}
        >
            <Grid item xs={12}>
                <h5>1. Farmstay cần có đầy đủ thông tin</h5>
                {renderCriteriaCheckboxes(farmstayDetailCriteria, setFarmstayDetailCriteria)}
            </Grid>
            <Grid item xs={12}>
                <h5>2. Tiêu chí về hoạt động trong farmstay</h5>
                {renderCriteriaCheckboxes(activityCriteria, setActivityCriteria)}
            </Grid>
            <Grid item xs={12}>
                <h5>3. Tiêu chí về phòng trong farmstay</h5>
                {renderCriteriaCheckboxes(roomCriteria, setRoomCriteria)}
            </Grid>
            <Grid item xs={12}>
                <h5>4. Tiêu chí về dịch vụ</h5>
                {renderCriteriaCheckboxes(serviceCriteria, setServiceCriteria)}
            </Grid>
            <Grid item xs={12}>
                <h5>5. Tiêu chí về quy định</h5>
                {renderCriteriaCheckboxes(policyCriteria, setPolicyCriteria)}
            </Grid>
        </Grid>
    )

    return (
        <Dialog
            open={Boolean(open)}
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >
            <CustomizedDialogTitle
                title='Phê duyệt farmstay'
                onClose={onClose}
            />
            <DialogContent>
                {renderContent()}
            </DialogContent>

            <CustomizedDialogActions>
                <Button
                    variant="info"
                    onClick={handleSave}
                    disabled={delaySave || delayPreview}
                >
                    <Box
                        display="flex"
                        alignItems="center"
                        gap="8px"
                    >
                        {delaySave
                            ? <CircularProgress size={16} thickness={4} sx={{ color: "#fff" }} />
                            : <SaveIcon />
                        }
                        Lưu
                    </Box>
                </Button>
                <Button
                    variant="primary"
                    onClick={handleSend}
                    disabled={delaySave || delayPreview}
                >
                    <Box
                        display="flex"
                        alignItems="center"
                        gap="8px"
                    >
                        {delayPreview
                            ? <CircularProgress size={16} thickness={4} sx={{ color: "#fff" }} />
                            : <SendIcon />
                        }
                        Gửi đánh giá
                    </Box>
                </Button>
            </CustomizedDialogActions>
        </Dialog>
    )
}

export default memo(ApproveFarmstay);