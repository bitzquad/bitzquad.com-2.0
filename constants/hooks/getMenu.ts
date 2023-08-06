/*    Imports    */
import { menu } from "../menus/index";
import type { TMenuItem, TChildMenuItem } from "../../types/types/menutypes";
import EUsertype from "../../types/enum/_common/EUsertype";

import useUserStore from "../../constants/stores/userstore";

// get the menu for the current usertype
const getMenu = (): TMenuItem[] => {
    const user = useUserStore((state) => state);
    const ut = user as { value: any };
    return menu[(ut?.value?.status as number) || EUsertype.default];
};

// get the menu info for the current page
const getPage = (page: string): TMenuItem | null => {
    const menu = getMenu();
    const menuTab = menu.find((item) => page.includes(item.base));
    if (!menuTab) return null;
    return menuTab;
};

// get the menu items for the current page
const getMenuTabs = (page: string): TChildMenuItem[] | [] => {
    const res = getPage(page);
    if (!res) return [];
    return res.children;
};

export { getMenu, getMenuTabs, getPage };
