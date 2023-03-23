import React, { Fragment, useState } from 'react'
import { Card, Table } from 'react-bootstrap';
import { convertToMoney } from '../../../../../../helpers/stringUtils';
import { Box, Button, Grid } from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import LockIcon from "@mui/icons-material/Lock";

const data = [
    {
        category: "Dịch vụ phòng",
        services: [
            { name: "Chăn, gối", price: 500000 },
            { name: "Điều hòa không khí", price: 500000 },
            { name: "Máy sấy tóc", price: 500000 },
            { name: "Máy pha trà/cà phê", price: 500000 },
            { name: "Tủ lạnh", price: 500000 },
            { name: "Internet - Wifi", price: 500000 },
            { name: "TV màn hình phẳng", price: 500000 },
            { name: "Điện thoại bàn", price: 500000 },
        ]
    },
    {
        category: "Dịch vụ ăn uống",
        services: [
            { name: "Buffet sáng", price: 500000 },
            { name: "Nhà hàng", price: 500000 },
            { name: "Quầy bar", price: 500000 },
        ]
    },
    {
        category: "Dịch vụ giặt ủi",
        services: [
            { name: "Giặt ủi quần áo", price: 500000 }
        ]
    },
    {
        category: "Dịch vụ xe đưa đón",
        services: [
            { name: "Xe đưa đón sân bay", price: 500000 },
            { name: "Xe đưa đón du lịch", price: 500000 },
        ]
    },
    {
        category: "Khác",
        services: [
            { name: "Cho phép mang vật nuôi", price: 500000 },
            { name: "Dịch vụ đặt tour", price: 500000 },
            { name: "Đưa đón đến ga tàu", price: 500000 },
            { name: "Đưa đón đến bến xe", price: 500000 },
            { name: "Lễ tân 24/24", price: 500000 },
            { name: "Phòng họp", price: 500000 },
            { name: "Phòng tập thể dục", price: 500000 },
            { name: "Spa & Massage", price: 500000 },
            { name: "Tiệc nướng ngoài trời", price: 500000 },
        ]
    }
];

function ServiceTab() {

    const [openCreate, setOpenCreate] = useState<boolean>(false);

    return (
        <Grid container spacing={2}>

            <Grid item xs={12}>
                <Box
                    width="100%"
                    display="flex"
                    justifyContent="flex-end"
                >
                    <Button
                        color="primary"
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setOpenCreate(true)}
                    >
                        THÊM MỚI
                    </Button>
                </Box>
            </Grid>

            <Grid item xs={12}>
                <Card>
                    <Card.Body>
                        {data.map((item, index) =>
                            <Fragment key={index}>
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    className='mb-2'
                                >
                                    <h5 className="mb-0 fw-semibold">
                                        {item.category}
                                    </h5>
                                </Box>
                                <div className="table-responsive">
                                    <Table className="table table-bordered">
                                        <tbody>
                                            {item.services.map((item, jd) =>
                                                <tr key={jd}>
                                                    <Box
                                                        component="td"
                                                        className="fw-semibold"
                                                        width="80%"
                                                    >
                                                        {item.name}
                                                    </Box>
                                                    <Box
                                                        component="td"
                                                        className="fw-semibold"
                                                    >
                                                        <Box marginLeft="auto">
                                                            {convertToMoney(item.price)}
                                                        </Box>
                                                    </Box>
                                                    <Box
                                                        component="td"
                                                        className="fw-semibold"
                                                    >
                                                        <Box
                                                            display="flex"
                                                            gap="8px"
                                                        >
                                                            <Box
                                                                className="btn btn-warning shadow"
                                                            // onClick={() => setOpenLock(true)}
                                                            >
                                                                <LockIcon /> Khóa
                                                            </Box>
                                                            <Box
                                                                className="btn btn-secondary shadow"
                                                            // onClick={() => setOpenDelete(true)}
                                                            >
                                                                <DeleteForeverIcon /> Xóa
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                </div>
                            </Fragment>
                        )}
                    </Card.Body>
                </Card>
            </Grid>
        </Grid>
    )
}

export default ServiceTab