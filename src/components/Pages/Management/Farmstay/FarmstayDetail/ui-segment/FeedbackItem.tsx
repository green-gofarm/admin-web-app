import { formatTimeString } from "../../../../../../helpers/dateUtils"
import Rating from "../../../../../General/Rating";

interface IFeedbackItem {
    item: any
}

function FeedbackItem({
    item
}: IFeedbackItem) {
    return (
        <div className="media mt-0 p-3 border-bottom">
            <div className="d-flex me-3">
                <img
                    className="media-image avatar avatar-md rounded-circle"
                    alt="64x64"
                    src={"https://ui-avatars.com/api/?name=Le+Danh+Trong"}
                    width="128px"
                    height="128px"
                />
            </div>
            <div className="media-body">
                <h5 className="mt-0 mb-1 font-weight-semibold tx-16">
                    {item?.user?.name}
                </h5>
                <span className="text-muted tx-13">{formatTimeString(item?.createdDate)}</span>
                <Rating rating={item?.rating} />
                <p className="font-13  mb-2 mt-2">
                    {item?.comment}
                </p>
            </div>
        </div>
    )
}

export default FeedbackItem