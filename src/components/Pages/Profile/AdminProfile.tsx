import { Box, Button, Grid } from '@mui/material';
import { Card, FormGroup, Form, Nav, Tab } from 'react-bootstrap';
import PageHeader, { IBreadcrumbItem } from '../../General/PageHeader';
import { formatTimeString } from '../../../helpers/dateUtils';
import IconLabelDetail from '../../General/Item/IconLabelDetail';
import { useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';

const breadcrumb: Array<IBreadcrumbItem> = [

]

const detail = {
    "email": "trongldse151359@fpt.edu.vn",
    "name": "Lê Danh Trọng",
    phoneNumber: "0901111111",
    firstName: "Lê",
    lastName: "Trọng",
    role: "admin",
    gender: 1,
    grade: null,
    status: 1,
    birthday: null,
    address: "160 Pasteur, phường 6, quận 3, thành phố Hồ Chí Minh",
    avatarURL: null,
    createdDate: "2022-05-04 11:45:00",
    updatedDate: "2022-05-04 11:45:00",
    userId: 46,
    id: 2,
    uuid: null
};

function AdminProfile() {

    const [openEdit, setOpenEdit] = useState(false);

    return (
        <Box marginBottom="1.3rem">
            {/* <!-- breadcrumb --> */}
            <PageHeader
                title="Hồ sơ cá nhân"
                breadcrumb={breadcrumb}
            />

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card className="custom-card customs-cards">
                        <Card.Body className=" d-md-flex bg-white">
                            <div className="">
                                <span className="pos-relative">
                                    <Box
                                        component="img"
                                        className="br-5 "
                                        alt=""
                                        src={require("../../../assets/img/faces/profile.jpg")}
                                        sx={{
                                            position: "relative",
                                            width: "140px",
                                            height: "140px",
                                            backgroundPosition: "center",
                                            backgroundSize: "cover",
                                            backgroundRepeat: "no-repeat"
                                        }}
                                    />
                                    <span className="bg-success text-white wd-1 ht-1 rounded-pill profile-online"></span>
                                </span>
                            </div>
                            <Box flexGrow={1} className="prof-details" margin="0 0 4px 24px">
                                <Grid container spacing={0}>
                                    <Grid item xs={12}>
                                        <h4 className="font-weight-semibold">
                                            {detail.name}
                                        </h4>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <IconLabelDetail
                                            icon={<i className="fa fa-phone me-2"></i>}
                                            label="Sđt:"
                                            value={detail.phoneNumber}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <IconLabelDetail
                                            icon={<i className="fa fa-envelope me-2"></i>}
                                            label="Email:"
                                            value={detail.email}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <IconLabelDetail
                                            icon={<i className="fa fa-window-restore me-2"></i>}
                                            label="Ngày tham gia hệ thống:"
                                            value={formatTimeString(detail.createdDate)}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box
                                display="flex"
                                alignItems="flex-end"
                                justifyContent="flex-end"
                                gap="8px"
                            >
                                {openEdit
                                    ? <>
                                        <Button
                                            color="error"
                                            variant="outlined"
                                            size="small"
                                            onClick={() => setOpenEdit(false)}
                                        >
                                            Hủy
                                        </Button>
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            size="small"
                                            onClick={() => setOpenEdit(false)}
                                            startIcon={<SaveIcon />}
                                        >
                                            Lưu
                                        </Button>
                                    </>
                                    : <Button
                                        color="primary"
                                        variant="contained"
                                        size="small"
                                        onClick={() => setOpenEdit(true)}
                                        startIcon={<EditIcon />}
                                    >
                                        Cập nhật
                                    </Button>
                                }
                            </Box>
                        </Card.Body>
                    </Card>
                    <div className="profile-tab tab-menu-heading">
                        <Tab.Container id="left-tabs-example" defaultActiveKey="About">
                            <Grid
                                container
                                spacing={2}
                            >
                                <Grid item xs={12}>
                                    <Nav
                                        variant="pills"
                                        className="nav profile-tabs main-nav-line tabs-menu profile-nav-line bg-white border-0 br-5 mb-0	"
                                    >
                                        <Nav.Item className="me-1">
                                            <Nav.Link className=" mb-2 mt-2" eventKey="About">
                                                Thông tin cá nhân
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item className="me-1">
                                            <Nav.Link className="mb-2 mt-2" eventKey="AccountSettings">
                                                Cài đặt
                                            </Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Grid>

                                <Grid item xs={12}>
                                    <div className="custom-card main-content-body-profile">
                                        <Tab.Content>
                                            <Tab.Pane eventKey="About">
                                                <Box
                                                    className="main-content-body tab-pane  border-0"
                                                >
                                                    <Card>
                                                        <Card.Body
                                                            className=" border-0"
                                                            data-select2-id="12"
                                                        >
                                                            <Form className="form-horizontal">
                                                                <div className="mb-4 main-content-label">
                                                                    Tên
                                                                </div>

                                                                <FormGroup className="form-group ">
                                                                    <Grid container>
                                                                        <Grid item xs={12} md={3}>
                                                                            <Form.Label className="form-label">
                                                                                Tên đầy đủ
                                                                            </Form.Label>

                                                                        </Grid>

                                                                        <Grid item xs={12} md={9}>
                                                                            <Form.Control
                                                                                type="text"
                                                                                className="form-control"
                                                                                defaultValue={detail.name}
                                                                                disabled={!openEdit}
                                                                            />
                                                                        </Grid>
                                                                    </Grid>
                                                                </FormGroup>
                                                                <FormGroup className="form-group ">
                                                                    <Grid container>
                                                                        <Grid item xs={12} md={3}>
                                                                            <Form.Label className="form-label">
                                                                                Họ
                                                                            </Form.Label>

                                                                        </Grid>

                                                                        <Grid item xs={12} md={9}>
                                                                            <Form.Control
                                                                                type="text"
                                                                                className="form-control"
                                                                                defaultValue={detail.firstName}
                                                                                disabled={!openEdit}
                                                                            />

                                                                        </Grid>
                                                                    </Grid>
                                                                </FormGroup>
                                                                <FormGroup className="form-group ">
                                                                    <Grid container>
                                                                        <Grid item xs={12} md={3}>
                                                                            <Form.Label className="form-label">
                                                                                Họ
                                                                            </Form.Label>

                                                                        </Grid>

                                                                        <Grid item xs={12} md={9}>
                                                                            <Form.Control
                                                                                type="text"
                                                                                className="form-control"
                                                                                defaultValue={detail.lastName}
                                                                                disabled={!openEdit}
                                                                            />

                                                                        </Grid>
                                                                    </Grid>
                                                                </FormGroup>
                                                                <div className="mb-4 main-content-label">
                                                                    Thông tin liên hệ
                                                                </div>
                                                                <FormGroup className="form-group ">
                                                                    <Grid container>
                                                                        <Grid item xs={12} md={3}>
                                                                            <Form.Label className="form-label">
                                                                                Email<i>(required)</i>
                                                                            </Form.Label>

                                                                        </Grid>

                                                                        <Grid item xs={12} md={9}>
                                                                            <Form.Control
                                                                                type="text"
                                                                                className="form-control"
                                                                                defaultValue={detail.email}
                                                                                disabled={!openEdit}
                                                                            />

                                                                        </Grid>
                                                                    </Grid>
                                                                </FormGroup>
                                                                <FormGroup className="form-group ">
                                                                    <Grid container>
                                                                        <Grid item xs={12} md={3}>
                                                                            <Form.Label className="form-label">
                                                                                Số điện thoại
                                                                            </Form.Label>

                                                                        </Grid>

                                                                        <Grid item xs={12} md={9}>
                                                                            <Form.Control
                                                                                type="text"
                                                                                className="form-control"
                                                                                defaultValue={detail.phoneNumber}
                                                                                disabled={!openEdit}
                                                                            />
                                                                        </Grid>
                                                                    </Grid>

                                                                </FormGroup>

                                                                <FormGroup className="form-group ">
                                                                    <Grid container>
                                                                        <Grid item xs={12} md={3}>
                                                                            <Form.Label className="form-label">
                                                                                Địa chỉ
                                                                            </Form.Label>
                                                                        </Grid>

                                                                        <Grid item xs={12} md={9}>
                                                                            <textarea
                                                                                className="form-control"
                                                                                name="example-textarea-input"
                                                                                rows={2}
                                                                                defaultValue={detail.address}
                                                                                disabled={!openEdit}
                                                                            ></textarea>
                                                                        </Grid>
                                                                    </Grid>
                                                                </FormGroup>

                                                            </Form>
                                                        </Card.Body>
                                                    </Card>
                                                </Box>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="AccountSettings">
                                                <Box
                                                    className="main-content-body tab-pane  border-0"
                                                >
                                                    <Card>
                                                        <Card.Body
                                                            className=" border-0"
                                                            data-select2-id="12"
                                                        >
                                                            <Form aria-disabled="true">
                                                                <div>
                                                                    <div className="mb-4 main-content-label">
                                                                        Tài khoản
                                                                    </div>
                                                                    <FormGroup className="form-group ">
                                                                        <Grid container>
                                                                            <Grid item xs={12} md={3}>
                                                                                <Form.Label className="form-label">
                                                                                    Email nhận thông báo
                                                                                </Form.Label>
                                                                            </Grid>

                                                                            <Grid item xs={12} md={9}>
                                                                                <Form.Control
                                                                                    type="text"
                                                                                    disabled={!openEdit}
                                                                                    className="form-control"
                                                                                    defaultValue={detail.email}
                                                                                />
                                                                            </Grid>
                                                                            <Grid item xs={12} md={3}>
                                                                                <Form.Label className="form-label">
                                                                                    Phương thức xác thực
                                                                                </Form.Label>
                                                                            </Grid>

                                                                            <Grid item xs={12} md={9}>
                                                                                <Form.Label className="ckbox  mg-b-10">
                                                                                    <input type="checkbox" disabled={!openEdit} />
                                                                                    <span>Email</span>
                                                                                </Form.Label>
                                                                                <Form.Label className="ckbox  mg-b-10">
                                                                                    <input defaultChecked type="checkbox" disabled={!openEdit} />
                                                                                    <span>Tin nhắn</span>
                                                                                </Form.Label>
                                                                                <Form.Label className="ckbox  mg-b-10">
                                                                                    <input type="checkbox" disabled={!openEdit} />
                                                                                    <span>Điện thoại</span>
                                                                                </Form.Label>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </FormGroup>
                                                                </div>

                                                                <div>
                                                                    <div className="mb-4 main-content-label">
                                                                        Thông báo
                                                                    </div>
                                                                    <FormGroup className="form-group mb-0">
                                                                        <Grid container>
                                                                            <Grid item xs={12} md={3}>
                                                                                Cài đặt thông báo
                                                                            </Grid>

                                                                            <Grid item xs={12} md={9}>
                                                                                <Form.Label className="d-block mg-b-15-f">
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        name="custom-switch-checkbox"
                                                                                        className="custom-switch-input"
                                                                                        defaultChecked
                                                                                        disabled={!openEdit}
                                                                                    />
                                                                                    <span className="custom-switch-indicator"></span>
                                                                                    <span className="text-muted ms-2">
                                                                                        Nhận tất cả thông báo
                                                                                    </span>
                                                                                </Form.Label>
                                                                                <Form.Label className="d-block mg-b-15-f">
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        name="custom-switch-checkbox"
                                                                                        className="custom-switch-input"
                                                                                        disabled={!openEdit}
                                                                                    />
                                                                                    <span className="custom-switch-indicator"></span>
                                                                                    <span className="text-muted ms-2">
                                                                                        Tắt nhận thông báo
                                                                                    </span>
                                                                                </Form.Label>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </FormGroup>
                                                                </div>
                                                            </Form>
                                                        </Card.Body>
                                                    </Card>
                                                </Box>
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </div>
                                </Grid>
                            </Grid>
                        </Tab.Container>
                    </div>
                </Grid>
            </Grid>
        </Box >
    )
}

export default AdminProfile;