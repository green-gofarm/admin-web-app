import { Grid } from "@mui/material"
import StatisticCard, { IStatisticCard } from "./StatisticCard"

interface IStatisticCardGroup {
    data: IStatisticCard[] | [],
    spacing?: number,
    responsive?: {
        xs?: number | "auto",
        sm?: number | "auto",
        md?: number | "auto",
        lg?: number | "auto",
        xl?: number | "auto",
    },
}

function StatisticCardGroup({
    data,
    spacing,
    responsive = {
        xs: 12
    }
}: IStatisticCardGroup) {
    return (
        <Grid container spacing={spacing ?? 0}>
            {data.map((item, index) =>
                <Grid item {...responsive} key={item.title ?? index}>
                    <StatisticCard {...item} />
                </Grid>
            )}
        </Grid>
    )
}

export default StatisticCardGroup