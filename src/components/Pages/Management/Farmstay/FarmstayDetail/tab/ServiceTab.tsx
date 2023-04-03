import { Fragment, useMemo } from 'react'
import { Table } from 'react-bootstrap';
import { convertToMoney } from '../../../../../../helpers/stringUtils';
import { isAvailableArray } from '../../../../../../helpers/arrayUtils';
import useAllServiceCategories from '../../../ServiceCategory/hooks/useAllServiceCategories';
import { getServiceCategoryLabel } from '../../../../../../setting/service-category-setting';
import { Box } from '@mui/material';
import { Status } from '../../../../../../setting/Status';
import { findServiceStatus } from '../../../../../../setting/service-status-setting';
import CustomizedCard from '../../../../../General/Card/CustomizedCard';

interface ServiceTabProps {
    detail?: any,
    loading?: boolean,
}


function ServiceTab({
    detail,
    loading
}: ServiceTabProps) {

    const categories = useAllServiceCategories();

    const services: any[] = useMemo(() => {
        if (!isAvailableArray(detail?.services)) return [];
        return detail.services;
    }, [detail]);

    const groups = useMemo(() => {
        if (services.length < 1) return null;

        const map: { [key: string]: any[] | null } = {};
        services.forEach(service => {
            const key = service.categoryId + "";
            if (key) {
                if (!map[key]) {
                    map[key] = [];
                }

                map[key]?.push(service);
            }
        })
        return map;
    }, [services]);

    return (
        <>
            <CustomizedCard
                title="Danh sách dịch vụ"
                content={
                    !groups
                        ? <i>Chưa có dịch vụ nào</i>

                        : Object.keys(groups).map((key) =>
                            <Fragment key={key}>
                                <h5 className="mb-2 mt-3 fw-semibold">
                                    {getServiceCategoryLabel(categories, key) ?? "NO_CATEGORY"}
                                </h5>
                                <div className="table-responsive">
                                    <Table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Ảnh đại diện</th>
                                                <th>Tên dịch vụ</th>
                                                <th>Mô tả</th>
                                                <th>Giá</th>
                                                <th>Trạng thái</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {groups[key]?.map((service) =>
                                                <tr key={service.id}>
                                                    <Box
                                                        component="td"
                                                        className="fw-semibold"
                                                    >
                                                        <Box
                                                            component="img"
                                                            className="br-5 "
                                                            src={service.image ?? "../../../../../../assets/img/photos/1.jpg"}
                                                            alt="Activity img"
                                                            sx={{
                                                                position: "relative",
                                                                height: "80px !important",
                                                                width: "80px !important",
                                                                backgroundPosition: "center",
                                                                backgroundSize: "cover",
                                                                backgroundRepeat: "no-repeat"
                                                            }}
                                                        />
                                                    </Box>
                                                    <Box
                                                        component="td"
                                                        className="fw-semibold"
                                                    >
                                                        {service.name}
                                                    </Box>
                                                    <Box
                                                        component="td"
                                                        className="fw-semibold"
                                                        width="50%"
                                                    >
                                                        {service.description}
                                                    </Box>
                                                    <Box
                                                        component="td"
                                                        className="fw-semibold"
                                                    >
                                                        <Box marginLeft="auto">
                                                            {convertToMoney(service.price) ?? "FREE"}
                                                        </Box>
                                                    </Box>
                                                    <Box
                                                        component="td"
                                                        className="fw-semibold"
                                                    >
                                                        <Status statusObject={findServiceStatus(service.status)} />
                                                    </Box>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                </div>
                            </Fragment>
                        )
                }
            />
        </>
    )
}

export default ServiceTab