import React from 'react';

// MUI components
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import makeStyles from '@mui/styles/makeStyles';
import { Skeleton } from '@mui/material';

//Helpers
import componentStyles from "./tables";
import { isAvailableArray } from '../../helpers/arrayUtils';

const useStyles = makeStyles(componentStyles);

const NoRow = ({ classes }: any) => (
    <TableRow>
        <TableCell
            classes={{ root: classes.tableCellRoot }}
            style={{
                borderBottom: "none",
                fontSize: "14px",
                fontStyle: "italic"
            }}
        >
            Không có thông tin
        </TableCell>
    </TableRow>
)

interface ITableRowSkeleton {
    classes: any,
    columns: any[],
}

const TableRowSkeleton = ({ classes, columns }: ITableRowSkeleton) => (
    <TableRow>
        {isAvailableArray(columns) && columns.map((column: any, index) =>
            <TableCell
                key={column.key || index}
                align={column.align || "left"}
                classes={{ root: classes.tableCellRoot }}
            >
                <Skeleton
                    variant="text"
                    animation="wave"
                    height={20}
                />
            </TableCell>
        )}
    </TableRow>
)

interface ITableBody {
    data: any[],
    columns: any[],
    loadingData?: boolean,
    rowsPerPage?: number;
}

export default function CustomizedTableBody({
    columns,
    data,
    loadingData,
    rowsPerPage
}: ITableBody) {
    const classes = useStyles();

    const renderData = () => (
        data.map((row, index) =>
            <TableRow
                key={index}
            >
                {isAvailableArray(columns)
                    ? columns.map((column: any, index) =>
                        <TableCell
                            key={column.key || index}
                            align={column.align || "left"}
                            classes={{ root: classes.tableCellRoot }}
                        >
                            {column.render ? column.render(row) : (row[column.key] || "-")}
                        </TableCell>
                    )
                    : null
                }
            </TableRow>
        )
    )

    const renderContent = () => isAvailableArray(data) ? renderData() : <NoRow classes={classes} />;
    const renderSkeleton = () => (
        new Array(rowsPerPage ?? 5).fill("").map((_, i) =>
            <TableRowSkeleton classes={classes} columns={columns} key={i} />
        )
    )

    return (

        <TableBody>
            {loadingData ? renderSkeleton() : renderContent()}
        </TableBody>
    )
}