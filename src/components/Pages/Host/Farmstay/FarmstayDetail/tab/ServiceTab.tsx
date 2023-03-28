import { Fragment, useMemo, useState } from 'react'
import { Table } from 'react-bootstrap';
import { convertToMoney } from '../../../../../../helpers/stringUtils';
import { isAvailableArray } from '../../../../../../helpers/arrayUtils';
import { Box, Button, Grid } from '@mui/material';
import { Status } from '../../../../../../setting/Status';
import { SERVICE_STATUSES, findServiceStatus } from '../../../../../../setting/service-status-setting';
import useAllServiceCategories from '../../../../Management/ServiceCategory/hooks/useAllServiceCategories';
import { getServiceCategoryLabel } from '../../../../../../setting/service-category-setting';
import { Add } from '@mui/icons-material';
import ConditionWrapper from '../../../../../General/Wrapper/ConditionWrapper';
import LockIconAction from '../../../../../General/Action/IconAction/LockIconAction';
import UnlockIconAction from '../../../../../General/Action/IconAction/UnlockIconAction';
import DeleteIconAction from '../../../../../General/Action/IconAction/DeleteIconAction';
import LockService from '../action/LockService';
import UnlockService from '../action/UnlockService';
import DeleteService from '../action/DeleteService';
import CreateService from '../action/CreateService';

interface ServiceTabProps {
    detail?: any,
    loading?: boolean,
    refresh?: () => void
}


function ServiceTab({
    detail,
    loading,
    refresh
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

    // State 
    const [openAddNew, setOpenAddNew] = useState<boolean>(false);
    const [openLock, setOpenLock] = useState<boolean>(false);
    const [openUnlock, setOpenUnlock] = useState<boolean>(false);
    const [openDelete, setOpenDelete] = useState<boolean>(false);
    const [selectedService, setSelectedService] = useState(null)

    return (

        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div className="main-content-body main-content-body-contacts card custom-card">
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            className="main-contact-info-header"
                            padding="16px 20px 20px 20px !important"
                        >
                            <Box
                                className='h5'
                                margin="0 !important"
                            >
                                Danh sách dịch vụ
                            </Box>


                            <Button
                                color="primary"
                                variant="contained"
                                startIcon={<Add />}
                                onClick={() => setOpenAddNew(true)}
                            >
                                Thêm dịch vụ
                            </Button>
                        </Box>
                        <Box padding="20px" className="main-contact-info-body">
                            {!groups
                                ? <i>Chưa có dịch vụ nào</i>
                                : Object.keys(groups).map((key) =>
                                    <Fragment key={key}>
                                        <h5 className="mb-2 mt-3 fw-semibold">
                                            {getServiceCategoryLabel(categories, key) ?? "NO_CATEGORY"}
                                        </h5>
                                        <div className="">
                                            <Table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>Ảnh đại diện</th>
                                                        <th>Tên dịch vụ</th>
                                                        <th>Mô tả</th>
                                                        <th>Giá</th>
                                                        <th>Trạng thái</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {groups[key]?.map((service) =>
                                                        <tr key={service.id}>
                                                            <Box
                                                                component="td"
                                                                className="fw-semibold"
                                                                minWidth="fit-content"
                                                            >
                                                                <Box
                                                                    component="img"
                                                                    className="br-5 "
                                                                    src={service.image ?? "../../../../../../assets/img/photos/1.jpg"}
                                                                    alt="Activity img"
                                                                    sx={{
                                                                        position: "relative",
                                                                        height: "60px",
                                                                        width: "60px !important",
                                                                        backgroundPosition: "center",
                                                                        backgroundSize: "auto",
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
                                                                minWidth="40%"
                                                                width="40%"
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
                                                            <Box
                                                                component="td"
                                                                className="fw-semibold"
                                                                display="flex"
                                                                gap="8px"
                                                            >
                                                                <ConditionWrapper isRender={service.status === SERVICE_STATUSES.ACTIVE}>
                                                                    <LockIconAction
                                                                        title='Khóa'
                                                                        onClick={() => {
                                                                            setOpenLock(true);
                                                                            setSelectedService(service)
                                                                        }}
                                                                    />
                                                                </ConditionWrapper>

                                                                <ConditionWrapper isRender={service.status === SERVICE_STATUSES.INACTIVE}>
                                                                    <UnlockIconAction
                                                                        title='Mở khóa'
                                                                        onClick={() => {
                                                                            setOpenUnlock(true);
                                                                            setSelectedService(service)
                                                                        }}
                                                                    />
                                                                </ConditionWrapper>

                                                                <DeleteIconAction
                                                                    title="Xóa"
                                                                    onClick={() => {
                                                                        setOpenDelete(true);
                                                                        setSelectedService(service)
                                                                    }}
                                                                />
                                                            </Box>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </Table>
                                        </div>
                                    </Fragment>
                                )
                            }

                        </Box>
                    </div>
                </Grid>
            </Grid>

            {openAddNew
                ? <CreateService
                    open={openAddNew}
                    onClose={() => setOpenAddNew(false)}
                    farmstayId={detail?.id}
                    onSuccessCallback={refresh}
                />
                : null
            }

            {openLock
                ? <LockService
                    open={openLock}
                    onClose={() => setOpenLock(false)}
                    service={selectedService}
                    onSuccessCallback={refresh}
                />
                : null
            }

            {openUnlock
                ? <UnlockService
                    open={openUnlock}
                    onClose={() => setOpenUnlock(false)}
                    service={selectedService}
                    onSuccessCallback={refresh}
                />
                : null
            }

            {openDelete
                ? <DeleteService
                    open={openDelete}
                    onClose={() => setOpenDelete(false)}
                    service={selectedService}
                    onSuccessCallback={refresh}
                />
                : null
            }
        </>
    )
}

export default ServiceTab