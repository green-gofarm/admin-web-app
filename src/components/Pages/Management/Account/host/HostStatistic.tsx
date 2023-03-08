import React, { memo } from 'react'
import { IStatisticCard } from '../../../../General/Statistic/StatisticCard'
import StatisticCardGroup from '../../../../General/Statistic/StatisticCardGroup'

interface _IHostStatistic {
    data: IStatisticCard[]
}

function HostStatistic({
    data
}: _IHostStatistic) {
    return (
        <StatisticCardGroup
            data={data}
            spacing={2}
            responsive={{
                xs: 12,
                md: 6,
                lg: 4,
            }}
        />
    )
}

export default memo(HostStatistic);