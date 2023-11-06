import { Grid } from '@mui/material'
import useContactInfo from '../hooks/useContactInfo';
import useFarmstayImages from '../hooks/useFarmstayImages';
import CustomizedCard from '../../../../../General/Card/CustomizedCard';
import ImageView from '../../../../../General/ImageView';
import LeafletViewMap from '../../../../../General/Map/LeafletViewMap';
import StringWrapper from '../../../../../General/Wrapper/StringWrapper';
interface IBasicInfo {
    detail: any,
    loading: boolean,
}

function BasicInfoTab({
    detail,
    loading,
}: IBasicInfo) {

    const contactInfo = useContactInfo(detail);
    const images = useFarmstayImages(detail);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <CustomizedCard
                    title="Mô tả"
                    content={
                        detail?.description
                            ? <p className="tx-13">
                                {detail?.description}
                            </p>
                            : <i>Chưa có mô tả</i>
                    }
                />
            </Grid>

            <Grid item xs={12}>
                <CustomizedCard
                    title="Phương thức liên hệ"
                    content={
                        <div className="media-list p-0">
                            {contactInfo.length < 1
                                ? <i>Chưa có phương thức liên hệ.</i>
                                : null
                            }
                            {contactInfo.map((contact, index) => {
                                if (index % 2 === 0) {
                                    // create a new media-body every two items
                                    return (
                                        <div key={index} className="media">
                                            <div className="media-body">
                                                <div>
                                                    <label>{contact.method} :</label>{" "}
                                                    <span className="tx-medium">
                                                        <StringWrapper
                                                            text={contact.value}
                                                        />
                                                    </span>
                                                </div>
                                                {contactInfo.length > index + 1 && (
                                                    <div>
                                                        <label>{contactInfo[index + 1].method} :</label>{" "}
                                                        <span className="tx-medium">
                                                            <StringWrapper
                                                                text={contactInfo[index + 1].value}
                                                            />
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )
                                }
                                return null;
                            })}
                        </div>
                    }
                />
            </Grid>

            <Grid item xs={12}>
                <CustomizedCard
                    title={`Hình ảnh (${images?.others?.length ?? 0})`}
                    content={<ImageView images={images?.others} />}
                />
            </Grid>

            <Grid item xs={12}>
                <CustomizedCard
                    title="Vị trí"
                    content={
                        <LeafletViewMap
                            location={{
                                lat: detail?.latitude,
                                lng: detail?.longitude
                            }}
                        />
                    }
                />
            </Grid>
        </Grid>
    )
}

export default BasicInfoTab;