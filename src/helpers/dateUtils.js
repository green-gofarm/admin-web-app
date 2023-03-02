import moment from 'moment';

export const dateFormat = 'DD/MM/YYYY';
export const dateFormat2 = 'yyyy-MM-DD';
export const isoFormat = 'YYYY-MM-DDTHH:mm:ssZ';
export const iso8601Format = 'YYYY-MM-DDTHH:mm:ss.SSSZZ';
export const datetimeFormat = 'DD/MM/YYYY HH:mm:ss';
export const datetimeFormatV2 = 'DD-MM-YYYY HH:mm:ss';
export const datetimeFormatReverseDate = 'YYYY-MM-DD HH:mm:ss';

export const isNumberOnly = (value) => /^[0-9]*$/.test(value);

const notMillisecond = (date) => {
    return !isNumberOnly(date);
}

export const isThePast = (date) => {
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


export const convertBeDateToIso = (date) => {
    if (!validDate(date)) return null;
    if (!moment(date, datetimeFormatV2, true).isValid()) return null;

    const array = date.split(" ");
    const reverseDateYear = (date) => {
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

export const removeOffsetTimeZone = (date) => {
    const timeDiff = date.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(date.getTime() + timeDiff);
    return adjustedDate;
}

function toLocaleUTCDateString(date, locales, options) {
    return removeOffsetTimeZone(date).toLocaleString(locales, options);
}

export const getLocaleDateTimeString = (date) => {
    const options = { hour12: true };
    const theDate = new Date(convertBeDateToIso(date));
    return toLocaleUTCDateString(theDate, undefined, options);
}

export const getLocaleDateString = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour12: true };
    const theDate = new Date(convertBeDateToIso(date));
    return toLocaleUTCDateString(theDate, undefined, options);
}


export const validDate = (date) => {
    if (date == null) return false;

    if (typeof date === "string") {
        return notMillisecond(date) && (
            moment(date, dateFormat, true).isValid() ||
            moment(date, dateFormat2, true).isValid() ||
            moment(date, datetimeFormat, true).isValid() ||
            moment(date, datetimeFormatV2, true).isValid() ||
            moment(date, datetimeFormatReverseDate, true).isValid() ||
            moment(date, isoFormat, true).isValid() ||
            moment(date, iso8601Format, true).isValid() ||
            moment(date, "MM/DD/YYYY", true).isValid()
        );
    }

    if (date instanceof Date) {
        return !isNaN(date);
    }

    return false;
}

export const toMonthName = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber);

    return date.toLocaleString('en-US', {
        month: 'long',
    });
}

export const formatDate = (date, format = dateFormat) => validDate(date) ? moment(new Date(date)).format(format) : 'N/A';

export const formatLocalDate = (date, format = dateFormat) => date ? moment(date).local().format(format) : 'N/A';

export const formatDateTime = (date, format = datetimeFormat, invalidStr = 'N/A') => {
    if (!validDate(date)) return invalidStr;

    let theDate = convertBeDateToIso(date) || date;
    return moment(new Date(theDate)).format(format);
}

export const formatLocalDateTime = (date, format = datetimeFormat, invalidStr = 'N/A') => validDate(date) ? moment(date).local().format(format) : invalidStr;

export const toISO = (date) => moment(date).utc().format(iso8601Format);

export const currentDate = (format = dateFormat) => moment().format(format);

export const sub = (type = 'days', day, format = dateFormat) => moment().subtract(day, type).format(format);
export const add = (type = 'days', day, format = dateFormat) => moment().add(day, type).format(format);

export const rangeDate = (firstDaysAgo, secondDaysAgo) => [
    sub('days', firstDaysAgo),
    sub('days', secondDaysAgo)
];

export const rangeNextDate = (firstDaysAgo, secondDaysAgo) => [
    add('days', firstDaysAgo),
    add('days', secondDaysAgo)
];

export const firstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1);
export const lastDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 1);

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

// export const menuFilter = [
//     {
//         label: 'Hôm nay',
//         radioValue: 'today',
//         value: [currentDate()]
//     },
//     {
//         label: 'Hôm qua',
//         radioValue: 'yesterday',
//         value: [sub('days', 1)]
//     },
//     {
//         label: '7 ngày vừa qua',
//         radioValue: 'last7days',
//         value: rangeDate(7, 0)
//     },
//     {
//         label: '30 ngày vừa qua',
//         radioValue: 'last30days',
//         value: rangeDate(30, 0)
//     },
//     {
//         label: 'Tháng này',
//         radioValue: 'currentMonth',
//         value: rangeCurrentMonth()
//     },
//     {
//         label: 'Tháng trước',
//         radioValue: 'lastMonth',
//         value: rangeLastMonth()
//     },
// ];

// export const menuFilterLoanPayment = [
//     {
//         label: 'Hôm nay',
//         radioValue: 'today',
//         value: [currentDate()]
//     },
//     {
//         label: 'Ngày mai',
//         radioValue: 'tomorrow',
//         value: [add('days', 1)]
//     },
//     {
//         label: '7 ngày tới',
//         radioValue: 'next7days',
//         value: rangeNextDate(7, 0)
//     },
//     {
//         label: '30 ngày tới',
//         radioValue: 'next30days',
//         value: rangeNextDate(30, 0)
//     },
//     {
//         label: 'Tháng này',
//         radioValue: 'currentMonth',
//         value: rangeFullDaysCurrentMonth()
//     },
//     {
//         label: 'Tháng sau',
//         radioValue: 'nextMonth',
//         value: rangeNextMonth()
//     },
// ];
