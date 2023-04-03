import { isNumberOnly } from '../../../../../../helpers/dateUtils';
import { isNumber } from './../../../../../../helpers/numberUtils';
interface Validator {
    REQUIRED_MESSAGE: string;
    INVALID_TYPE: string;
    NO_ERROR: string;
    INVALID_ACTIVITY_SLOT_NUMBER: string,
    INVALID_PRICE: string,
    hasError: (message: string | null) => boolean;
    isEmpty: (value: any) => boolean;
    isRequired: (value: any) => string;
    isNumberString: (number: any) => string;
    isValidActivitySlotNumber: (number: any) => string;
    isValidPrice: (number: any) => string;
}

const VALIDATOR: Validator = {
    REQUIRED_MESSAGE: "Thông tin bắt buộc",
    INVALID_TYPE: "Sai định dạng",
    NO_ERROR: "",
    INVALID_ACTIVITY_SLOT_NUMBER: "Số lượng tối thiểu là 1.",
    INVALID_PRICE: "Số tiền phải lớn hơn 0",
    hasError: (message) => message != null && message !== VALIDATOR.NO_ERROR,
    isEmpty: (value) => {
        return value == null || /^\s*$/.test(value);
    },
    isRequired: (value) => {
        return VALIDATOR.isEmpty(value) ? VALIDATOR.REQUIRED_MESSAGE : VALIDATOR.NO_ERROR;
    },
    isNumberString: (number) => {
        return isNumber(number) || isNumberOnly(number) ? VALIDATOR.NO_ERROR : VALIDATOR.INVALID_TYPE
    },
    isValidActivitySlotNumber: (number) => {
        return VALIDATOR.isRequired(number) || VALIDATOR.isNumberString(number)
            || (parseInt(number) > 0 ? VALIDATOR.NO_ERROR : VALIDATOR.INVALID_ACTIVITY_SLOT_NUMBER)
    },
    isValidPrice: (number) => {
        console.log(number);
        return VALIDATOR.isRequired(number) || VALIDATOR.isNumberString(number)
            || (parseFloat(number) > 0 ? VALIDATOR.NO_ERROR : VALIDATOR.INVALID_PRICE)
    }
};

export default VALIDATOR;
