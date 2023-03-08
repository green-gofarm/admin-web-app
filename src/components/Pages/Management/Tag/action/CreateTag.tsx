import { memo } from 'react'
import { Button, Form, FormGroup } from 'react-bootstrap';
import { Dialog, DialogContent, Grid } from '@mui/material';
import CustomizedDialogTitle from '../../../../General/Dialog/CustomizedDialogTitle';
import CustomizedDialogActions from '../../../../General/Dialog/CustomizedDialogActions';

interface _ICreateTag {
    open?: boolean,
    refresh?: any,
    onClose: Function
}

function CreateTag({
    open,
    refresh,
    onClose,
}: _ICreateTag) {


    const handleSubmit = () => {
        onClose && onClose();
        refresh && refresh();
    }

    const handleClose = () => {
        onClose && onClose();
        refresh && refresh();
    }

    return (
        <Dialog
            open={Boolean(open)}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
        >
            <CustomizedDialogTitle
                title="Thêm thẻ mới"
                onClose={handleClose}
            />
            <DialogContent>
                <Form className="">
                    <FormGroup className="form-group ">
                        <Grid container>
                            <Grid item xs={12}>
                                <Form.Label className="form-label">
                                    Tên
                                </Form.Label>

                            </Grid>

                            <Grid item xs={12}>
                                <Form.Control
                                    autoFocus
                                    type="text"
                                    className="form-control"
                                />
                            </Grid>
                        </Grid>
                    </FormGroup>

                    <FormGroup className="form-group ">
                        <Grid container>
                            <Grid item xs={12}>
                                <Form.Label className="form-label">
                                    Mô tả
                                </Form.Label>

                            </Grid>

                            <Grid item xs={12}>
                                <textarea
                                    className="form-control"
                                    rows={3}
                                    defaultValue=""
                                    required
                                ></textarea>
                            </Grid>
                        </Grid>
                    </FormGroup>
                </Form>
            </DialogContent>

            <CustomizedDialogActions>
                <Button variant="secondary" onClick={handleClose}>
                    Hủy
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Xác nhận
                </Button>
            </CustomizedDialogActions>
        </Dialog>
    )
}

export default memo(CreateTag);