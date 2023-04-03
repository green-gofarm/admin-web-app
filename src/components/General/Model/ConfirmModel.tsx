import { Box, CircularProgress } from '@mui/material';
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
    confirmButtonText?: string
}

const ConfirmModel = ({
    open,
    onCancel = () => { },
    onConfirm = () => { },

    description = "Bạn chắc chắn chứ?",
    title = "Xác nhận",
    loading,
    confirmButtonText,
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
                <Button
                    variant="secondary"
                    onClick={onCancel}
                    disabled={loading}
                >
                    Hủy
                </Button>
                <Button
                    variant="primary"
                    onClick={onConfirm}
                    disabled={loading}
                >
                    <Box
                        display="flex"
                        alignItems="center"
                        gap="8px"
                    >
                        {loading
                            ? <CircularProgress size={16} thickness={4} sx={{ color: "#fff" }} />
                            : null
                        }
                        {confirmButtonText ?? "Xác nhận"}
                    </Box>
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ConfirmModel;
