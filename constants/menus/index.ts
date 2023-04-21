/*    Imports    */
import EUsertype from "../../types/enum/_common/EUsertype";
import type { TMenu } from "../../types/types/menutypes";

import { HomeIcon, UserIcon, BriefcaseIcon, MailIcon, NewspaperIcon, CalendarIcon, LinkIcon, OfficeBuildingIcon, ViewGridIcon, ExclamationIcon } from "@heroicons/react/outline";

// this file is used to define, what should be on the menu in edit mode for each usertype
// the key is the usertype, the value is an array of menu items
const menu: TMenu = {
    // menu items for the 'Default' usertype
    [EUsertype.default as number]: [],
    // menu items for the 'SuperAdmin' usertype
    [EUsertype.admin as number]: [
        {
            name: "Dashboard",
            href: "",
            base: "/editor/dashboard",
            icon: HomeIcon,
            current: false,

            children: [
                {
                    name: "Overview",
                    href: null,
                },

                {
                    name: "Analytics",
                    href: null,
                },
            ],
        },
        {
            name: "Users",
            href: "",
            base: "/editor/users",
            icon: UserIcon,
            current: false,

            children: [
                {
                    name: "Overview",
                    href: null,
                },

                {
                    name: "All Users",
                    href: null,
                },

                {
                    name: "Add User",
                    href: null,
                },
            ],
        },
        {
            name: "Jobs",
            href: "",
            base: "/editor/jobs",
            icon: BriefcaseIcon,
            current: false,

            children: [
                {
                    name: "Overview",
                    href: null,
                },

                {
                    name: "All Jobs",
                    href: null,
                },

                {
                    name: "Add Job",
                    href: null,
                },
            ],
        },
        // {
        //     name: "News",
        //     href: "",
        //     base: "/editor/news",
        //     icon: MailIcon,
        //     current: false,

        //     children: [
        //         {
        //             name: "Overview",
        //             href: null,
        //         },

        //         {
        //             name: "All News",
        //             href: null,
        //         },

        //         {
        //             name: "Add News",
        //             href: null,
        //         },
        //     ],
        // },
        {
            name: "Other",
            href: "",
            base: "/editor/other",
            icon: LinkIcon,
            current: false,

            children: [
                {
                    name: "Contact",
                    href: null,
                },
            ],
        },
        {
            name: "Settings",
            href: "",

            base: "/editor/settings",

            icon: ViewGridIcon,
            current: false,

            children: [
                {
                    name: "Genaral",
                    href: null,
                },

                {
                    name: "Collections",
                    href: null,
                },
            ],
        },
        {
            name: "System",
            href: "",

            base: "/editor/system",
            icon: ExclamationIcon,
            current: false,

            children: [
                {
                    name: "Overview",
                    href: null,
                },

                {
                    name: "Settings",
                    href: null,
                },

                {
                    name: "DB Recovery",
                    href: null,
                },

                {
                    name: "Logs",
                    href: null,
                },

                {
                    name: "Bug Reports",
                    href: null,
                },
            ],
        },
    ],
};

export { menu };
