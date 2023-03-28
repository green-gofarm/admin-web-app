interface Validator {
    REQUIRED_MESSAGE: string;
    NO_ERROR: string;
    hasError: (message: string | null) => boolean;
    isEmpty: (value: any) => boolean;
    isRequired: (value: any) => string;
}

const VALIDATOR: Validator = {
    REQUIRED_MESSAGE: "Thông tin bắt buộc",
    NO_ERROR: "",
    hasError: (message) => message != null && message !== VALIDATOR.NO_ERROR,
    isEmpty: (value) => {
        return value == null || /^\s*$/.test(value);
    },
    isRequired: (value) => {
        return VALIDATOR.isEmpty(value) ? VALIDATOR.REQUIRED_MESSAGE : VALIDATOR.NO_ERROR;
    }
};

export default VALIDATOR;
