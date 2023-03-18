import { useCallback } from 'react';

import { useMemo } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

function useBackUrl() {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const backUrl = useMemo((): string => {
        const url = location.pathname + location.search;
        return url;
    }, [location.pathname, location.search]);

    const handleNavigateWithBackUrl = useCallback((path: string) => {
        const newUrl = `${path}?backUrl=${backUrl}`;
        navigate(newUrl);
    }, [backUrl, navigate]);

    const getBackUrl = useCallback(() => {
        return searchParams.get("backUrl");
    }, [searchParams]);

    return { backUrl, handleNavigateWithBackUrl, getBackUrl };

}

export default useBackUrl