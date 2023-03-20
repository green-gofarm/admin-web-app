import React, { useState } from "react";
import PageHeader from "../../../General/PageHeader";
import { Box, Grid } from "@mui/material";
import AddFarmstayItem from "./ui-segment/AddFarmstayItem";
import json from "./farmstay.json";
import { isAvailableArray } from "../../../../helpers/arrayUtils";
import FarmstayItem from "./ui-segment/FarmstayItem";
import { useNavigate } from "react-router-dom";
import CreateFarmstay from "./create-farmstay/CreateFarmstay";

const data = JSON.parse(JSON.stringify(json)).data;

export default function FarmstayManagement() {

    const navigate = useNavigate();

    // State
    const [openCreate, setOpenCreate] = useState(false);

    const handleCreateFarmStay = () => {
        setOpenCreate(true);
    }

    const handleCloseCreateFarmStay = () => {
        setOpenCreate(false);
        //TODO: Refresh list
    }

    const handleOpenFarmstayDetail = (farmstay: any) => {
        if (farmstay?.id) {
            navigate(`/farmstay/${farmstay?.id}`);
        }
    }

    return (
        <>
            <Box marginBottom="1.3rem">
                <PageHeader
                    title="Farmstay của bạn"
                />

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4} xl={3}>
                        <AddFarmstayItem onClick={handleCreateFarmStay} />
                    </Grid>
                    {isAvailableArray(data)
                        ? data.map(item =>
                            <Grid item xs={12} sm={6} md={4} xl={3} key={item.id}>
                                <FarmstayItem
                                    item={item}
                                    onClick={() => handleOpenFarmstayDetail(item)}
                                />
                            </Grid>
                        )
                        : null
                    }
                </Grid>
            </Box>

            {openCreate
                ? <CreateFarmstay
                    open={openCreate}
                    onClose={handleCloseCreateFarmStay}
                />
                : null
            }
        </>
    );
}
