import { useCallback, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Box, FormGroup, Grid } from '@mui/material';
import Select from 'react-select';
import PageHeader, { IBreadcrumbItem } from '../../../General/PageHeader';
import { FarmstayTable } from './FarmstayTable';

const breadcrumb: Array<IBreadcrumbItem> = [
    {
        text: "Quản lý",
        href: "/management"
    },
    {
        text: "Farmstay",
        active: true,
        props: {
            "aria-current": "page"
        }
    }
]

export const STATUSES = {
    ACTIVE: 1,
    INACTIVE: 2,
    DELETED: 3,
}

const FarmstayManagement = () => {

    const [filters, setFilters] = useState({
        status: null
    });

    const handleOnChange = useCallback((value: any, key: string) => {
        console.log(value);
        setFilters(prev => ({
            ...prev,
            [key]: value
        }))
    }, []);

    return (
        <Box component="div">
            <PageHeader
                title="Farmstay"
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
                        <Grid item xs={12} md={6} lg={6} xl={3}>
                            <Card>
                                <Card.Body>
                                    <div className="card-order">
                                        <h6 className="mb-2">Tổng số farmstay</h6>
                                        <h2 className="text-end ">
                                            <i className="mdi mdi-account-multiple icon-size float-start text-primary text-primary-shadow"></i>
                                            <span>122</span>
                                        </h2>
                                        <p className="mb-0">
                                            Farmstay mới trong tháng<span className="float-end">20</span>
                                        </p>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={6} lg={6} xl={3}>
                            <Card className=" ">
                                <Card.Body>
                                    <div className="card-widget">
                                        <h6 className="mb-2">Số booking trong tháng</h6>
                                        <h2 className="text-end">
                                            <i className="mdi mdi-cart-outline icon-size float-start text-danger text-danger-shadow"></i>
                                            <span>22.736</span>
                                        </h2>
                                        <p className="mb-0">
                                            Đã thanh toán<span className="float-end">2334</span>
                                        </p>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={6} lg={6} xl={3}>
                            <Card>
                                <Card.Body>
                                    <div className="card-widget">
                                        <h6 className="mb-2">Doanh thu trong quý</h6>
                                        <h2 className="text-end">
                                            <i className="icon-size mdi mdi-poll-box float-start text-warning text-warning-shadow"></i>
                                            <span>22.987.200 đ</span>
                                        </h2>
                                        <p className="mb-0">
                                            Trong tháng này<span className="float-end">400.000 đ</span>
                                        </p>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6} xl={3}>
                            <Card>
                                <Card.Body>
                                    <div className="card-widget">
                                        <h6 className="mb-2">Số đơn đã hủy</h6>
                                        <h2 className="text-end">
                                            <i className="icon-size mdi mdi-poll-box float-start text-warning text-warning-shadow"></i>
                                            <span>234</span>
                                        </h2>
                                        <p className="mb-0">
                                            Trong tháng này<span className="float-end">23</span>
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
                                    placeholder="Tìm kiếm theo tên, địa chỉ"
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
                                                options={[]}
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
                                                options={[]}
                                                classNamePrefix="selectproduct"
                                                placeholder="Tỉnh/Thành phố"
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
                                                options={[]}
                                                classNamePrefix="selectproduct"
                                                placeholder="Quận/Huyện"
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
                                <FarmstayTable />
                            </Box>
                        </Card.Body>
                    </Card>
                </Grid>
            </Box>
        </Box>
    );
}

FarmstayManagement.propTypes = {};

FarmstayManagement.defaultProps = {};

export default FarmstayManagement;
