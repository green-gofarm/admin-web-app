import { CURRENT_ROLE, ROLES } from "../../setting/setting";
import ADMIN_MENUITEMS from "./AdminSideMenu";
import HOST_MENUITEMS from "./HostSideMenu";

export const MENUITEMS = (() => {
	if (CURRENT_ROLE === ROLES.ADMIN) {
		return ADMIN_MENUITEMS;
	}

	if (CURRENT_ROLE === ROLES.HOST) {
		return HOST_MENUITEMS;
	}

	return ADMIN_MENUITEMS;
})();