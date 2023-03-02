import { useCallback, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Box, FormGroup, Grid } from '@mui/material';
import PageHeader, { IBreadcrumbItem } from '../../../../General/PageHeader';
import Select from 'react-select';
import { HostTable } from './HostTable';
import { LIST_HOST_STATUS } from '../../../../../setting/host-setting';

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
        active: true,
        props: {
            "aria-current": "page"
        }
    }
]

const HostManagement = () => {

    const [filters, setFilters] = useState({
        status: null
    });

    const handleOnChange = useCallback((value: any, key: string) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }))
    }, []);

    return (
        <Box component="div">
            {/* <!-- breadcrumb --> */}
            <PageHeader
                title="quản trị viên"
                breadcrumb={breadcrumb}
            />

            {/* <!-- Row --> */}
            <Box
                component={Grid}
                container
                spacing={0}
            >
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} lg={4}>
                            <Card>
                                <Card.Body>
                                    <div className="card-order">
                                        <h6 className="mb-2">Tổng số tài khoản</h6>
                                        <h2 className="text-end ">
                                            <i className="mdi mdi-account-multiple icon-size float-start text-primary text-primary-shadow"></i>
                                            <span>3.672</span>
                                        </h2>
                                        <p className="mb-0">
                                            Tài khoản mới trong tháng<span className="float-end">858</span>
                                        </p>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            <Card className=" ">
                                <Card.Body>
                                    <div className="card-widget">
                                        <h6 className="mb-2">Tổng số farmstay</h6>
                                        <h2 className="text-end">
                                            <i className="mdi mdi-cube icon-size float-start text-success text-success-shadow"></i>
                                            <span>124</span>
                                        </h2>
                                        <p className="mb-0">
                                            Farmstay mới tham gia tháng này<span className="float-end">12</span>
                                        </p>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            <Card>
                                <Card.Body>
                                    <div className="card-widget">
                                        <h6 className="mb-2">Tổng số tiền đã thanh toán</h6>
                                        <h2 className="text-end">
                                            <i className="icon-size mdi mdi-poll-box   float-start text-warning text-warning-shadow"></i>
                                            <span>2.323.500.000 đ</span>
                                        </h2>
                                        <p className="mb-0">
                                            Trong tháng này<span className="float-end">300.000.000 đ</span>
                                        </p>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Card className="custom-card">
                        <Card.Body>
                            <div className="input-group mb-0">
                                <input
                                    type="text"
                                    className="form-control"
                                    autoFocus
                                    placeholder="Tìm kiếm theo tên, email, số điện thoại"
                                />
                                <span className="input-group-append">
                                    <button className="btn ripple btn-primary" type="button">
                                        Tìm kiếm
                                    </button>
                                </span>
                            </div>
                        </Card.Body>
                        <Card.Body>
                            <div className="main-content-body-profile mt-0">
                                <Grid container spacing={2}>
                                    <Grid item xs={6} sm={4}>
                                        <FormGroup className="form-group">
                                            <Select
                                                value={filters.status}
                                                onChange={(value) => handleOnChange(value, "status")}
                                                options={LIST_HOST_STATUS}
                                                classNamePrefix="selectproduct"
                                                placeholder="Trạng thái"
                                                isSearchable
                                                isMulti
                                            />
                                        </FormGroup>
                                    </Grid>

                                    <Grid item xs={6} sm={4}>
                                        <FormGroup className="form-group">
                                            <Select
                                                value={filters.status}
                                                onChange={(value) => handleOnChange(value, "status")}
                                                options={LIST_HOST_STATUS}
                                                classNamePrefix="selectproduct"
                                                placeholder="Trạng thái"
                                                isSearchable
                                                isMulti
                                            />
                                        </FormGroup>
                                    </Grid>

                                    <Grid item xs={6} sm={4}>
                                        <FormGroup className="form-group">
                                            <Select
                                                value={filters.status}
                                                onChange={(value) => handleOnChange(value, "status")}
                                                options={LIST_HOST_STATUS}
                                                classNamePrefix="selectproduct"
                                                placeholder="Trạng thái"
                                                isSearchable
                                                isMulti
                                            />
                                        </FormGroup>
                                    </Grid>
                                </Grid>
                            </div>

                            <p className="text-muted mb-1">
                                Tìm được 3 kết quả.
                            </p>
                        </Card.Body>
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    <Card className="custom-card overflow-hidden">
                        <Card.Body>
                            <Box className="table-responsive">
                                <HostTable />
                            </Box>
                        </Card.Body>
                    </Card>
                </Grid>
            </Box>
        </Box>
    );
}

HostManagement.propTypes = {};

HostManagement.defaultProps = {};

export default HostManagement;
