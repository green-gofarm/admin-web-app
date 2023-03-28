import { useState } from "react";
import PageHeader from "../../../General/PageHeader";
import { Box, Button, Grid } from "@mui/material";
import AddFarmstayItem from "./ui-segment/AddFarmstayItem";
import { isAvailableArray } from "../../../../helpers/arrayUtils";
import FarmstayItem from "./ui-segment/FarmstayItem";
import { useNavigate } from "react-router-dom";
import CreateFarmstay from "./create-farmstay/CreateFarmstay";
import useHostFarmstays from "./hooks/useHostFarmstays";
import ConditionWrapper from "../../../General/Wrapper/ConditionWrapper";
import SkeletonFarmstayItem from "./ui-segment/SkeletonFarmstayItem";
import useDelayLoading from "../../../../hooks/useDelayLoading";

export default function FarmstayManagement() {

    const navigate = useNavigate();

    const {
        data,
        loading,
        pagination,
        refresh
    } = useHostFarmstays();

    const delay = useDelayLoading(loading);

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
            navigate(`/management/farmstay/${farmstay?.id}`);
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
                    <ConditionWrapper isRender={delay}>
                        {new Array(pagination.pageSize - data.length).fill("").map((_, index) =>
                            <Grid item xs={12} sm={6} md={4} xl={3} key={"skt" + index}>
                                <SkeletonFarmstayItem />
                            </Grid>
                        )}
                    </ConditionWrapper>
                </Grid>

                <ConditionWrapper isRender={pagination.totalItem > pagination.page * pagination.pageSize}>
                    <Box
                        width="100%"
                        display="flex"
                        justifyContent="center"
                        marginTop="2rem"
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => refresh({
                                ...pagination,
                                pageSize: pagination.totalItem,
                            })}
                        >
                            Xem tất cả
                        </Button>
                    </Box>
                </ConditionWrapper>
            </Box>

            {openCreate
                ? <CreateFarmstay
                    open={openCreate}
                    onClose={handleCloseCreateFarmStay}
                    refresh={refresh}
                />
                : null
            }
        </>
    );
}
