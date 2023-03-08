import { Box } from '@mui/material';
import { ReactNode } from 'react';
import { Modal, Button } from 'react-bootstrap';
import TooltipIconAction from '../Icon/TooltipIconAction';
import CloseIcon from "@mui/icons-material/Close";

interface IConfirmModel {
    open?: boolean,
    onCancel?: any,
    onConfirm?: any,

    title: string | ReactNode,
    description: string | ReactNode,
    loading?: boolean,
}

const ConfirmModel = ({
    open,
    onCancel = () => { },
    onConfirm = () => { },

    description = "Bạn chắc chắn chứ?",
    title = "Xác nhận",
    loading,
}: IConfirmModel) => {

    return (
        <Modal show={open} onExit={onCancel}>
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
                <TooltipIconAction
                    Icon={CloseIcon}
                    title='Đóng'
                    onClick={onCancel}
                />
            </Modal.Header>
            <Modal.Body>
                <Box>
                    {description}
                </Box>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onCancel}>
                    Hủy
                </Button>
                <Button variant="secondary" onClick={onConfirm}>
                    Xác nhận
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ConfirmModel;
