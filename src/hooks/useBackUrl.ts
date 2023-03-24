import { useCallback } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

function useBackUrl() {
    const location = useLocation();
    const [searchParams] = useSearchParams();

    const createBackUrl = useCallback((): string => {
        const url = location.pathname + location.search;
        return encodeURIComponent(url);
    }, [location.pathname, location.search]);

    const getBackUrl = useCallback(() => {
        const backUrl = searchParams.get("backUrl");
        return backUrl ? decodeURIComponent(backUrl) : "";
    }, [searchParams]);

    return {
        createBackUrl,
        getBackUrl
    };

}

export default useBackUrl;