import { Box } from '@mui/material'
import { Table } from 'react-bootstrap'
import IconLabelDetail from '../../../../../General/Item/IconLabelDetail';
import AvatarWrapper from '../../../../../General/Wrapper/AvatarWrapper';
import { MapContainer, TileLayer } from "react-leaflet";

interface IBasicInfo {
    detail: any,
}

function PreviewBasicInfoTab({
    detail
}: IBasicInfo) {

    const position: any = [10.797056, 106.659840];


    return (
        <div className="tab-pane " id="tab5">
            <h5 className="mb-3 mt-1 fw-semibold">Thông tin cơ bản:</h5>
            <IconLabelDetail
                icon={<i className="fa fa-user me-2"></i>}
                label="Chủ sở hửu:"
                value={
                    <Box
                        display="flex"
                        alignItems="center"
                        gap="8px"
                        className="tag tag-rounded"
                    >
                        <AvatarWrapper
                            name={detail?.host.name}
                            avatarProps={{
                                width: "22px !important",
                                height: "22px !important",
                                fontSize: "12px !important"
                            }}
                        />
                        {detail?.host.name}
                    </Box>
                }
                className="mb-4"
            />
            <IconLabelDetail
                icon={<i className="fa fa-location-arrow me-2"></i>}
                label="Địa chỉ:"
                value={detail?.address}
                className="mb-4"
            />
            <IconLabelDetail
                icon={<i className="fa fa-phone me-2"></i>}
                label="Liên hệ"
                value={detail?.contactInformation}
                className="mb-4"
            />

            <h5 className="mb-2 mt-1 fw-semibold">Mô tả:</h5>
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

            <h5 className="mb-2 mt-3 fw-semibold">
                Tiện nghi:
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

            <h5 className="mb-2 mt-3 fw-semibold">
                Vị trí:
            </h5>
            <MapContainer center={position} zoom={13} scrollWheelZoom={false} className='mapleaflet ht-300' id="leaflet1" style={{ height: "400px" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </div>
    )
}

export default PreviewBasicInfoTab;