import React from 'react'
import { isNumber } from '../../helpers/numberUtils';

const getFloorFeedbackRatingNumber = (rating: any) => {
    return isNumber(rating) ? Math.floor(rating) : 0;
}

const getFeedbackRatingNumber = (rating: any) => {
    return isNumber(rating) ? rating : 0;
}

interface RatingProps {
    rating: any
}

function Rating({ rating }: RatingProps) {
    return (
        <div className="text-warning">
            {new Array(getFloorFeedbackRatingNumber(rating)).fill("").map((_, index) => (
                <i className="bx bxs-star active" key={index}></i>
            ))}
            {new Array(getFloorFeedbackRatingNumber(rating) < 5 ? (5 - getFloorFeedbackRatingNumber(rating)) : 0).fill("").map((_, index) => (
                <i className="bx bxs-star text-light" key={index}></i>
            ))}
            {rating ? ` (${getFeedbackRatingNumber(rating)})` : null}
        </div>
    )
}

export default Rating