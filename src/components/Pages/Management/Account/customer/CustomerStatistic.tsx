import React, { memo } from 'react'
import { IStatisticCard } from '../../../../General/Statistic/StatisticCard'
import StatisticCardGroup from '../../../../General/Statistic/StatisticCardGroup'

interface _ICustomerStatistic {
    data: IStatisticCard[]
}

function CustomerStatistic({
    data
}: _ICustomerStatistic) {
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

export default memo(CustomerStatistic);