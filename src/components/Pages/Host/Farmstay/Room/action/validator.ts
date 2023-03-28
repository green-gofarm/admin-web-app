import { isNumberOnly } from '../../../../../../helpers/dateUtils';
import { isNumber } from './../../../../../../helpers/numberUtils';
interface Validator {
    REQUIRED_MESSAGE: string;
    INVALID_TYPE: string;
    NO_ERROR: string;
    hasError: (message: string | null) => boolean;
    isEmpty: (value: any) => boolean;
    isRequired: (value: any) => string;
    isNumberString: (number: any) => string;
}

const VALIDATOR: Validator = {
    REQUIRED_MESSAGE: "Thông tin bắt buộc",
    INVALID_TYPE: "Sai định dạng",
    NO_ERROR: "",
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
};

export default VALIDATOR;
