import { useMemo } from "react";
import { isString } from "../../../../../../helpers/stringUtils";


const parseImages = (json: string): any => {
    try {
        const images = JSON.parse(json);
        return images;
    } catch (error) {
        console.log(error);
        return null;
    }
}

function useFarmstayImages(detail: any) {

    const images: any = useMemo(() => {
        if (!isString(detail?.images)) return null;
        return parseImages(detail.images);
    }, [detail]);

    return images;
}

export default useFarmstayImages;