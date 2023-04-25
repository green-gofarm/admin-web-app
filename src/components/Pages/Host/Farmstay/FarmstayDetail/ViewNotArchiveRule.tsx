import { memo, useMemo, useState } from 'react'
import { Box, Dialog, DialogContent, Grid } from '@mui/material';
import { Button } from 'react-bootstrap';
import CustomizedDialogTitle from '../../../../General/Dialog/CustomizedDialogTitle';
import CustomizedDialogActions from '../../../../General/Dialog/CustomizedDialogActions';
import { activityCriteriaObj, farmstayCriteriaObj, mergeExtrasWithObjects, policyCriteriaObj, roomCriteriaObj, serviceCriteriaObj } from '../../../Management/Farmstay/action/ApproveFarmstay';

const renderRule = (criteria: { [key: string]: boolean }) => {
    return Object.entries(criteria).map(([criterion, value]) => (
        <Box
            key={criterion}
            component="p"
            className={value ? "text-primary" : "text-danger"}
        >
            {`- ${criterion}`}
        </Box>
    ));
};

interface ViewNotArchiveRuleProps {
    open?: boolean,
    farmstay: any,
    onClose: () => void
}

function ViewNotArchiveRule({
    open,
    farmstay,
    onClose,
}: ViewNotArchiveRuleProps) {

    const extras = useMemo(() => {
        try {
            if (!farmstay?.extras || farmstay.extras === "") return null;
            return JSON.parse(farmstay.extras);
        } catch {
            return null;
        }
    }, [farmstay?.extras]);

    const [farmstayDetailCriteria] = useState<{ [key: string]: boolean }>(mergeExtrasWithObjects(extras?.farmstayDetailCriteria, farmstayCriteriaObj));
    const [activityCriteria] = useState<{ [key: string]: boolean }>(mergeExtrasWithObjects(extras?.activityCriteria, activityCriteriaObj));
    const [roomCriteria] = useState<{ [key: string]: boolean }>(mergeExtrasWithObjects(extras?.roomCriteria, roomCriteriaObj));
    const [serviceCriteria] = useState<{ [key: string]: boolean }>(mergeExtrasWithObjects(extras?.serviceCriteria, serviceCriteriaObj));
    const [policyCriteria] = useState<{ [key: string]: boolean }>(mergeExtrasWithObjects(extras?.policyCriteria, policyCriteriaObj));

    const renderContent = () => (
        <Grid
            container
            spacing={2}
            sx={{ padding: "1rem" }}
        >
            <Grid item xs={12}>
                <Box
                    fontStyle="italic"
                >
                    * Cần đạt được tất cả tiêu chí để kích hoạt farmstay.
                </Box>
                <Box
                    fontStyle="italic"
                >
                    * Các tiêu chí bị bôi đỏ là những tiêu chí chưa đạt.
                </Box>
            </Grid>
            <Grid item xs={12}>
                <h5>1. Farmstay cần có đầy đủ thông tin</h5>
                {renderRule(farmstayDetailCriteria)}
            </Grid>
            <Grid item xs={12}>
                <h5>2. Tiêu chí về hoạt động trong farmstay</h5>
                {renderRule(activityCriteria)}
            </Grid>
            <Grid item xs={12}>
                <h5>3. Tiêu chí về phòng trong farmstay</h5>
                {renderRule(roomCriteria)}
            </Grid>
            <Grid item xs={12}>
                <h5>4. Tiêu chí về dịch vụ</h5>
                {renderRule(serviceCriteria)}
            </Grid>
            <Grid item xs={12}>
                <h5>5. Tiêu chí về quy định</h5>
                {renderRule(policyCriteria)}
            </Grid>
        </Grid>
    )

    const handleClose = () => {
        onClose && onClose();
    }

    return (
        <Dialog
            open={Boolean(open)}
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >
            <CustomizedDialogTitle
                title='Tiêu chí cần bổ sung'
                onClose={onClose}
            />
            <DialogContent>
                {renderContent()}
            </DialogContent>

            <CustomizedDialogActions>
                <Button
                    variant=""
                    onClick={handleClose}
                >
                    Đóng
                </Button>
            </CustomizedDialogActions>
        </Dialog>
    )
}

export default memo(ViewNotArchiveRule);