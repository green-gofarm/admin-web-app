export enum ResultCode {
    SUCCESS = 0,
    INTERNAL_SERVER_ERROR = 500,
    ACCESS_DENIED_EXCEPTION = 403,
    RESOURCE_NOT_FOUND = 404,
    FARMSTAY_NOT_FOUND = 1000,
    FARMSTAY_NOT_OWN_SERVICE = 1001,
    FARMSTAY_NOT_OWN_FAQ = 1002,
    FARMSTAY_NOT_OWN_ACTIVITY = 1003,
    FARMSTAY_NOT_OWN_ROOM = 1004,
    FARMSTAY_NOT_OWN_POLICY = 1005,
    INVALID_SEARCH_PAGE = 1006,
    INVALID_SEARCH_PAGE_SIZE = 1007,
    INVALID_NAME = 1008,
    INVALID_FIRST_NAME = 1009,
    INVALID_LAST_NAME = 1010,
    INVALID_EMAIL = 1011,
    INVALID_PHONE_NUMBER = 1012,
    INVALID_GENDER = 1013,
    INVALID_AVATAR_URL = 1014,
    INVALID_FARMSTAY_STATUS = 1015,
    INVALID_FARMSTAY_EXTRAS = 1016,
    CAN_NOT_REVIEW_FARMSTAY = 1017,
    DISBURSEMENT_NOT_FOUND = 1018,
    CAN_NOT_REVIEW_DISBURSEMENT = 1019,
    INVALID_DISBURSEMENT_STATUS = 1020,
    CUSTOMER_NOT_FOUND = 1021,
    USER_STATUS_NOT_VALID = 1022,
    HOST_NOT_FOUND = 1023,
    ROOM_CATEGORY_NOT_FOUND = 1024,
    ROOM_CATEGORY_STATUS_NOT_VALID = 1025,
    TAG_CATEGORY_NOT_FOUND = 1026,
    TAG_CATEGORY_STATUS_NOT_VALID = 1027,
    SERVICE_CATEGORY_NOT_FOUND = 1028,
    SERVICE_CATEGORY_STATUS_NOT_VALID = 1029,
    FEEDBACK_NOT_FOUND = 1030,
    USER_ALREADY_REGISTERED = 8000,
    CART_IS_EMPTY = 8500,
    ROOM_NOT_AVAILABLE = 8501,
    ACTIVITY_NOT_AVAILABLE = 8502,
    ORDER_STATUS_NOT_VALID = 8503,
    ORDER_IS_EXPIRED = 8504,
    ACCESS_TOKEN_INVALID = 9000,
    ACCESS_TOKEN_EXPIRED = 9001,
    ACCOUNT_LOCKED_EXCEPTION = 9003,
    ACCOUNT_INACTIVE_EXCEPTION = 9004,
    ACCOUNT_NOT_FOUND_EXCEPTION = 9005,
    ORDER_APPROVE_IS_EXPIRED = 9006,
}