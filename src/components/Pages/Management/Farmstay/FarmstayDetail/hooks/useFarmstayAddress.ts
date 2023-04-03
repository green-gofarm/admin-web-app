import { useMemo } from "react";
import { isString } from "../../../../../../helpers/stringUtils";
import { Address } from "../../../../Host/Farmstay/create-farmstay/CreateFarmstay";


const parseAddress = (json: string): Address | null => {
    try {
        const address = JSON.parse(json);
        if (typeof address === "object" && address !== null) {
            const possibleAddress: Address = address;
            return possibleAddress;
        }
        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
}

function useFarmstayAddress(detail: any) {

    const address: Address | null = useMemo(() => {
        if (!isString(detail?.address)) return null;
        return parseAddress(detail.address);
    }, [detail]);

    return address;
}

export default useFarmstayAddress