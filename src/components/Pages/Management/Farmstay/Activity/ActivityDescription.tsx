import { Box } from '@mui/material'
import CustomizedCard from '../../../../General/Card/CustomizedCard'
import { useMemo } from 'react'
import { isAvailableArray } from '../../../../../helpers/arrayUtils'

interface ActivityDescriptionProps {
    detail: any,
    loading: any,
}

function ActivityDescription({
    detail,
    loading,
}: ActivityDescriptionProps) {

    const tags: any[] = useMemo(() => {
        if (!isAvailableArray(detail?.tags)) return [];
        return detail.tags;
    }, [detail?.tags]);

    return (
        <>
            <CustomizedCard
                title="Mô tả"
                content={
                    <Box>
                        <p className="mb-3 tx-13">
                            {detail?.description}
                        </p>
                        <Box display="flex" gap="8px" flexWrap="wrap">
                            {tags.map((item, index) =>
                                <span
                                    key={index}
                                    className="tag tag-rounded"
                                >
                                    {item.name}
                                </span>
                            )}
                        </Box>
                    </Box>
                }
            />
        </>
    )
}

export default ActivityDescription