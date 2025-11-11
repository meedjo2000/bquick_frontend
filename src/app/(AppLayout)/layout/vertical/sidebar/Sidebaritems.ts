export interface ChildItem {
  id?: number | string;
  name?: string;
  icon?: any;
  children?: ChildItem[];
  item?: any;
  url?: any;
  color?: string;
  isPro?: boolean
}

export interface MenuItem {
  heading?: string;
  name?: string;
  icon?: any;
  id?: number;
  to?: string;
  items?: MenuItem[];
  children?: ChildItem[];
  url?: any;
  isPro?: boolean
}

import { uniqueId } from "lodash";


const SidebarContent: MenuItem[] = [
  {
    isPro: true,
    heading: "Dashboard",
    children: [
      {
        name: "Dashboard",
        icon: "solar:layers-line-duotone",
        id: uniqueId(),
        url: "/",
      },
    ],
  },
  {
    isPro: true,
    heading: "Configuration",
    children: [
      {
        name: "Configuration",
        id: uniqueId(),
        icon: "solar:home-angle-linear",
        children: [
          {
            name: "Type de visit-type",
            id: uniqueId(),
            url: "/config/visit-type/list",
          },
          {
            name: "Direction",
            id: uniqueId(),
            url: "/config/direction/list",
          },
          {
            name: "Fonction",
            id: uniqueId(),
            url: "/config/position/list",
          },
          {
            name: "Type d'objet",
            id: uniqueId(),
            url: "/config/thing-type/list",
          },
        ],
      },
    ],
  },
  {
    isPro: true,
    heading: "Visite",
    children: [
      {
        name: "Visite",
        icon: "solar:notebook-outline",
        id: uniqueId(),
        url: "/visitor/list",
      },
    ],
  },
  {
    heading: "Employé",
    isPro: false,
    children: [
      {
        name: "Employé",
        icon: "solar:users-group-two-rounded-linear",
        id: uniqueId(),
        url: "/personal/list",
      },
    ],
  },
  {
    heading: "Objet oublié",
    isPro: false,
    children: [
      {
        name: "Objet oublié",
        icon: "solar:plate-linear",
        id: uniqueId(),
        url: "/thing/list",
      },
    ],
  },
  {
    heading: "Securité",
    isPro: false,
    children: [
      {
        id: uniqueId(),
        name: "Sécurité",
        icon: "solar:shield-warning-linear",
        url: "/security/list",
      },
    ],
  },
];

export default SidebarContent;
