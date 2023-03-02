import { Avatar, Box, makeStyles } from "@material-ui/core";
import { memo } from "react";
import { useMemo } from "react";
import { getColorByAlphabet } from "../../setting/color";

const DEFAULT_BG_COLOR = "#ef6c00";

const useStyles = makeStyles({
    wrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    avatar: {
        width: "32px",
        height: "32px",
        fontSize: "1rem",
    }
})

const getBgColor = (firstLetter?: string) => {
    return getColorByAlphabet(firstLetter) ?? DEFAULT_BG_COLOR;
}

interface IAvatarWrapper {
    src?: string,
    name?: string,
    avatarProps?: any,
}

const AvatarWrapper = ({
    src,
    name,
    avatarProps,
}: IAvatarWrapper) => {
    const classes = useStyles();

    const firstLetter = useMemo(() => {
        return (name ?? "").charAt(0).toUpperCase();
    }, [name]);

    return (
        <Box
            className={classes.wrapper}
        >
            <Box
                component={Avatar}
                src={src}
                alt="Ảnh đại diện"
                color="#fff !important"
                bgcolor={getBgColor(firstLetter) + " !important"}
                className={classes.avatar}
                {...avatarProps || {}}
            >
                {firstLetter}
            </Box>
        </Box >
    )
}

export default memo(AvatarWrapper);