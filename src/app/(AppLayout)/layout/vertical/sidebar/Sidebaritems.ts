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
    heading: "Mes expeditions",
    children: [
      {
        name: "Mes expeditions",
        icon: "solar:delivery-linear",
        id: uniqueId(),
        url: "/shipping/list",
      },
    ],
  },
  {
    heading: "Factures",
    isPro: false,
    children: [
      {
        name: "Factures",
        icon: "solar:plate-linear",
        id: uniqueId(),
        url: "/thing/list",
      },
    ],
  },
  {
    heading: "Clients",
    isPro: false,
    children: [
      {
        name: "Clients",
        icon: "solar:users-group-rounded-linear",
        id: uniqueId(),
        url: "/personal/list",
      },
    ],
  },
  {
    heading: "Equipe",
    isPro: false,
    children: [
      {
        name: "Equipe",
        icon: "solar:users-group-two-rounded-linear",
        id: uniqueId(),
        url: "/personal/list",
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
  {
    isPro: true,
    heading: "Configuration",
    children: [
      {
        name: "Configuration",
        id: uniqueId(),
        icon: "solar:settings-linear",
        children: [
          {
            name: "Type d'article",
            id: uniqueId(),
            url: "/config/visit-type/list",
          },
          /*{
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
          },*/
        ],
      },
    ],
  },
];

export default SidebarContent;
