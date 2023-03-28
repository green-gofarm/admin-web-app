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

interface GeneralAvatarProps {
    avatar?: string,
    onClickCamera?: () => void,
    noCamera?: boolean
}

function GeneralAvatar({ avatar, onClickCamera, noCamera }: GeneralAvatarProps) {

    const classes = useStyles();

    return (
        <Box
            position="relative"
            minWidth="120px"
            minHeight="120px"
        >
            <Box
                component="img"
                src={avatar ?? require("../../assets/img/photos/1.jpg")}
                alt="Farmstay logo"
                boxShadow="0 1px 2px #ececec"
                className="br-5"
                sx={{
                    position: "relative",
                    width: "120px",
                    height: "120px",
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

export default GeneralAvatar;