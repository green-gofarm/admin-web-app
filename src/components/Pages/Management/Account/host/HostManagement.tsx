import { useCallback, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Box, FormGroup, Grid } from '@mui/material';
import PageHeader, { IBreadcrumbItem } from '../../../../General/PageHeader';
import Select from 'react-select';
import HostTable from './HostTable';
import { LIST_HOST_STATUS } from '../../../../../setting/host-setting';
import { IStatisticCard } from '../../../../General/Statistic/StatisticCard';
import HostStatistic from './HostStatistic';

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
        title: "Doanh số tháng này (đơn)",
        value: 500,
        icon: <i className="mdi mdi-cube icon-size float-start text-success text-success-shadow"></i>,
        subTitle: "Số đơn hôm nay",
        subValue: 12,
        type: "number"
    },
    {
        title: "Tổng doanh thu chủ farmstay",
        value: 2323500000,
        icon: <i className="icon-size mdi mdi-poll-box float-start text-warning text-warning-shadow"></i>,
        subTitle: "Trong tháng này",
        subValue: 300000000,
        type: "money"
    },
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
        <Box marginBottom="1.3rem">
            <PageHeader
                title="Chủ farmstay"
                breadcrumb={breadcrumb}
            />

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <HostStatistic data={statisticData} />
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
                    <Box className="table-responsive">
                        <HostTable />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

HostManagement.propTypes = {};

HostManagement.defaultProps = {};

export default HostManagement;
