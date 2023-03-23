import { useState } from "react";
import { useEffect } from "react";

const DEFAULT_DELAY = 500;

function useDelayLoading(loading?: boolean, delay?: number) {
    const [delayLoading, setDelayLoading] = useState<boolean>(false);

    useEffect(() => {
        let timer: any = null;

        if (loading) {
            setDelayLoading(true);
            return;
        }

        timer = setTimeout(() => {
            setDelayLoading(false);
        }, delay ?? DEFAULT_DELAY);

        return () => timer && clearTimeout(timer);
    }, [delay, loading]);

    return delayLoading;
}

export default useDelayLoading