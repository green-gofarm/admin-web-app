import { Box, Grid } from '@mui/material'
import FarmImageGeneralView from '../FarmImageGeneralView'
import { MapContainer, TileLayer } from "react-leaflet";
import { Card, Table } from 'react-bootstrap';
import { isAvailableArray } from '../../../../../../helpers/arrayUtils';
import StringWrapper from '../../../../../General/Wrapper/StringWrapper';
import useContactInfo from '../hooks/useContactInfo';
import useFarmstayImages from '../hooks/useFarmstayImages';


interface IBasicInfo {
    detail: any,
    loading: boolean,
}

function BasicInfoTab({
    detail,
    loading,
}: IBasicInfo) {
    const position: any = [10.797056, 106.659840];

    const contactInfo = useContactInfo(detail);
    const images = useFarmstayImages(detail);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Card>
                    <Card.Body>
                        <h5 className="mb-2 fw-semibold">Mô tả</h5>
                        <p className="mb-3 tx-13">
                            {detail?.description}
                        </p>
                    </Card.Body>
                </Card>
            </Grid>

            <Grid item xs={12}>
                <Card>
                    <Card.Body>
                        <h5 className="mb-2 fw-semibold">
                            Hình ảnh
                        </h5>
                        <Box className='file-detailimg'>
                            <FarmImageGeneralView
                                images={images?.others}
                            />
                        </Box>
                    </Card.Body>
                </Card>
            </Grid>

            <Grid item xs={12}>
                <Card>
                    <Card.Body>
                        <h5 className="mb-2 fw-semibold">Thông tin liên hệ</h5>
                        {isAvailableArray(contactInfo)
                            ? <div className="table-responsive">
                                <Table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th className="text-start">Phương thức</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {contactInfo.map((item, jd) =>
                                            <tr key={jd}>
                                                <Box
                                                    component="td"
                                                    className="fw-semibold"
                                                >
                                                    {item.method}
                                                </Box>
                                                <Box
                                                    component="td"
                                                    className="fw-semibold"
                                                >
                                                    <StringWrapper
                                                        text={item.value}
                                                    />
                                                </Box>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </div>
                            : <Box className="mb-3 tx-13">
                                <i>Chưa có thông tin liên hệ</i>
                            </Box>
                        }

                    </Card.Body>
                </Card>
            </Grid>

            <Grid item xs={12}>
                <Card>
                    <Card.Body>
                        <h5 className="mb-2 fw-semibold">
                            Vị trí
                        </h5>
                        <MapContainer center={position} zoom={13} scrollWheelZoom={false} className='mapleaflet ht-300' id="leaflet1" style={{ height: "400px" }}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                        </MapContainer>
                    </Card.Body>
                </Card>
            </Grid>
        </Grid>
    )
}

export default BasicInfoTab;