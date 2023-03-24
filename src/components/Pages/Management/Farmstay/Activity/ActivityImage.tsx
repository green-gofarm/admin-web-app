import React from 'react'
import FarmImageGeneralView from '../FarmstayDetail/FarmImageGeneralView'

interface ActivityImageProps {
    detail: any,
    loading: any,
    images?: any,
}

function ActivityImage({
    detail,
    loading,
    images,
}: ActivityImageProps) {
    return (
        <>
            <FarmImageGeneralView />
        </>
    )
}

export default ActivityImage