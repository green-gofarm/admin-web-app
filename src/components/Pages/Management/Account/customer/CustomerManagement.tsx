import { useCallback, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Box, FormGroup, Grid } from '@mui/material';
import PageHeader, { IBreadcrumbItem } from '../../../../General/PageHeader';
import Select from 'react-select';
import CustomerTable from './CustomerTable';
import { LIST_CUSTOMER_STATUS } from '../../../../../setting/customer-setting';
import { IStatisticCard } from '../../../../General/Statistic/StatisticCard';
import CustomerStatistic from './CustomerStatistic';

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
        text: "Khách du lịch",
        active: true,
        props: {
            "aria-current": "page"
        }
    }
]

const statisticData: IStatisticCard[] = [
    {
        title: "Tổng số tài khoản",
        value: 3672,
        icon: <i className="mdi mdi-account-multiple icon-size float-start text-primary text-primary-shadow"></i>,
        subTitle: "Tài khoản mới trong tháng",
        subValue: 858,
        type: "number"
    },
    {
        title: "Tổng số lần đặt tour",
        value: 2736,
        icon: <i className="mdi mdi-cart-outline icon-size float-start text-danger text-danger-shadow"></i>,
        subTitle: "Trong tháng này",
        subValue: 234,
        type: "number"
    },
    {
        title: "Tổng số tiền khách hàng đã thanh toán",
        value: 2987200000,
        icon: <i className="icon-size mdi mdi-poll-box float-start text-warning text-warning-shadow"></i>,
        subTitle: "Trong tháng này",
        subValue: 400000,
        type: "money"
    },
];

export const STATUSES = {
    ACTIVE: 1,
    INACTIVE: 2,
    DELETED: 3,
}

const CustomerManagement = () => {

    // State
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
        <Box marginBottom="1.3rem">
            {/* <!-- breadcrumb --> */}
            <PageHeader
                title="Khách du lịch"
                breadcrumb={breadcrumb}
            />

            {/* <!-- Row --> */}
            <Box
                component={Grid}
                container
                spacing={2}
            >

                <Grid item xs={12}>
                    <CustomerStatistic data={statisticData} />
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
                                                options={LIST_CUSTOMER_STATUS}
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
                                                options={LIST_CUSTOMER_STATUS}
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
                                                options={LIST_CUSTOMER_STATUS}
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
                    <Box className="table-responsive">
                        <CustomerTable />
                    </Box>
                </Grid>
            </Box>
        </Box>
    );
}

CustomerManagement.propTypes = {};

CustomerManagement.defaultProps = {};

export default CustomerManagement;
