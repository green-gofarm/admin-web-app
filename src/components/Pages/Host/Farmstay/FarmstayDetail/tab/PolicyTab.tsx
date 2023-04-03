import { useMemo, useState } from 'react'
import { Dropdown, Table } from 'react-bootstrap';
import { Box, Button, Grid } from '@mui/material';
import { Status } from '../../../../../../setting/Status';
import { Add, DeleteForever, Edit, Lock, LockOpen } from '@mui/icons-material';
import ConditionWrapper from '../../../../../General/Wrapper/ConditionWrapper';
import { POLICY_STATUSES, findPolicyStatus } from '../../../../../../setting/policy-status-setting';
import { isAvailableArray } from '../../../../../../helpers/arrayUtils';
import CreatePolicies from '../action/CreatePolicies';
import LockPolicy from '../action/LockPolicy';
import UnlockPolicy from '../action/UnlockPolicy';
import DeletePolicy from '../action/DeletePolicy';
import UpdatePolicy from '../action/UpdatePolicy';

interface PolicyTabProps {
    detail?: any,
    loading?: boolean,
    refresh?: () => void
}


function PolicyTab({
    detail,
    loading,
    refresh
}: PolicyTabProps) {

    const policies: any[] = useMemo(() => {
        if (!isAvailableArray(detail?.policies)) return [];
        return detail.policies;
    }, [detail]);

    // State 
    const [openAddNew, setOpenAddNew] = useState<boolean>(false);
    const [openUpdate, setOpenUpdate] = useState<boolean>(false);
    const [openLock, setOpenLock] = useState<boolean>(false);
    const [openUnlock, setOpenUnlock] = useState<boolean>(false);
    const [openDelete, setOpenDelete] = useState<boolean>(false);
    const [selected, setSelected] = useState(null)

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
                                Bảng quy định
                            </Box>


                            <Button
                                color="primary"
                                variant="contained"
                                startIcon={<Add />}
                                onClick={() => setOpenAddNew(true)}
                            >
                                Thêm quy định
                            </Button>
                        </Box>
                        <Box padding="20px" className="main-contact-info-body">
                            {policies.length < 1
                                ? <i>Chưa có quy định nào</i>
                                : <Table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Tiêu chí</th>
                                            <th>Nội dung</th>
                                            <th>Trạng thái</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {policies.map((policy) =>
                                            <tr key={policy.id}>

                                                <Box
                                                    component="td"
                                                    className="fw-semibold"
                                                >
                                                    {policy.name}
                                                </Box>
                                                <Box
                                                    component="td"
                                                    className="fw-semibold"
                                                    width="50%"
                                                >
                                                    {policy.description}
                                                </Box>
                                                <Box
                                                    component="td"
                                                    className="fw-semibold"
                                                >
                                                    <Status statusObject={findPolicyStatus(policy.status)} />
                                                </Box>
                                                <Box
                                                    component="td"
                                                    className="fw-semibold"
                                                >
                                                    <Dropdown as="span">
                                                        <Dropdown.Toggle
                                                            variant=''
                                                            className="ms-2 br-5 p-2 border "
                                                            data-bs-toggle="dropdown"
                                                        >
                                                            <i className="fe fe-more-vertical align-middle"></i>
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu className="dropdown-menu tx-13" style={{ margin: "0px" }}>
                                                            <ConditionWrapper isRender={policy.status === POLICY_STATUSES.ACTIVE}>
                                                                <Dropdown.Item
                                                                    className="dropdown-item"
                                                                    href="#"
                                                                    onClick={() => {
                                                                        setOpenLock(true);
                                                                        setSelected(policy);
                                                                    }}
                                                                >
                                                                    <Box
                                                                        display="flex"
                                                                        alignItems="center"
                                                                        gap="8px"
                                                                    >
                                                                        <Lock />
                                                                        Khóa
                                                                    </Box>
                                                                </Dropdown.Item>
                                                            </ConditionWrapper>
                                                            <ConditionWrapper isRender={policy.status === POLICY_STATUSES.INACTIVE}>
                                                                <Dropdown.Item
                                                                    className="dropdown-item"
                                                                    href="#"
                                                                    onClick={() => {
                                                                        setOpenUnlock(true);
                                                                        setSelected(policy);
                                                                    }}
                                                                >
                                                                    <Box
                                                                        display="flex"
                                                                        alignItems="center"
                                                                        gap="8px"
                                                                    >
                                                                        <LockOpen />
                                                                        Mở khóa
                                                                    </Box>
                                                                </Dropdown.Item>
                                                            </ConditionWrapper>
                                                            <Dropdown.Item
                                                                className="dropdown-item"
                                                                href="#"
                                                                onClick={() => {
                                                                    setOpenUpdate(true);
                                                                    setSelected(policy);
                                                                }}
                                                            >
                                                                <Box
                                                                    display="flex"
                                                                    alignItems="center"
                                                                    gap="8px"
                                                                >
                                                                    <Edit />
                                                                    Cập nhật
                                                                </Box>
                                                            </Dropdown.Item>
                                                            <Dropdown.Item
                                                                className="dropdown-item"
                                                                href="#"
                                                                onClick={() => {
                                                                    setOpenDelete(true);
                                                                    setSelected(policy);
                                                                }}
                                                            >
                                                                <Box
                                                                    display="flex"
                                                                    alignItems="center"
                                                                    gap="8px"
                                                                >
                                                                    <DeleteForever />
                                                                    Xóa
                                                                </Box>
                                                            </Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </Box>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            }
                        </Box>
                    </div>
                </Grid>
            </Grid>

            {openAddNew
                ? <CreatePolicies
                    open={openAddNew}
                    onClose={() => setOpenAddNew(false)}
                    farmstay={detail}
                    onSuccessCallback={refresh}
                />
                : null
            }

            {openUpdate
                ? <UpdatePolicy
                    open={openUpdate}
                    policy={selected}
                    onClose={() => setOpenUpdate(false)}
                    onSuccessCallback={refresh}
                />
                : null
            }

            {openLock
                ? <LockPolicy
                    open={openLock}
                    onClose={() => setOpenLock(false)}
                    policy={selected}
                    onSuccessCallback={refresh}
                />
                : null
            }

            {openUnlock
                ? <UnlockPolicy
                    open={openUnlock}
                    onClose={() => setOpenUnlock(false)}
                    policy={selected}
                    onSuccessCallback={refresh}
                />
                : null
            }

            {openDelete
                ? <DeletePolicy
                    open={openDelete}
                    onClose={() => setOpenDelete(false)}
                    policy={selected}
                    onSuccessCallback={refresh}
                />
                : null
            }
        </>
    )
}

export default PolicyTab