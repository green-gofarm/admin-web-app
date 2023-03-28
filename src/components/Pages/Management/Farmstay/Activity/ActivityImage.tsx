import CustomizedCard from '../../../../General/Card/CustomizedCard'
import ImageView from '../../../../General/ImageView'

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
            <CustomizedCard
                title={`Hình ảnh (${images?.others?.length ?? 0})`}
                content={<ImageView images={images?.others} />}
            />
        </>
    )
}

export default ActivityImage