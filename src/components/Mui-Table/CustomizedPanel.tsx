import { Card as ReactBootstrapCard } from "react-bootstrap"

interface ICustomizedPanel {
    title?: string,
    panel?: any,
}

function CustomizedPanel({
    title,
    panel,
}: ICustomizedPanel) {

    if (!title && !panel) {
        return null;
    }

    return (
        <>
            <ReactBootstrapCard.Header className="border-bottom-0 d-flex pb-0">
                {title
                    ? <h3 className="card-title">{title}</h3>
                    : null
                }
                {panel
                    ? <div className="card-options">{panel}</div>
                    : null
                }
            </ReactBootstrapCard.Header>
        </>
    )
}

export default CustomizedPanel