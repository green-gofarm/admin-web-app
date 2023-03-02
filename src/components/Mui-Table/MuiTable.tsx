import React, { useEffect, useState } from "react";

import makeStyles from '@mui/styles/makeStyles';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";

// core components
import componentStyles from "./tables";
import CustomTableHeader from "./CustomizedTableHeader";
import CustomTableBody from "./CustomizedTableBody";
import { DEFAULT_PAGINATION } from "./setting";
import { isAvailableArray } from "../../helpers/arrayUtils";
import CustomizedTablePagination from "./CustomizedTablePagination";

const useStyles = makeStyles(componentStyles);

interface ITable {
    title?: string,
    data: any[],
    columns: any[],
    panel?: any,
    loadingData?: boolean,
    noPaging?: boolean
}

const MuiTables = ({
    title,
    columns,
    data,
    panel,
    loadingData,
    noPaging
}: ITable) => {
    const classes = useStyles();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_PAGINATION.rowsPerPage);

    const [paginationData, setPaginationData] = useState<any[]>([]);

    useEffect(() => {
        const startIndex = page * rowsPerPage;
        const endIndex = (page + 1) * rowsPerPage;
        setPaginationData(() => {
            if (!isAvailableArray(data)) return [];
            return data.slice(startIndex, endIndex) ?? [];
        });
    }, [data, page, rowsPerPage])


    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: any) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            <Card classes={{ root: classes.cardRoot }}>
                {title || panel
                    ? <CardHeader
                        className={classes.cardHeader}
                        title={title ?? ""}
                        titleTypographyProps={{
                            component: Box,
                            marginBottom: "0!important",
                            variant: "h3",
                        }}
                        action={panel}
                    />
                    : null
                }
                <TableContainer>
                    <Box
                        component={Table}
                        alignItems="center"
                        marginBottom="0!important"
                    >
                        <CustomTableHeader
                            columns={columns}
                        />

                        <CustomTableBody
                            columns={columns}
                            data={paginationData}
                            loadingData={loadingData}
                        />
                    </Box>
                </TableContainer>
                {noPaging !== true &&
                    <Box
                        classes={{ root: classes.cardActionsRoot }}
                        component={CardActions}
                        justifyContent="flex-end"
                    >
                        <CustomizedTablePagination
                            count={isAvailableArray(data) ? data.length : 0}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            rowsPerPageOptions={[5, 10, 20, 50]}
                            handleChangePage={handleChangePage}
                            handleChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </Box>
                }
            </Card>
        </>
    );
};

export default MuiTables;
