import React from 'react'
import { Nav } from 'react-bootstrap'


export type NavigationItem = {
    label: string,
    eventKey: string | number
}

interface INavigation {
    data: NavigationItem[] | [],
}

function Navigation({
    data
}: INavigation) {
    return (
        <Nav
            variant="pills"
            className="nav profile-tabs main-nav-line tabs-menu profile-nav-line bg-white border-0 br-5 mb-0"
        >
            {data.map(item =>
                <Nav.Item className="me-1" key={item.eventKey}>
                    <Nav.Link className="mb-2 mt-2" eventKey={item.eventKey}>
                        {item.label}
                    </Nav.Link>
                </Nav.Item>
            )}
        </Nav>
    )
}

export default Navigation