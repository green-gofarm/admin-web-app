import { Card, FormGroup } from 'react-bootstrap';
import { Box, Grid } from '@mui/material';
import PageHeader, { IBreadcrumbItem } from '../../../General/PageHeader';
import OrderTable from './OrderTable';
import Select from 'react-select';
import { useCallback, useState } from 'react';

const breadcrumb: Array<IBreadcrumbItem> = [
    {
        text: "Quản lý danh mục",
        href: "/management"
    },
    {
        text: "Đơn đặt tour",
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

const OrderManagement = () => {

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
        <Box marginBottom="1.3rem">
            <PageHeader
                title="Đơn đặt tour"
                breadcrumb={breadcrumb}
            />

            {/* <!-- Row --> */}
            <Box
                component={Grid}
                container
                spacing={2}
            >
                <Grid item xs={12}>
                    <Card className="custom-card">
                        <Card.Body>
                            <div className="input-group mb-0">
                                <input
                                    type="text"
                                    className="form-control"
                                    autoFocus
                                    placeholder="Tìm kiếm theo tên"
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
                    <Box className="table-responsive">
                        <OrderTable />
                    </Box>
                </Grid>
            </Box>
        </Box>
    );
}

OrderManagement.propTypes = {};

OrderManagement.defaultProps = {};

export default OrderManagement;
