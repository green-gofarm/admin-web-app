import { Grid } from "@mui/material"
import StatisticCardOverview, { IStatisticCardOverview } from "./StatisticCardOverview"

interface IStatisticCardOverviewGroup {
    data: IStatisticCardOverview[] | [],
    spacing?: number,
    responsive?: {
        xs?: number | "auto",
        sm?: number | "auto",
        md?: number | "auto",
        lg?: number | "auto",
        xl?: number | "auto",
    },
}

function StatisticCardOverviewGroup({
    data,
    spacing,
    responsive = {
        xs: 12
    }
}: IStatisticCardOverviewGroup) {
    return (
        <Grid container spacing={spacing ?? 0}>
            {data.map((item, index) =>
                <Grid item {...responsive} key={item.title ?? index}>
                    <StatisticCardOverview {...item} />
                </Grid>
            )}
        </Grid>
    )
}

export default StatisticCardOverviewGroup;