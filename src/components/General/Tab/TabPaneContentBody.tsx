import { Box } from '@mui/material'
import React, { ReactNode } from 'react'
import { Card, Tab } from 'react-bootstrap'

interface ITabPaneContentBody {
    eventKey: string | number,
    children: ReactNode,
}

function TabPaneContentBody({
    eventKey,
    children
}: ITabPaneContentBody) {
    return (
        <Tab.Pane eventKey={eventKey}>
            <Box className="main-content-body tab-pane border-0">
                <Card>
                    <Card.Body className="border-0">
                        {children}
                    </Card.Body>
                </Card>
            </Box>
        </Tab.Pane>
    )
}

export default TabPaneContentBody