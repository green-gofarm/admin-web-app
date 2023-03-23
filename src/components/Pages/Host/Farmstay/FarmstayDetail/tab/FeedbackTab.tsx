import json from "../../../../Management/Feedback/feedback.json";
import FeedbackItem from '../ui-segment/FeedbackItem';
import { isAvailableArray } from '../../../../../../helpers/arrayUtils';
import { Button, Card } from "react-bootstrap";

const dataObject = JSON.parse(JSON.stringify(json));
const data = dataObject.data;

function FeedbackTab() {
    return (
        <Card>
            <Card.Body className="card-body p-0">
                {isAvailableArray(data)
                    ? data.map((item, index) =>
                        <FeedbackItem
                            key={index}
                            item={item}
                        />
                    )
                    : null
                }
                <Card.Footer>
                    <Button variant="" className="btn btn-light">Xem thêm</Button>
                </Card.Footer>
            </Card.Body>
        </Card>
    )
}

export default FeedbackTab