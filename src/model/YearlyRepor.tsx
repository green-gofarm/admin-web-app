interface ReportData {
    disbursement: number;
    payment: number;
    refund: number;
}

export interface YearlyReport {
    [key: string]: ReportData;
}