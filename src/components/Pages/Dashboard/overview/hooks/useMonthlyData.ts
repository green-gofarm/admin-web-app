import { useEffect, useState } from "react"
import { MonthlyReportModel } from "../../../../../model/MonthlyReport";
import { useDispatch } from "react-redux";
import { getMonthlyReport } from "../../../../../redux/farmstay/action";


function useMonthlyData() {
    const dispatch = useDispatch();
    const [monthlyReport, setMonthlyReport] = useState<MonthlyReportModel | null>(null);
    const [loading, setLoading] = useState<boolean>();

    useEffect(() => {
        const onSuccess = (response: any) => {
            const report = response?.data;
            setMonthlyReport(report ?? null);
        }

        const onFailure = () => {
            setMonthlyReport(null);
        }

        dispatch(getMonthlyReport({
            loading: setLoading,
            onSuccess,
            onFailure,
        }))
    }, [dispatch]);

    return { loading, monthlyReport };
}

export default useMonthlyData