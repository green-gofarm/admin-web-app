import CustomizedCard from '../../../../General/Card/CustomizedCard'
import ImageView from '../../../../General/ImageView'

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
            <CustomizedCard
                title={`Hình ảnh (${images?.others?.length ?? 0})`}
                content={<ImageView images={images?.others} />}
            />
        </>
    )
}

export default RoomImage