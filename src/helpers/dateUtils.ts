import moment from 'moment';
import 'moment/locale/vi';

export const dateFormat = 'DD/MM/YYYY';
export const dateFormat2 = 'yyyy-MM-DD';
export const isoFormat = 'YYYY-MM-DDTHH:mm:ssZ';
export const isoFormatV2 = 'YYYY-MM-DDTHH:mm:ss';
export const iso8601Format = 'YYYY-MM-DDTHH:mm:ss.SSSZZ';
export const datetimeFormat = 'DD/MM/YYYY HH:mm:ss';
export const datetimeFormatV2 = 'DD-MM-YYYY HH:mm:ss';
export const datetimeFormatReverseDate = 'YYYY-MM-DD HH:mm:ss';

export const isNumberOnly = (value: any): boolean => /^[0-9]*$/.test(value);

export const isMillisecond = (date: any): boolean => {
    return isNumberOnly(date);
}

export const isValidDate = (date: any, customFormat?: string): boolean => {
    if (date == null) return false;

    if (typeof date === "string") {
        return isMillisecond(date) === false && (
            moment(date, dateFormat, true).isValid()
            || moment(date, dateFormat, true).isValid()
            || moment(date, dateFormat2, true).isValid()
            || moment(date, datetimeFormat, true).isValid()
            || moment(date, datetimeFormatV2, true).isValid()
            || moment(date, datetimeFormatReverseDate, true).isValid()
            || moment(date, isoFormat, true).isValid()
            || moment(date, isoFormatV2, true).isValid()
            || moment(date, iso8601Format, true).isValid()
            || moment(date, "MM/DD/YYYY", true).isValid()
            || moment(date, "MM/DD/YYYY", true).isValid()
            || moment(date, "YYYY-MM-DD HH:mm", true).isValid()
            || moment(date, "YYYY-MM-DD", true).isValid()
            || (!!customFormat && moment(date, customFormat, true).isValid())
        );
    }

    if (date instanceof Date) {
        return date.toString() !== "Invalid Date" && !isNaN(date.getTime());
    }

    return false;
}

export const isFuture = (date: any): boolean => {
    return moment(date).isAfter(new Date());
}

export const isThePast = (date: any): boolean => {
    return moment(date).isBefore(new Date());
}

export const getFirstDayOfMonth = () => {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return firstDay;
}

export const getLastDayOfMonth = () => {
    const date = new Date();
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return lastDay;
}


export const convertBeDateToIso = (date: any) => {
    if (!isValidDate(date)) return null;
    if (!moment(date, datetimeFormatV2, true).isValid()) return null;

    const array = date.split(" ");
    const reverseDateYear = (date: any) => {
        const temp = date.split("-");
        temp.reverse();
        return temp.join("-");
    }

    const newArray = [];
    newArray.push(reverseDateYear(array[0]));
    newArray.push("T");
    newArray.push(array[1]);
    newArray.push("Z");
    return newArray.join("");
}

export const toMonthName = (monthNumber: number) => {
    const date = new Date();
    date.setMonth(monthNumber);

    return date.toLocaleString('en-US', {
        month: 'long',
    });
}

export const formatDate = (date: any, format = dateFormat) => isValidDate(date) ? moment(new Date(date)).format(format) : 'N/A';

export const formatLocalDate = (date: any, format = dateFormat) => date ? moment(date).local().format(format) : 'N/A';

export const formatDateTime = (date: any, format = datetimeFormat, invalidStr = 'N/A') => {
    if (!isValidDate(date)) return invalidStr;

    let theDate = convertBeDateToIso(date) || date;
    return moment(new Date(theDate)).format(format);
}

export const formatLocalDateTime = (date: any, format = datetimeFormat, invalidStr = 'N/A') => isValidDate(date) ? moment(date).local().format(format) : invalidStr;

export const toISO = (date: any) => moment(date).utc().format(iso8601Format);

export const currentDate = (format = dateFormat) => moment().format(format);

export const sub = (type = 'days', day: any, format = dateFormat) => moment().subtract(day, type).format(format);
export const add = (type = 'days', day: any, format = dateFormat) => moment().add(day, type).format(format);

export const rangeDate = (firstDaysAgo: any, secondDaysAgo: any) => [
    sub('days', firstDaysAgo),
    sub('days', secondDaysAgo)
];

export const rangeNextDate = (firstDaysAgo: any, secondDaysAgo: any) => [
    add('days', firstDaysAgo),
    add('days', secondDaysAgo)
];

export const firstDayOfMonth = (date: any) => new Date(date.getFullYear(), date.getMonth(), 1);
export const lastDayOfMonth = (date: any) => new Date(date.getFullYear(), date.getMonth() + 1, 1);

export const rangeLastMonth = () => [
    moment().subtract(1, 'months').startOf('month').format(dateFormat),
    moment().subtract(1, 'months').endOf('month').format(dateFormat),
];

export const rangeNextMonth = () => [
    moment().add(1, 'months').startOf('month').format(dateFormat),
    moment().add(1, 'months').endOf('month').format(dateFormat),
];

export const rangeCurrentMonth = () => [
    moment().startOf('month').format(dateFormat),
    currentDate()
];

export const rangeFullDaysCurrentMonth = () => [
    moment().startOf('month').format(dateFormat),
    moment().endOf('month').format(dateFormat),
];


export function formatTimeString(dateTimeStr: string) {
    const date = new Date(dateTimeStr);
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes();
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    const formattedDateTime = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${formattedTime}`;
    return formattedDateTime;
}

export const getTimeAgoString = (date?: string, withoutSuffix = false) => {
    if (!date) {
        return "";
    }
    return moment(date).fromNow(withoutSuffix);
}


export const convertISOToNaturalFormat = (isoDateString?: string, format?: string) => {
    if (!isValidDate(isoDateString)) return isoDateString;
    const formattedDate = moment(isoDateString).format(format ?? "Do MMMM YYYY");
    return formattedDate;
}