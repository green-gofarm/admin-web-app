import { Box, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useHostFarmstays from "../hooks/useHostFarmstays";
import useDelayLoading from "../../../../../../../hooks/useDelayLoading";
import { CURRENT_ROLE, ROLES } from "../../../../../../../setting/setting";
import ConditionWrapper from "../../../../../../General/Wrapper/ConditionWrapper";
import SkeletonFarmstayItem from "../../../../../Host/Farmstay/ui-segment/SkeletonFarmstayItem";
import FarmstayItem from "../../../../../Host/Farmstay/ui-segment/FarmstayItem";
import { isAvailableArray } from "../../../../../../../helpers/arrayUtils";
import useBackUrl from "../../../../../../../hooks/useBackUrl";

interface FarmstayListProps {
    user: any
}

export default function FarmstayList({
    user
}: FarmstayListProps) {

    const navigate = useNavigate();
    const {createBackUrl} = useBackUrl();

    const {
        data,
        loading,
        pagination,
        refresh
    } = useHostFarmstays(user?.id);

    const delay = useDelayLoading(loading);

    const handleOpenFarmstayDetail = (farmstay: any) => {
        if (farmstay?.id) {
            if (CURRENT_ROLE === ROLES.HOST) {
                navigate(`/management/farmstay/${farmstay?.id}?backUrl=${createBackUrl()}`);
            }
            if (CURRENT_ROLE === ROLES.ADMIN) {
                navigate(`/management/farmstay/all/${farmstay?.id}?backUrl=${createBackUrl()}`);
            }
        }
    }

    return (
        <>
            <Grid container spacing={2}>
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
        </>
    );
}
