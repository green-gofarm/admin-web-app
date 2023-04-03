// @mui/material components
import { createTheme, adaptV4Theme } from "@mui/material/styles";
// core components
import boxShadows from "./box-shadow.js";
import hexToRgb from "./hex-to-rgb.js";
import themeColors from "./colors.js";
import * as locales from '@mui/material/locale';

// A custom theme for this app
const theme = createTheme(adaptV4Theme({
    palette: {
        ...themeColors,
        buttonLightLabel: {
            main: "rgba(" + hexToRgb(themeColors.white.main) + ", 0.95)",
        },
        sidebarLinks: {
            main: "rgba(" + hexToRgb(themeColors.black.main) + ", 0.5)",
            dark: "rgba(" + hexToRgb(themeColors.black.main) + ", 0.9)",
        },
        adminNavbarSearch: {
            main: "rgba(" + hexToRgb(themeColors.white.main) + ", 0.6)",
        },
        authNavbarLink: {
            main: "rgba(" + hexToRgb(themeColors.white.main) + ", 0.65)",
            dark: "rgba(" + hexToRgb(themeColors.white.main) + ", 0.95)",
        },
    },
    overrides: {
        MuiDivider: {
            root: {
                borderColor: "#ededf5",
                opacity: 0.75
            }
        },
        MuiDialogContent: {
            root: {
                padding: "16px 20px"
            }
        },
        MuiDialogTitle: {
            root: {
                padding: "16px 20px 12px 20px"
            }
        },
        MuiDialogActions: {
            root: {
                padding: "16px 20px"
            }
        },
        MuiSvgIcon: {
            root: {
                width: "16px",
                height: "16px",
            },
            fontSizeLarge: {
                width: "24px",
                height: "24px",
            }
        },
        MuiTable: {
            root: {
                width: "100%",
                marginBottom: "1rem",
                color: themeColors.gray[700],
                backgroundColor: themeColors.transparent.main,
                borderCollapse: "collapse",
            },
        },
        MuiTableCell: {
            root: {
                fontSize: ".8125rem",
                whiteSpace: "nowrap",
                padding: "0.75rem 1rem",
                verticalAlign: "top",
                borderTop: "1px solid " + themeColors.gray[200],
                borderBottom: "1px solid " + themeColors.gray[200],
            },
            head: {
                padding: "1rem",
                borderTop: "1px solid " + themeColors.gray[200],
                fontWeight: "600",
                whiteSpace: "nowrap",
                verticalAlign: "bottom",
                paddingTop: ".75rem",
                paddingBottom: ".75rem",
                fontSize: ".65rem",
                textTransform: "uppercase",
                letterSpacing: "1px",
                borderBottom: "1px solid " + themeColors.gray[200],
            },
        },
        MuiPaginationItem: {
            root: {
                width: "36px",
                height: "36px",
                fontSize: ".875rem",
                color: themeColors.gray[600],
                border: "1px solid " + themeColors.gray[300],
                borderRadius: "50%",
                "&:hover": {
                    backgroundColor: themeColors.gray[300],
                },
            },
            outlined: {
                color: themeColors.gray[600],
                border: "1px solid " + themeColors.gray[300],
                "&:hover": {
                    backgroundColor: themeColors.gray[300],
                },
            },
            outlinedPrimary: {
                "&.Mui-selected": {
                    "&, &:hover": {
                        backgroundColor: themeColors.primary.main + "!important",
                        color: themeColors.white.main,
                        boxShadow: boxShadows.buttonBoxShadow,
                    },
                },
            },
            sizeLarge: {
                lineHeight: "46px",
                width: "46px",
                height: "46px",
                borderRadius: "50%",
            },
            sizeSmall: {
                lineHeight: "30px",
                width: "30px",
                height: "30px",
                borderRadius: "50%",
            },
        },
    },
}),
    locales["viVN"]
);

export default theme;
