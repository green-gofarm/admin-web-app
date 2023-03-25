import React from 'react'
import FarmImageGeneralView from '../FarmstayDetail/FarmImageGeneralView'

interface RoomImageProps {
    detail: any,
    loading: any,
    images?: any,
}

function RoomImage({
    detail,
    loading,
    images,
}: RoomImageProps) {
    return (
        <>
            <FarmImageGeneralView
                images={images?.others}
            />
        </>
    )
}

export default RoomImage