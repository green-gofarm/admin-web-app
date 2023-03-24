import { useMemo } from "react";
import { isAvailableArray } from "../../../../../../helpers/arrayUtils";
import { isString } from "../../../../../../helpers/stringUtils";


const parseContactInfo = (json: string): any[] => {
    try {
        const contactInfo = JSON.parse(json);
        return isAvailableArray(contactInfo) ? contactInfo : [];
    } catch (error) {
        console.log(error);
        return [];
    }
}

function useContactInfo(detail: any) {

    const contactInformation: any[] = useMemo(() => {
        if (!isString(detail?.contactInformation)) return [];
        return parseContactInfo(detail.contactInformation);
    }, [detail]);

    return contactInformation;
}

export default useContactInfo