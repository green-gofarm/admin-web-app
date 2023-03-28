import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export enum TAB_KEYS {
    ABOUT = "ABOUT",
}

const useProfileTabs = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();

    const [tab, setTab] = useState<TAB_KEYS>(() => {
        const _tab = searchParams.get("tab") as TAB_KEYS;
        if (_tab in TAB_KEYS) {
            return _tab;
        }
        return TAB_KEYS.ABOUT;
    });

    const handleChangeTab = useCallback((newTab: string | null) => {
        if (newTab && newTab in TAB_KEYS) {
            const params = new URLSearchParams(location.search);
            params.set("tab", newTab);
            navigate(`${location.pathname + "?" + params.toString()}`);
        }
    }, [location.pathname, location.search, navigate]);

    useEffect(() => {
        const newTab = searchParams.get("tab") as TAB_KEYS;
        if (newTab && newTab in TAB_KEYS && newTab !== tab) {
            setTab(newTab);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    return {
        tab,
        handleChangeTab
    }
}

export default useProfileTabs;