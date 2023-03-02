import { Box } from '@mui/material'
import React from 'react'
import { Breadcrumb } from 'react-bootstrap'

export interface IBreadcrumbItem {
    text: string;
    href?: string;
    active?: boolean;
    props?: object
}

interface IPageHeader {
    title?: string,
    breadcrumb?: Array<IBreadcrumbItem>,
}

function PageHeader({ title, breadcrumb }: IPageHeader) {
    return (
        <div className="breadcrumb-header justify-content-between">
            <div className="left-content">
                <Box
                    component="span"
                    className="main-content-title mg-b-0 mg-b-lg-1"
                    textTransform="capitalize"
                >
                    {title}
                </Box>
            </div>
            <div className="justify-content-center mt-2">
                <Breadcrumb className="breadcrumb">
                    {breadcrumb?.map((item, index) => (
                        <Breadcrumb.Item
                            key={index}
                            className={`breadcrumb-item ${item.active ? "" : "tx-15"}`}
                            href={item.href}
                            active={Boolean(item.active)}
                            {...item.props ?? {}}
                        >
                            {item.text}
                        </Breadcrumb.Item>
                    ))}
                </Breadcrumb>
            </div>
        </div>
    )
}

export default PageHeader