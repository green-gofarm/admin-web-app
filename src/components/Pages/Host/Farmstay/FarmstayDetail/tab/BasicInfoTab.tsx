import { Box, Grid } from '@mui/material'
import { Card, Form, FormGroup, Table } from 'react-bootstrap'
import FarmImageGeneralView from '../FarmImageGeneralView'
import Dropzone from "react-dropzone";
import EditIconAction from '../../../../../General/Action/IconAction/EditIconAction';
import UploadIconAction from '../../../../../General/Action/IconAction/UploadIconAction';
import CustomizedLeafletMap from '../../create-farmstay/ui-segment/CustomizedLeafletMap';

interface IBasicInfo {
    detail: any,
}

function BasicInfoTab({
    detail
}: IBasicInfo) {

    const renderBasic = () => (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <FormGroup className="form-group ">
                    <Form.Label className="form-label">
                        Tên
                    </Form.Label>


                    <Form.Control
                        type="text"
                        className="form-control"
                        defaultValue={detail?.name}
                        disabled
                    />
                </FormGroup>
            </Grid>

            <Grid item xs={12}>
                <FormGroup className="form-group ">
                    <Form.Label className="form-label">
                        Ảnh đại diện
                    </Form.Label>
                    <Dropzone>
                        {({ getRootProps, getInputProps }) => (
                            <Box
                                height="140px !important"
                                className="dropzone dz-clickable"
                            >
                                <div className="dz-message needsclick" {...getRootProps()}>
                                    <div className="mb-2 mt-4 dropzoneicon ">
                                        <i className="mdi mdi-apple-mobileme"></i>
                                    </div>
                                    <p style={{ color: "#9393b5" }}>
                                        Kéo thả vào đây hoặc nhấn để chọn logo
                                    </p>
                                </div>
                            </Box>
                        )}
                    </Dropzone>
                </FormGroup>
            </Grid>
        </Grid>
    )

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Card>
                    <Card.Body>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            className='mb-2'
                        >
                            <h5 className="mb-0 fw-semibold">
                                Thông tin cơ bản
                            </h5>
                            <EditIconAction />
                        </Box>
                        {renderBasic()}
                    </Card.Body>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <Card.Body>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            className='mb-2'
                        >
                            <h5 className="mb-0 fw-semibold">
                                Mô tả
                            </h5>
                            <EditIconAction />
                        </Box>
                        <p className="mb-3 tx-13">
                            Hãy đến với nông trại của chúng tôi! Tại đây,
                            bạn sẽ được trải nghiệm một cuộc sống đồng quê thực sự với những hoạt động nông nghiệp như gieo trồng,
                            chăm sóc động vật và thu hoạch vụ mùa. Ngoài ra, bạn còn có thể tham gia các lớp học nấu ăn với các món
                            ăn đặc trưng của vùng miền, hoặc tham gia các hoạt động giải trí như câu cá, đi bộ đường dài hoặc chèo thuyền trên sông.
                        </p>
                        <p className="mb-3 tx-13">
                            Chúng tôi mong muốn mang lại cho bạn một kỳ nghỉ thật thoải mái
                            và ý nghĩa bên gia đình và bạn bè. Với không gian xanh mát và yên tĩnh của nông trại,
                        </p>

                        <h5 className="mb-2 fw-semibold">
                            Tiện nghi
                        </h5>
                        <div className="table-responsive">
                            <Table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <td className="fw-semibold">
                                            Wifi
                                        </td>
                                        <td>Miễn phí tất cả các phòng</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-semibold">Dịch vụ dọn phòng</td>
                                        <td>Dọn phòng hằng ngày</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-semibold">
                                            Tiện nghi phòng
                                        </td>
                                        <td>Đầy đủ tiện nghi</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-semibold">
                                            Dịch vụ đưa đón
                                        </td>
                                        <td>
                                            Đón khách từ sân bay
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Card.Body>
                </Card>
            </Grid>

            <Grid item xs={12}>
                <Card>
                    <Card.Body>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            className='mb-2'
                        >
                            <h5 className="mb-0 fw-semibold">
                                Hình ảnh farmstay
                            </h5>
                            <UploadIconAction />
                        </Box>
                        <Box className='file-detailimg'>
                            <FarmImageGeneralView />
                        </Box>
                    </Card.Body>
                </Card>

            </Grid>

            <Grid item xs={12}>
                <Card>
                    <Card.Body>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            className='mb-2'
                        >
                            <h5 className="mb-0 fw-semibold">
                                Vị trí
                            </h5>
                            <EditIconAction />
                        </Box>
                        <Box width="100%" height="500px">
                            <CustomizedLeafletMap
                                triggerValue={{ lat: 10.8231, lon: 106.6297 }}
                            />
                        </Box>
                    </Card.Body>
                </Card>
            </Grid>
        </Grid>
    )
}

export default BasicInfoTab;