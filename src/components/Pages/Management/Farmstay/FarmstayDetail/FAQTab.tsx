import React from 'react'
import FaqItem, { FaqItemType } from './FaqItem'
import { Grid } from '@mui/material';

const data: FaqItemType[] = [
    {
        question: "1. Farmstay là gì?",
        answer:
            "Farmstay là một dịch vụ nghỉ dưỡng cho phép du khách trải nghiệm cuộc sống trang trại tại nông thôn. Du khách sẽ được ở tại các căn nhà trang trại, tham gia các hoạt động ngoài trời như trồng trọt, chăm sóc động vật, đi bộ đường dài, vv.",
    },
    {
        question: "2. Farmstay có những lợi ích gì?",
        answer:
            "Farmstay giúp du khách thoát khỏi nhịp sống đô thị ồn ào, tìm hiểu và trải nghiệm cuộc sống trang trại, gần gũi với thiên nhiên. Ngoài ra, farmstay còn là cách để du khách hòa mình vào văn hóa, phong tục, tập quán của người dân nông thôn.",
    },
    {
        question: "3. Farmstay có phù hợp với những ai?",
        answer:
            "Farmstay phù hợp với những ai muốn tránh xa sự ồn ào của thành phố, tìm hiểu và trải nghiệm cuộc sống trang trại, muốn khám phá văn hóa, phong tục của người dân nông thôn hoặc đơn giản là muốn thư giãn và tận hưởng không khí trong lành của thiên nhiên.",
    },
    {
        question: "4. Farmstay cần chuẩn bị gì khi đi?",
        answer:
            "Khi đi farmstay, bạn nên chuẩn bị đồ dùng cá nhân như kem chống nắng, muỗi đuổi, thuốc muỗi, vv. Ngoài ra, cũng nên mang theo quần áo và giày thoải mái để đi bộ và tham gia các hoạt động ngoài trời.",
    },
    {
        question: "5. Farmstay có giá bao nhiêu?",
        answer:
            "Giá của farmstay thường dao động từ vài trăm đến vài triệu đồng một đêm, tùy thuộc vào vị trí, chất lượng dịch vụ, tiện nghi và số lượng người đi cùng. Bạn nên tham khảo giá cả trước khi đặt phòng.",
    },
];

function FAQTab() {
    return (
        <div className="panel-group2" id="accordion11" role="tablist">
            <Grid container spacing={2}>
                {data.map((item, index) =>
                    <Grid key={index} item xs={12}>
                        <FaqItem item={item} />
                    </Grid>
                )}
            </Grid>
        </div>
    )
}

export default FAQTab