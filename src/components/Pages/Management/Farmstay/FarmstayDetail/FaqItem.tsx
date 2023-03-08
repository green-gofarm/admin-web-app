import { ReactNode, memo } from 'react'
import { Accordion } from 'react-bootstrap'

export type FaqItemType = {
    question: string | ReactNode,
    answer: string | ReactNode
}

interface IFaqItem {
    item: FaqItemType
}

function FaqItem({
    item,
}: IFaqItem) {
    return (
        <Accordion className='overflow-hidden card'>
            <Accordion.Item eventKey="0">
                <Accordion.Header className='accordion-toggle font-weight-semibold tx-12 panel-heading2'>
                    {item?.question ?? "-"}
                </Accordion.Header>
                <Accordion.Body id="collapseFour1" className="panel-body">
                    <p className="text-muted tx-14">
                        {item?.answer ?? "-"}
                    </p>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default memo(FaqItem);