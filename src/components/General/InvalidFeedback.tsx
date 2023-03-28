import React from 'react'
import { Form } from 'react-bootstrap'

interface InvalidFeedbackProps {
    message?: any
}

function InvalidFeedback({ message }: InvalidFeedbackProps) {
    return (
        <Form.Control.Feedback
            style={{ display: "inline-block" }}
            type="invalid"
        >
            {message ?? "Thông tin bắt buộc."}
        </Form.Control.Feedback>
    )
}

export default InvalidFeedback