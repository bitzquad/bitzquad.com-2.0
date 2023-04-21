// type define for editor menu
type TMenu = {
    [key: number]: TMenuItem[];
};
// type define for editor single menu item
type TMenuItem = {
    name: string;
    href: string | undefined;
    base: string;
    icon: any;
    current: boolean;
    children: TChildMenuItem[];
};
// type define for editor single menu item child
type TChildMenuItem = {
    name: string;
    href: string | null;
};

export type { TMenu, TMenuItem, TChildMenuItem };
