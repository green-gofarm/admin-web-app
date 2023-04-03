import { Box, IconButton, Tooltip } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles/makeStyles';
import ConditionWrapper from './Wrapper/ConditionWrapper';

const useStyles = makeStyles({
    cameraIcon: {
        alignItems: 'center',
        backgroundColor: '#7987a1',
        borderRadius: '100%',
        boxShadow: '0 0 0 2px #fff',
        color: '#fff',
        display: 'flex',
        fontSize: 18,
        height: 32,
        justifyContent: 'center',
        lineHeight: 0.9,
        position: 'absolute',
        right: -8,
        bottom: -8,
        width: 32,
    },
});

interface RoundAvatarProps {
    avatar?: string,
    onClickCamera?: () => void,
    noCamera?: boolean
}

function RoundAvatar({ avatar, onClickCamera, noCamera }: RoundAvatarProps) {

    const classes = useStyles();

    return (
        <Box
            position="relative"
            width="96px !important"
            height="96px !important"
            boxShadow="0 1px 2px #ececec"
            borderRadius="100%"
        >
            <Box
                component="img"
                src={avatar ?? require("../../assets/img/photos/1.jpg")}
                alt="Avatar"
                borderRadius="100%"
                sx={{
                    width: "96px !important",
                    height: "96px !important",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat"
                }}
            />

            <ConditionWrapper isRender={!noCamera}>
                <Box
                    className={classes.cameraIcon}
                >
                    <Tooltip
                        title="Thay ảnh đại diện"
                    >
                        <IconButton onClick={onClickCamera}>
                            <i className="fe fe-camera text-white"></i>
                        </IconButton>
                    </Tooltip>
                </Box>
            </ConditionWrapper>
        </Box>
    )
}

export default RoundAvatar;