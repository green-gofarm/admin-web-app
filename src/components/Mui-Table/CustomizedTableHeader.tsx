import React from 'react'
import { TableCell, TableHead, TableRow } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles';

import componentStyles from "./tables";
import { isAvailableArray } from '../../helpers/arrayUtils';
const useStyles = makeStyles(componentStyles);

interface ITableHeader {
    columns: any[]
}

export default function CustomTableHeader({
    columns,
}: ITableHeader) {
    const classes = useStyles();

    return (
        <TableHead>
            <TableRow>
                {isAvailableArray(columns)
                    ? columns.map((column, index) =>
                        <TableCell
                            key={column.key || index}
                            align={column.align || "left"}
                            classes={{
                                root:
                                    classes.tableCellRoot + " " + classes.tableCellRootHead,
                            }}
                        >
                            {column.label || ""}
                        </TableCell>
                    )
                    : null
                }
            </TableRow>
        </TableHead>
    )
}
