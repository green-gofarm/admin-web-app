import { ReactNode } from 'react';
import { Card } from 'react-bootstrap';
import { convertToMoney } from '../../../helpers/stringUtils';
import { formatNumber } from '../../../helpers/numberUtils';
import { Box, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles/makeStyles';

const useStyles = makeStyles({
    card: {
        marginBottom: "0 !important"
    }
})

export interface IStatisticCardOverview {
    type?: "number" | "money" | "string",
    icon?: ReactNode,
    title?: string,
    value: string | number | ReactNode,
    subTitle?: string,
    subValue?: string | number | ReactNode,
}

const renderValue = (type?: string, value?: string | number | ReactNode): string | ReactNode | null => {
    if (type === "money" && typeof value === "number") {
        return convertToMoney(value);
    }

    if (type === "number" && typeof value === "number") {
        return formatNumber(value, 0);
    }

    return value ?? "N/A";
}

function StatisticCardOverview({
    icon,
    title,
    value,
    subTitle,
    subValue,
    type,
}: IStatisticCardOverview) {

    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <Grid container spacing={2}>
                <Grid item xs={9}>
                    <div className="ps-4 pt-4 pe-3 pb-4">
                        <div className="">
                            <h6 className="mb-2 tx-12 ">{title}</h6>
                        </div>
                        <div className="pb-0 mt-0">
                            <div className="d-flex">
                                <h4 className="tx-20 font-weight-semibold mb-2">
                                    {renderValue(type, value)}
                                </h4>
                            </div>
                            {!!subTitle || !!subValue
                                ? <p className="mb-0 tx-12 text-muted">
                                    {subTitle
                                        ? <Box marginRight="0.5rem" component="span">
                                            {subTitle}
                                        </Box>
                                        : null
                                    }
                                    {subValue
                                        ? <span className="font-weight-semibold">
                                            {renderValue(type, subValue)}
                                        </span>
                                        : null
                                    }
                                </p>
                                : null
                            }
                        </div>
                    </div>
                </Grid>
                <Grid item xs={3}>
                    {icon}
                </Grid>
            </Grid>
        </Card>
    )
}

export default StatisticCardOverview;