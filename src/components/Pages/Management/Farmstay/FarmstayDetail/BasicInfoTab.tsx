import { Box } from '@mui/material'
import { Table } from 'react-bootstrap'
import FarmstayImageBox from './FarmstayImageBox'

interface IBasicInfo {
    detail: any,
}

function BasicInfoTab({
    detail
}: IBasicInfo) {
    return (
        <div className="tab-pane " id="tab5">
            <h5 className="mb-2 mt-1 fw-semibold">Mô tả :</h5>
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
                Hình ảnh:
            </h5>
            <Box className='file-detailimg'>
                <ul id="lightgallery" className="list-unstyled row mb-0">
                    <FarmstayImageBox />
                </ul>
            </Box>
        </div>
    )
}

export default BasicInfoTab