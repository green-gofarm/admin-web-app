import { Box } from '@mui/material'
import { memo, useState } from 'react'
import { Accordion, Dropdown, useAccordionButton } from 'react-bootstrap'
import ConditionWrapper from '../../../../../General/Wrapper/ConditionWrapper'
import { FAQ_STATUSES, findFaqStatus } from '../../../../../../setting/faqs-status-setting'
import LockFaq from '../action/LockFaq'
import UnlockFaq from '../action/UnlockFaq'
import DeleteFaq from '../action/DeleteFaq'
import { DeleteForever, Edit, ExpandMore, Lock, LockOpen } from '@mui/icons-material'
import UpdateFaq from '../action/UpdateFaq'
import { Status } from '../../../../../../setting/Status'
import CustomizedCard from '../../../../../General/Card/CustomizedCard'

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

    const decoratedOnClick = useAccordionButton(eventKey);

    const [openUpdate, setOpenUpdate] = useState<boolean>(false);
    const [openLock, setOpenLock] = useState<boolean>(false);
    const [openUnlock, setOpenUnlock] = useState<boolean>(false);
    const [openDelete, setOpenDelete] = useState<boolean>(false);

    return (
        <>
            <CustomizedCard
                title={item?.question}
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
                                className="ms-2 br-5 p-2 border "
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

                        <ExpandMore
                            onClick={decoratedOnClick}
                        />
                    </Box>
                }

                content={
                    <Accordion.Collapse eventKey={eventKey}>
                        <p className="tx-14">
                            {item?.answer ?? "-"}
                        </p>
                    </Accordion.Collapse>
                }
            />

            {openUpdate
                ? <UpdateFaq
                    faq={item}
                    open={openUpdate}
                    onClose={() => setOpenUpdate(true)}
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