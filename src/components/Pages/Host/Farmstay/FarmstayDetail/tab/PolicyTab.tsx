import { useMemo, useState } from 'react'
import { Table } from 'react-bootstrap';
import { Box, Button, Grid } from '@mui/material';
import { Status } from '../../../../../../setting/Status';
import { Add } from '@mui/icons-material';
import ConditionWrapper from '../../../../../General/Wrapper/ConditionWrapper';
import LockIconAction from '../../../../../General/Action/IconAction/LockIconAction';
import UnlockIconAction from '../../../../../General/Action/IconAction/UnlockIconAction';
import DeleteIconAction from '../../../../../General/Action/IconAction/DeleteIconAction';
import { POLICY_STATUSES, findPolicyStatus } from '../../../../../../setting/policy-status-setting';
import { isAvailableArray } from '../../../../../../helpers/arrayUtils';
import CreatePolicies from '../action/CreatePolicies';
import LockPolicy from '../action/LockPolicy';
import UnlockPolicy from '../action/UnlockPolicy';
import DeletePolicy from '../action/DeletePolicy';

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
                            {policies.length < 1 ? <i>Chưa có quy định nào</i> : null}
                            <Table className="table table-bordered">
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
                                                display="flex"
                                                gap="8px"
                                            >
                                                <ConditionWrapper isRender={policy.status === POLICY_STATUSES.ACTIVE}>
                                                    <LockIconAction
                                                        title='Khóa'
                                                        onClick={() => {
                                                            setOpenLock(true);
                                                            setSelected(policy)
                                                        }}
                                                    />
                                                </ConditionWrapper>

                                                <ConditionWrapper isRender={policy.status === POLICY_STATUSES.INACTIVE}>
                                                    <UnlockIconAction
                                                        title='Mở khóa'
                                                        onClick={() => {
                                                            setOpenUnlock(true);
                                                            setSelected(policy)
                                                        }}
                                                    />
                                                </ConditionWrapper>

                                                <DeleteIconAction
                                                    title="Xóa"
                                                    onClick={() => {
                                                        setOpenDelete(true);
                                                        setSelected(policy)
                                                    }}
                                                />
                                            </Box>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
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