import React, { memo } from 'react'
import { IStatisticCard } from '../../../General/Statistic/StatisticCard'
import StatisticCardGroup from '../../../General/Statistic/StatisticCardGroup'

interface _IFarmstayStatistic {
    data: IStatisticCard[]
}

function FarmstayStatistic({
    data
}: _IFarmstayStatistic) {
    return (
        <StatisticCardGroup
            data={data}
            spacing={2}
            responsive={{
                xs: 12,
                sm: 6,
                xl: 3
            }}
        />
    )
}

export default memo(FarmstayStatistic);