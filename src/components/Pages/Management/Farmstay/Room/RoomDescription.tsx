import CustomizedCard from '../../../../General/Card/CustomizedCard'

interface RoomDescriptionProps {
    detail: any,
    loading: any,
    images?: any,
}

function RoomDescription({
    detail,
    loading,
    images,
}: RoomDescriptionProps) {
    return (
        <>
            <CustomizedCard
                title="Mô tả"
                content={detail?.description ?? <i>Chưa có mô tả</i>}
            />
        </>
    )
}

export default RoomDescription