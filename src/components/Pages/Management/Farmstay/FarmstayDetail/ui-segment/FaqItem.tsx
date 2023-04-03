import { ReactNode, memo } from 'react'
import { Accordion } from 'react-bootstrap'

export type FaqItemType = {
    question: string | ReactNode,
    answer: string | ReactNode
}

interface IFaqItem {
    item: FaqItemType,
    eventKey: string,
}

function FaqItem({
    item,
    eventKey,
}: IFaqItem) {
    return (
        <Accordion.Item eventKey={eventKey}>
            <Accordion.Header className='font-weight-semibold'>
                {item?.question ?? "-"}
            </Accordion.Header>
            <Accordion.Body>
                <p className="text-muted tx-14">
                    {item?.answer ?? "-"}
                </p>
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default memo(FaqItem);