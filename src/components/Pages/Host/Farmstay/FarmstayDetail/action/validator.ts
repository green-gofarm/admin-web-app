import { isNumberOnly } from '../../../../../../helpers/dateUtils';
import { convertToMoney } from '../../../../../../helpers/stringUtils';
import { isNumber } from './../../../../../../helpers/numberUtils';
interface Validator {
    REQUIRED_MESSAGE: string;
    INVALID_TYPE: string;
    NO_ERROR: string;
    INVALID_ACTIVITY_SLOT_NUMBER: string,
    INVALID_PRICE: string,
    INVALID_ACTIVITY_PRICE: string,
    INVALID_ROOM_PRICE: string,
    INVALID_SERVICE_PRICE: string,
    hasError: (message: string | null) => boolean;
    isEmpty: (value: any) => boolean;
    isRequired: (value: any) => string;
    isNumberString: (number: any) => string;
    isValidActivitySlotNumber: (number: any) => string;
    isValidPrice: (number: any) => string;
    isValidActivityPrice: (number: any) => string;
    isValidRoomPrice: (number: any) => string;
    isValidServicePrice: (number: any) => string;
}

const MIN_ACTIVITY_PRICE = 10000;
const MIN_ROOM_PRICE = 100000;
const MIN_SERVICE_PRICE = 10000;

const VALIDATOR: Validator = {
    REQUIRED_MESSAGE: "Thông tin bắt buộc",
    INVALID_TYPE: "Sai định dạng",
    NO_ERROR: "",
    INVALID_ACTIVITY_SLOT_NUMBER: "Số lượng tối thiểu là 1.",
    INVALID_PRICE: "Số tiền phải lớn hơn 0",
    INVALID_ACTIVITY_PRICE: `Số tiền phải từ ${convertToMoney(MIN_ACTIVITY_PRICE)} trở lên`,
    INVALID_ROOM_PRICE: `Số tiền phải từ ${convertToMoney(MIN_ROOM_PRICE)}  trở lên`,
    INVALID_SERVICE_PRICE: `Số tiền phải từ ${convertToMoney(MIN_SERVICE_PRICE)}  trở lên`,
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
        return VALIDATOR.isRequired(number) || VALIDATOR.isNumberString(number)
            || (parseFloat(number) > 0 ? VALIDATOR.NO_ERROR : VALIDATOR.INVALID_PRICE)
    },

    isValidActivityPrice: (number) => {
        return VALIDATOR.isValidPrice(number)
            || (number >= MIN_ACTIVITY_PRICE ? VALIDATOR.NO_ERROR : VALIDATOR.INVALID_ACTIVITY_PRICE);
    },
    isValidRoomPrice: (number) => {
        return VALIDATOR.isValidPrice(number)
            || (number >= MIN_ROOM_PRICE ? VALIDATOR.NO_ERROR : VALIDATOR.INVALID_ROOM_PRICE);
    },
    isValidServicePrice: (number) => {
        return VALIDATOR.isValidPrice(number)
            || (number >= MIN_SERVICE_PRICE ? VALIDATOR.NO_ERROR : VALIDATOR.INVALID_SERVICE_PRICE);
    }
};

export default VALIDATOR;
