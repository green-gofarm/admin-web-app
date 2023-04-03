import makeStyles from "@mui/styles/makeStyles/makeStyles";

const farmstayStyles = makeStyles({
    addItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',


        width: '100%',
        minHeight: "160px",
        padding: '12px 20px',
        border: 'none',
        borderRadius: '8px',
        boxSizing: 'border-box',

        font: 'inherit',
        WebkitAppearance: 'none',

        color: 'inherit',
        backgroundColor: 'rgba(0,0,0,0)',
        transition: 'background-color .1s cubic-bezier(0.4, 0, 0.2, 1)',
        "&:hover": {
            backgroundColor: "#f5f5f5",
            cursor: "pointer"
        }
    },
    item: {
        display: 'flex',
        flexDirection: 'column',


        width: '100%',
        minHeight: "160px",
        padding: '12px 20px',
        border: 'none',
        borderRadius: '8px',
        boxSizing: 'border-box',

        font: 'inherit',
        WebkitAppearance: 'none',

        color: 'inherit',
        backgroundColor: 'rgba(0,0,0,0)',
        transition: 'background-color .1s cubic-bezier(0.4, 0, 0.2, 1)',
        "&:hover": {
            backgroundColor: "#f5f5f5",
            cursor: "pointer"
        }
    },
    header: {
        alignItems: "flex-start",
        display: "flex",
        wordBreak: "break-word",
        fontSize: "20px",
        lineHeight: "28px",
        fontWeight: 500,
    }
});

export default farmstayStyles;