import FeedbackItem from '../ui-segment/FeedbackItem';
import { isAvailableArray } from '../../../../../../helpers/arrayUtils';
import { Card } from "react-bootstrap";
import useFarmstayFeedbacks from "../hooks/useFarmstayFeedbacks";

interface FeedbackTabProps {
    detail?: any,
    loading?: boolean,
}


function FeedbackTab({
    detail,
    loading,
}: FeedbackTabProps) {

    const { data } = useFarmstayFeedbacks(detail?.id);

    return (
        <>
            <Card>
                <Card.Header className='border-bottom'>
                    <Card.Title>
                        Danh sách phản hồi
                    </Card.Title>
                </Card.Header>
                {isAvailableArray(data)
                    ? <Card.Body className="card-body p-0">
                        {data.map((item, index) =>
                            <FeedbackItem
                                key={index}
                                item={item}
                            />
                        )}
                    </Card.Body>
                    : <Card.Body>
                        <i>Chưa có feedback nào</i>
                    </Card.Body>
                }
            </Card>
        </>
    )
}

export default FeedbackTab