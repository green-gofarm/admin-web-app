import { Box, Button, Grid } from '@mui/material';
import PageHeader, { IBreadcrumbItem } from '../../../../General/PageHeader';
import { useParams, useSearchParams } from 'react-router-dom';
import { createCodeString } from '../../../../../helpers/stringUtils';
import { Card, FormGroup, Form, Nav, Tab } from 'react-bootstrap';
import { formatTimeString } from '../../../../../helpers/dateUtils';
import MessageIcon from '@mui/icons-material/Message';
import LockIcon from '@mui/icons-material/Lock';
import DetailPageHeaderTitle from '../../../../General/DetailPageHeaderTitle';

const breadcrumb: Array<IBreadcrumbItem> = [
    {
        text: "Quản lý",
        href: "/management"
    },
    {
        text: "Tài khoản",
        href: "/management/account"
    },
    {
        text: "Quản trị viên",
        href: "/management/account/admin"
    },
    {
        text: "Chi tiết",
        active: true,
        props: {
            "aria-current": "page"
        }
    }
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

function AdminDetail() {

    const { id } = useParams();
    const [searchParams] = useSearchParams();

    return (
        <Box marginBottom="1.3rem">
            {/* <!-- breadcrumb --> */}
            <PageHeader
                title={
                    <DetailPageHeaderTitle
                        backUrl={searchParams.get("backUrl") ?? "/management/account/admin"}
                        code={createCodeString("AD", id)}
                        title={"Chi tiết tài khoản"}
                    />
                }
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
                                        src={require("../../../../../assets/img/faces/profile.jpg")}
                                        sx={{
                                            position: "relative",
                                            width: "160px",
                                            height: "160px",
                                            backgroundPosition: "center",
                                            backgroundSize: "cover",
                                            backgroundRepeat: "no-repeat"
                                        }}
                                    />
                                    <span className="bg-success text-white wd-1 ht-1 rounded-pill profile-online"></span>
                                </span>
                            </div>
                            <div className="prof-details">
                                <h4 className="font-weight-semibold ms-md-4 ms-0 mb-1 pb-0">
                                    {detail.name}
                                </h4>
                                <p className="text-muted ms-md-4 ms-0 mb-2">
                                    <span>
                                        <i className="fa fa-phone me-2"></i>
                                    </span>
                                    <span className="font-weight-semibold me-2">Sđt:</span>
                                    <span>{detail.phoneNumber}</span>
                                </p>
                                <p className="text-muted ms-md-4 ms-0 mb-2">
                                    <span>
                                        <i className="fa fa-envelope me-2"></i>
                                    </span>
                                    <span className="font-weight-semibold me-2">Email:</span>
                                    <span>{detail.email}</span>
                                </p>
                                <p className="text-muted ms-md-4 ms-0 mb-2">
                                    <span>
                                        <i className="fa fa-right-to-bracket me-2"></i>
                                    </span>
                                    <span className="font-weight-semibold me-2">Ngày khởi tạo:</span>
                                    <span>{formatTimeString(detail.createdDate)}</span>
                                </p>

                                <Box
                                    display="flex"
                                    gap="8px"
                                    height="42px"
                                    className="ms-md-4 ms-0 mb-2"
                                >
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        size="small"
                                        startIcon={<MessageIcon fontSize="small" />}
                                    >
                                        Gửi tin nhắn
                                    </Button>
                                    <Button
                                        color="error"
                                        variant="contained"
                                        size="small"
                                        startIcon={<LockIcon fontSize="small" />}
                                    >
                                        Khóa tài khoản
                                    </Button>
                                </Box>
                            </div>
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
                                            <Nav.Link className="mb-2 mt-2" eventKey="Order">
                                                Danh sách farmstay
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item className="me-1">
                                            <Nav.Link className="mb-2 mt-2" eventKey="Feedback">
                                                Đánh giá
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item className="me-1">
                                            <Nav.Link className="mb-2 mt-2" eventKey="AccountSettings">
                                                Thông tin cài đặt
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
                                                                                disabled
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
                                                                                disabled
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
                                                                                disabled
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
                                                                                disabled
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
                                                                                disabled
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
                                                                                disabled
                                                                            ></textarea>
                                                                        </Grid>
                                                                    </Grid>
                                                                </FormGroup>

                                                            </Form>
                                                        </Card.Body>
                                                    </Card>
                                                </Box>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="Order">
                                                <Box
                                                    className="main-content-body tab-pane  border-0"
                                                >
                                                    <Card>
                                                        <Card.Body
                                                            className=" border-0"
                                                            data-select2-id="12"
                                                        >
                                                            <Box
                                                                component="i"
                                                            >
                                                                Chưa đăng ký farmstay
                                                            </Box>
                                                        </Card.Body>
                                                    </Card>
                                                </Box>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="Feedback">
                                                <Box
                                                    className="main-content-body tab-pane  border-0"
                                                >
                                                    <Card>
                                                        <Card.Body
                                                            className=" border-0"
                                                            data-select2-id="12"
                                                        >
                                                            <Box
                                                                component="i"
                                                            >
                                                                Chưa có đánh giá nào
                                                            </Box>
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
                                                                                    disabled
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
                                                                                    <input type="checkbox" disabled />
                                                                                    <span>Email</span>
                                                                                </Form.Label>
                                                                                <Form.Label className="ckbox  mg-b-10">
                                                                                    <input defaultChecked type="checkbox" disabled />
                                                                                    <span>Tin nhắn</span>
                                                                                </Form.Label>
                                                                                <Form.Label className="ckbox  mg-b-10">
                                                                                    <input type="checkbox" disabled />
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
                                                                                        disabled
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
                                                                                        disabled
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
        </Box>
    )
}

export default AdminDetail;