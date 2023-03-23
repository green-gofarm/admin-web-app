import React from 'react'
import { Box } from '@mui/material';
import { Table } from 'react-bootstrap';
import EditIconAction from '../../../../../General/Action/IconAction/EditIconAction';

const data = [
    {
        label: "Thời gian nhận phòng/trả phòng",
        value: "Thời gian nhận phòng: từ 14:00 trở đi. Thời gian trả phòng: trước 12:00 giờ trưa."
    },
    {
        label: "Chính sách hủy đơn",
        value: "Khách hàng có thể hủy đơn miễn phí trước 24 giờ trước khi nhận phòng. Hủy đơn trong vòng 24 giờ trước khi nhận phòng hoặc không xuất hiện tại chỗ nghỉ sẽ bị tính phí 100% giá trị đơn đặt phòng."
    },
    {
        label: "Chính sách hút thuốc",
        value: "Cấm hút thuốc trong tất cả các khu vực chung của chỗ nghỉ. Khách hàng chỉ được hút thuốc tại những khu vực được phép và không để lại vết thuốc lá."
    },
    {
        label: "Giới hạn độ tuổi",
        value: "Khách hàng từ 18 tuổi trở lên mới được đặt phòng và nhận phòng tại chỗ nghỉ."
    },
    {
        label: "Trẻ em",
        value: "Trẻ em dưới 6 tuổi được ở miễn phí khi sử dụng giường cũng như đồ dùng cơ bản cùng với người lớn đi kèm. Trẻ em từ 6 tuổi trở lên tính giá phụ thu theo quy định của chỗ nghỉ."
    },
    {
        label: "Vật nuôi",
        value: "Không cho phép mang vật nuôi vào chỗ nghỉ. Nếu có yêu cầu mang vật nuôi, vui lòng liên hệ với chỗ nghỉ trước khi đặt phòng để được tư vấn cụ thể."
    },
    {
        label: "Trách nhiệm pháp lý",
        value: "Khách hàng phải chịu trách nhiệm về mọi hành vi của mình tại chỗ nghỉ. Chỗ nghỉ không chịu trách nhiệm đối với mọi hành vi trái phép của khách hàng."
    },
    {
        label: "Dịch vụ dọn phòng",
        value: "Chỗ nghỉ cung cấp dịch vụ dọn phòng hàng ngày. Nếu khách hàng không muốn được dọn phòng hàng ngày, vui lòng liên hệ với chỗ nghỉ."
    },
    {
        label: "Quy định khác",
        value: "Khách hàng không được tổ chức các bữa tiệc hay sử dụng chỗ nghỉ để mục đích thương mại. Chỗ nghỉ không chấp nhận thanh toán bằng thẻ tín dụng hoặc thẻ ATM, chỉ chấp nhận thanh toán bằng tiền mặt."
    },
];

function PolicyTab() {
    return (
        <div>

            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                className='mb-2'
            >
                <h5 className="mb-0 fw-semibold">
                    Bảng quy định
                </h5>
                <EditIconAction />
            </Box>

            <div className="table-responsive">
                <Table className="table table-bordered">
                    <tbody>
                        {data.map((item, index) =>
                            <tr key={index}>
                                <Box
                                    component="td"
                                    textAlign="right"
                                    className="font-weight-semibold text-muted"
                                >
                                    {item.label}
                                </Box>
                                <Box
                                    component="td"
                                    className="fw-semibold"
                                >
                                    {item.value}
                                </Box>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default PolicyTab