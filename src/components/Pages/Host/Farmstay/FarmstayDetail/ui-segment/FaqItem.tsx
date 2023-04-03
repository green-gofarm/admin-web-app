import { Box } from '@mui/material'
import { memo, useContext, useState } from 'react'
import { Accordion, AccordionContext, Dropdown, useAccordionButton } from 'react-bootstrap'
import ConditionWrapper from '../../../../../General/Wrapper/ConditionWrapper'
import { FAQ_STATUSES, findFaqStatus } from '../../../../../../setting/faqs-status-setting'
import LockFaq from '../action/LockFaq'
import UnlockFaq from '../action/UnlockFaq'
import DeleteFaq from '../action/DeleteFaq'
import { DeleteForever, Edit, ExpandLess, ExpandMore, Lock, LockOpen } from '@mui/icons-material'
import UpdateFaq from '../action/UpdateFaq'
import { Status } from '../../../../../../setting/Status'
import CustomizedCard from '../../../../../General/Card/CustomizedCard'
import { isAvailableArray } from '../../../../../../helpers/arrayUtils'


interface ContextAwareToggleProps {
    eventKey: any,
}

function ContextAwareToggle({ eventKey }: ContextAwareToggleProps) {
    const { activeEventKey } = useContext(AccordionContext);

    const isCurrentEventKey = isAvailableArray(activeEventKey) && activeEventKey.includes(eventKey);
    const decoratedOnClick = useAccordionButton(eventKey);

    return (
        <Box className="ms-2 br-5 p-2 border" sx={{ cursor: "pointer" }} onClick={decoratedOnClick}>
            {isCurrentEventKey
                ? <ExpandLess />
                : <ExpandMore />
            }
        </Box>
    );
}
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

    const [openUpdate, setOpenUpdate] = useState<boolean>(false);
    const [openLock, setOpenLock] = useState<boolean>(false);
    const [openUnlock, setOpenUnlock] = useState<boolean>(false);
    const [openDelete, setOpenDelete] = useState<boolean>(false);

    return (
        <>
            <CustomizedCard
                title={`${parseInt(eventKey) + 1}. ${item?.question}`}
                isCustomContent
                panel={
                    <Box
                        flexGrow="1"
                        display="flex"
                        alignItems="center"
                        gap="8px"
                    >
                        <Status statusObject={findFaqStatus(item?.status)} />
                        <Dropdown as="span">
                            <Dropdown.Toggle
                                variant=''
                                className="ms-2 br-5 p-2 border"
                                data-bs-toggle="dropdown"
                            >
                                <i className="fe fe-more-vertical align-middle"></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu tx-13" style={{ margin: "0px" }}>
                                <ConditionWrapper isRender={item?.status === FAQ_STATUSES.ACTIVE}>
                                    <Dropdown.Item
                                        className="dropdown-item"
                                        href="#"
                                        onClick={() => setOpenLock(true)}
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
                                <ConditionWrapper isRender={item?.status === FAQ_STATUSES.INACTIVE}>
                                    <Dropdown.Item
                                        className="dropdown-item"
                                        href="#"
                                        onClick={() => setOpenUnlock(true)}
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
                                    onClick={() => setOpenUpdate(true)}
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
                                    onClick={() => setOpenDelete(true)}
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

                        <ContextAwareToggle
                            eventKey={eventKey}
                        />
                    </Box>
                }

                content={
                    <Accordion.Collapse eventKey={eventKey} >
                        <Box padding="16px 20px">
                            <p className="tx-14">
                                {item?.answer ?? "-"}
                            </p>
                        </Box>
                    </Accordion.Collapse>
                }
            />

            {openUpdate
                ? <UpdateFaq
                    faq={item}
                    open={openUpdate}
                    onClose={() => setOpenUpdate(false)}
                    onSuccessCallback={refresh}
                />
                : null
            }

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