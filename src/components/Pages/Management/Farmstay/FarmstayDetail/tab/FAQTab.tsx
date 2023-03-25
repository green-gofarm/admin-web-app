import { useMemo } from 'react'
import FaqItem from '../ui-segment/FaqItem'
// import { Grid } from '@mui/material';
import { Accordion } from 'react-bootstrap';
import { isAvailableArray } from '../../../../../../helpers/arrayUtils';



interface FAQTabProps {
    detail?: any,
    loading?: boolean,
}


function FAQTab({
    detail,
    loading
}: FAQTabProps) {

    const faqs: any[] = useMemo(() => {
        if (!isAvailableArray(detail?.faqs)) return [];
        return detail.faqs;
    }, [detail]);

    if (!isAvailableArray(faqs)) {
        return <i>Chưa có FAQ</i>
    }

    return (
        <div>
            <Accordion defaultActiveKey="0">
                {faqs.map((item, index) =>
                    <FaqItem key={index} item={item} eventKey={index + ""} />
                )}
            </Accordion>
        </div>
    )
}

export default FAQTab