import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { getYearlyReport } from "../../../../../redux/farmstay/action";
import { YearlyReport } from "../../../../../model/YearlyRepor";

function useYearlyData() {
    const dispatch = useDispatch();
    const [yearlyReport, setYearlyReport] = useState<YearlyReport | null>(null);
    const [loading, setLoading] = useState<boolean>();

    useEffect(() => {
        const onSuccess = (response: any) => {
            const report = response?.data?.reportMap;
            setYearlyReport(report ?? null);
        }

        const onFailure = () => {
            setYearlyReport(null);
        }

        dispatch(getYearlyReport({
            loading: setLoading,
            onSuccess,
            onFailure,
        }))
    }, [dispatch]);

    return { loading, yearlyReport };
}

export default useYearlyData;