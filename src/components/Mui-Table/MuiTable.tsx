import React, { ReactNode } from "react";

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
import CustomizedTablePagination from "./CustomizedTablePagination";
import CustomizedPanel from "./CustomizedPanel";

const useStyles = makeStyles(componentStyles);

interface ITable {
    title?: string,
    data: any[],
    columns: any[],
    panel?: any,
    loadingData?: boolean,
    noPaging?: boolean,
    noPanel?: boolean,
    filter?: ReactNode,
    fixedColumns?: {
        left?: number,
        right?: number
    },
    pagination?: {
        count: number;
        page: number;
        rowsPerPage: number;
        rowsPerPageOptions: number[];
        handleChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
        handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
    }
}

const MuiTables = ({
    title,
    columns,
    data,
    panel,
    loadingData,
    noPaging,
    noPanel,
    filter,
    fixedColumns = {
        left: 0,
        right: 0
    },
    pagination,
}: ITable) => {
    const classes = useStyles();

    return (
        <>
            <ReactBootstrapCard>
                {noPanel
                    ? null
                    : <CustomizedPanel
                        title={title}
                        panel={panel}
                    />
                }
                {filter
                    ? <ReactBootstrapCard.Header className="border-bottom-0 d-flex pb-0">
                        {filter}
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
                                    data={data}
                                    loadingData={loadingData}
                                    rowsPerPage={pagination?.rowsPerPage}
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
                                        data={data}
                                        loadingData={loadingData}
                                        rowsPerPage={pagination?.rowsPerPage}
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
                                        data={data}
                                        loadingData={loadingData}
                                        rowsPerPage={pagination?.rowsPerPage}
                                    />
                                </Box>
                            </TableContainer>
                            : null
                        }
                    </Box>
                    {noPaging !== true && pagination
                        ? <Box
                            classes={{ root: classes.cardActionsRoot }}
                            component={CardActions}
                            justifyContent="flex-end"
                        >
                            <CustomizedTablePagination
                                count={pagination.count}
                                page={pagination.page}
                                rowsPerPage={pagination.rowsPerPage}
                                rowsPerPageOptions={pagination.rowsPerPageOptions}
                                handleChangePage={pagination.handleChangePage}
                                handleChangeRowsPerPage={pagination.handleChangeRowsPerPage}
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
