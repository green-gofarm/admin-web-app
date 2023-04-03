import { IBreadcrumbItem } from "../../../General/PageHeader";

export const breadcrumb: Array<IBreadcrumbItem> = [
    {
        text: "Báo cáo",
        href: "/dashboard"
    },
    {
        text: "Tổng quan",
        active: true,
        props: {
            "aria-current": "page"
        }
    }
]
