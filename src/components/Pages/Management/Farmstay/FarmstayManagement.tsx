import { useCallback, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Box, FormGroup, Grid } from '@mui/material';
import Select from 'react-select';
import PageHeader, { IBreadcrumbItem } from '../../../General/PageHeader';
import FarmstayTable from './FarmstayTable';
import FarmstayStatistic from './FarmstayStatistic';
import { IStatisticCard } from '../../../General/Statistic/StatisticCard';

const breadcrumb: Array<IBreadcrumbItem> = [
    {
        text: "Quản lý",
        href: "/management"
    },
    {
        text: "Farmstay",
        href: "/management/farmstay"
    },
    {
        text: "Danh sách",
        active: true,
        props: {
            "aria-current": "page"
        }
    }
]

const statisticData: IStatisticCard[] = [
    {
        title: "Tổng số farmstay",
        value: 122,
        icon: <i className="mdi mdi-account-multiple icon-size float-start text-primary text-primary-shadow"></i>,
        subTitle: "Farmstay mới trong tháng",
        subValue: 20,
        type: "number"
    },
    {
        title: "Số booking trong tháng",
        value: 22736,
        icon: <i className="mdi mdi-cart-outline icon-size float-start text-danger text-danger-shadow"></i>,
        subTitle: "Đã thanh toán",
        subValue: 2334,
        type: "number"
    },
    {
        title: "Doanh thu trong quý",
        value: 22987200,
        icon: <i className="icon-size mdi mdi-poll-box float-start text-warning text-warning-shadow"></i>,
        subTitle: "Trong tháng này",
        subValue: 400000,
        type: "money"
    },
    {
        title: "Số đơn đã hủy",
        value: 234,
        icon: <i className="icon-size mdi mdi-poll-box float-start text-warning text-warning-shadow"></i>,
        subTitle: "Trong tháng này",
        subValue: 23,
        type: "number"
    },
];

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
        <Box marginBottom="1.3rem">
            <PageHeader
                title="Danh sách Farmstay"
                breadcrumb={breadcrumb}
            />

            {/* <!-- Row --> */}
            <Box
                component={Grid}
                container
                spacing={2}
            >
                <Grid item xs={12}>
                    <FarmstayStatistic data={statisticData} />
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
                    <Box className="table-responsive">
                        <FarmstayTable />
                    </Box>
                </Grid>
            </Box>
        </Box>
    );
}

FarmstayManagement.propTypes = {};

FarmstayManagement.defaultProps = {};

export default FarmstayManagement;
