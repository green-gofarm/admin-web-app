import { Box } from '@mui/material'
import { memo, useState } from 'react'
import { Accordion } from 'react-bootstrap'
import ConditionWrapper from '../../../../../General/Wrapper/ConditionWrapper'
import LockIconAction from '../../../../../General/Action/IconAction/LockIconAction'
import { FAQ_STATUSES } from '../../../../../../setting/faqs-status-setting'
import UnlockIconAction from '../../../../../General/Action/IconAction/UnlockIconAction'
import DeleteIconAction from '../../../../../General/Action/IconAction/DeleteIconAction'
import LockFaq from '../action/LockFaq'
import UnlockFaq from '../action/UnlockFaq'
import DeleteFaq from '../action/DeleteFaq'

interface IFaqItem {
    item: any,
    eventKey: string,
    refresh?: () => void
}

function FaqItem({
    item,
    eventKey,
    refresh
}: IFaqItem) {

    const [openLock, setOpenLock] = useState<boolean>(false);
    const [openUnlock, setOpenUnlock] = useState<boolean>(false);
    const [openDelete, setOpenDelete] = useState<boolean>(false);

    return (
        <>
            <Accordion.Item eventKey={eventKey}>
                <Accordion.Header className='font-weight-semibold'>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Box
                            component="td"
                            className="fw-semibold"
                            display="flex"
                            gap="8px"
                        >
                            <ConditionWrapper isRender={item?.status === FAQ_STATUSES.ACTIVE}>
                                <LockIconAction
                                    title='Khóa'
                                    onClick={() => setOpenLock(true)}
                                />
                            </ConditionWrapper>

                            <ConditionWrapper isRender={item?.status === FAQ_STATUSES.INACTIVE}>
                                <UnlockIconAction
                                    title='Mở khóa'
                                    onClick={() => setOpenUnlock(true)}
                                />
                            </ConditionWrapper>

                            <DeleteIconAction
                                title="Xóa"
                                onClick={() => setOpenDelete(true)}
                            />
                        </Box>
                    </Box>
                    {item?.question ?? "-"}
                </Accordion.Header>
                <Accordion.Body>
                    <p className="text-muted tx-14">
                        {item?.answer ?? "-"}
                    </p>
                </Accordion.Body>
            </Accordion.Item>


            {openLock
                ? <LockFaq
                    open={openLock}
                    onClose={() => setOpenLock(false)}
                    faq={item}
                    onSuccessCallback={refresh}
                />
                : null
            }

            {openUnlock
                ? <UnlockFaq
                    open={openUnlock}
                    onClose={() => setOpenUnlock(false)}
                    faq={item}
                    onSuccessCallback={refresh}
                />
                : null
            }

            {openDelete
                ? <DeleteFaq
                    open={openDelete}
                    onClose={() => setOpenDelete(false)}
                    faq={item}
                    onSuccessCallback={refresh}
                />
                : null
            }
        </>
    )
}

export default memo(FaqItem);