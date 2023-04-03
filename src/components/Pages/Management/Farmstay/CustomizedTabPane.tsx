import React from 'react'
import { Box } from '@mui/material'
import { Card, Tab } from 'react-bootstrap'


function CustomizedTabContent() {
  return (
    <Tab.Pane eventKey="About">
      <Box
        className="main-content-body tab-pane border-0"
      >
        <Card>
          <Card.Body
            className="border-0"
            data-select2-id="12"
          >
          </Card.Body>
        </Card>
      </Box>
    </Tab.Pane>
  )
}

export default CustomizedTabContent