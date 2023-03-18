
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
export const DOMAIN = `${ENV_DOMAIN}/v1`;

// Endpoint
export const ENP = {
    SIGN_UP: `${DOMAIN}/register`,
    ADMIN: `${DOMAIN}/admin`,
    HOST: `${DOMAIN}/host`
}
