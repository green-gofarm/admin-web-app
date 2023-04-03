import { ReactNode } from 'react';
import { Card } from 'react-bootstrap';
import ConditionWrapper from '../Wrapper/ConditionWrapper';
import { convertToMoney } from '../../../helpers/stringUtils';
import { formatNumber } from '../../../helpers/numberUtils';

export interface IStatisticCard {
    type?: "number" | "money" | "string",
    icon?: ReactNode,
    title?: string,
    value: string | number | ReactNode,
    subTitle?: string,
    subValue: string | number | ReactNode,
}

const renderValue = (type?: string, value?: string | number | ReactNode): string | ReactNode | null => {
    if (type === "money" && typeof value === "number") {
        return convertToMoney(value);
    }

    if (type === "number" && typeof value === "number") {
        return formatNumber(value, 0);
    }

    return value ?? "N/A";
}

function StatisticCard({
    icon,
    title,
    value,
    subTitle,
    subValue,
    type,
}: IStatisticCard) {

    return (
        <Card>
            <Card.Body>
                <div className="card-order">
                    <h6 className="mb-2">{title}</h6>
                    <h2 className="text-end ">
                        {icon}
                        <span>{renderValue(type, value)}</span>
                    </h2>
                    <ConditionWrapper isRender={subTitle != null || subValue != null}>
                        <p className="mb-0">
                            {subTitle}
                            <span>{renderValue(type, subValue)}</span>
                        </p>
                    </ConditionWrapper>
                </div>
            </Card.Body>
        </Card>
    )
}

export default StatisticCard;