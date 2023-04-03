export const STATUS_COLORS = {
    DISABLED: {
        textColor: "#3a3540",
        bgColor: "#e0e0e0"
    },
    ACTIVE: {
        textColor: "#229451",
        bgColor: "#e9f4ee"
    },
    PENDING: {
        textColor: "#866416",
        bgColor: "#ead186"
    },
    AVAILABLE: {
        textColor: "#1d3f7b",
        bgColor: "#c8e6ff"
    },
    CANCELED: {
        textColor: "#f0565b",
        bgColor: "#fcedea"
    },
    DELETED: {
        textColor: "#ff0000",
        bgColor: "#ffe5e5"
    },
    FINISHED: {
        textColor: "#c3b0e5",
        bgColor: "#573e7d"
    },
    BANNED: {
        textColor: "#ee7450",
        bgColor: "#fdeeea"
    }
}

interface IAlphabetColors {
    [key: string]: string;
}


export const ALPHABET_COLORS: IAlphabetColors = {
    a: "#5A8770",
    b: "#B2B7BB",
    c: "#6FA9AB",
    d: "#F5AF29",
    e: "#0088B9",
    f: "#F18636",
    g: "#D93A37",
    h: "#A6B12E",
    i: "#5C9BBC",
    j: "#F5888D",
    k: "#9A89B5",
    l: "#407887",
    m: "#9A89B5",
    n: "#5A8770",
    o: "#D33F33",
    p: "#A2B01F",
    q: "#F0B126",
    r: "#0087BF",
    s: "#F18636",
    t: "#0087BF",
    u: "#B2B7BB",
    v: "#72ACAE",
    w: "#9C8AB4",
    x: "#5A8770",
    y: "#EEB424",
    z: "#407887"
};

export const getColorByAlphabet = (letter?: string) => {
    if (letter == null || typeof letter !== "string") {
        return null;
    }

    const letterIndex = letter.toLowerCase();
    return ALPHABET_COLORS[letterIndex];
}