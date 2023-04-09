
//Domain
export const LOCAL_API_DOMAIN = process.env.REACT_APP_LOCAL_API_URL;
export const PRODUCTION_API_DOMAIN = process.env.REACT_APP_PRODUCT_API_URL;
export const ENV_DOMAIN = PRODUCTION_API_DOMAIN;
// export const ENV_DOMAIN = LOCAL_API_DOMAIN;

// Method
export enum METHOD {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
}

// Api path and version
export const DOMAIN_V1 = `${ENV_DOMAIN}/v1`;
export const DOMAIN_V2 = `${ENV_DOMAIN}/v2`;


// Endpoint
export const ENP = {
    SIGN_UP: `${DOMAIN_V1}/register`,
    ADMIN: `${DOMAIN_V1}/admin`,
    HOST: `${DOMAIN_V1}/hosts`,
    FARMSTAY: `${DOMAIN_V1}/farmstays`,
    SERVICE_CATEGORY: `${DOMAIN_V1}/service-categories`,
    ROOM_CATEGORY: `${DOMAIN_V1}/room-categories`,
    FEEDBACK: `${DOMAIN_V1}/feedback`,
    USER: `${DOMAIN_V1}/users`,
    BOOKING: `${DOMAIN_V1}/bookings`,
    DISBURSEMENT: `${DOMAIN_V1}/disbursements`,
    TAG_CATEGORY: `${DOMAIN_V1}/tag-categories`,
    IMAGES: `${DOMAIN_V1}/images`
}

export const ENP_V2 = {
    SIGN_UP: `${DOMAIN_V2}/register`,
    ADMIN: `${DOMAIN_V2}/admin`,
    HOST: `${DOMAIN_V2}/hosts`,
    FARMSTAY: `${DOMAIN_V2}/farmstays`,
    SERVICE_CATEGORY: `${DOMAIN_V2}/service-categories`,
    ROOM_CATEGORY: `${DOMAIN_V2}/room-categories`,
    FEEDBACK: `${DOMAIN_V2}/feedback`,
    USER: `${DOMAIN_V2}/users`,
    BOOKING: `${DOMAIN_V2}/bookings`,
    DISBURSEMENT: `${DOMAIN_V2}/disbursements`,
    TAG_CATEGORY: `${DOMAIN_V2}/tag-categories`,
    IMAGES: `${DOMAIN_V2}/images`
}
