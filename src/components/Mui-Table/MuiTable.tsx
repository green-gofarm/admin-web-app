import React, { useEffect, useState } from "react";

import makeStyles from '@mui/styles/makeStyles';
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import { Card as ReactBootstrapCard } from "react-bootstrap"
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
    noPaging?: boolean,
    fixedColumns?: {
        left?: number,
        right?: number
    }
}

const MuiTables = ({
    title,
    columns,
    data,
    panel,
    loadingData,
    noPaging,
    fixedColumns = {
        left: 0,
        right: 0
    }
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
            <ReactBootstrapCard>
                {title || panel
                    ? <ReactBootstrapCard.Header className=" border-bottom-0 d-flex">
                        {title
                            ? <h3 className="card-title mb-2 ">{title}</h3>
                            : null
                        }
                        {panel
                            ? <div className="card-options">{panel}</div>
                            : null
                        }
                    </ReactBootstrapCard.Header>
                    : null
                }
                <ReactBootstrapCard.Body>
                    <Box position="relative">
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
                        {fixedColumns?.left && fixedColumns.left > 0
                            ? <TableContainer>
                                <Box
                                    component={Table}
                                    alignItems="center"
                                    marginBottom="0!important"
                                    sx={{
                                        minWidth: "auto",
                                        position: "absolute",
                                        width: "100px",
                                        top: 0,
                                        zIndex: 1,
                                        left: 0,
                                        boxShadow: "2px 0 2px -2px #9da1b6",

                                        "& th, & td": {
                                            whiteSpace: "nowrap !important",
                                        },
                                        "& td": {
                                            background: "#fff"
                                        }
                                    }}
                                >
                                    <CustomTableHeader
                                        columns={columns.slice(0, fixedColumns.left)}
                                    />

                                    <CustomTableBody
                                        columns={columns.slice(0, fixedColumns.left)}
                                        data={paginationData}
                                        loadingData={loadingData}
                                    />
                                </Box>
                            </TableContainer>
                            : null
                        }
                        {fixedColumns?.right && fixedColumns.right > 0
                            ? <TableContainer>
                                <Box
                                    component={Table}
                                    alignItems="center"
                                    marginBottom="0!important"
                                    sx={{
                                        minWidth: "auto",
                                        position: "absolute",
                                        width: "100px",
                                        top: 0,
                                        zIndex: 2,
                                        right: 0,
                                        boxShadow: "-2px 0px 2px -2px #9da1b6",

                                        "& th, & td": {
                                            whiteSpace: "nowrap !important",
                                        },
                                        "& td": {
                                            background: "#fff"
                                        }
                                    }}
                                >
                                    <CustomTableHeader
                                        columns={columns.slice(columns.length - fixedColumns.right || 0, columns.length)}
                                    />

                                    <CustomTableBody
                                        columns={columns.slice(columns.length - fixedColumns.right || 0, columns.length)}
                                        data={paginationData}
                                        loadingData={loadingData}
                                    />
                                </Box>
                            </TableContainer>
                            : null
                        }
                    </Box>
                    {noPaging !== true
                        ? <Box
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
                        : null
                    }
                </ReactBootstrapCard.Body>
            </ReactBootstrapCard>
        </>
    );
};

export default MuiTables;
