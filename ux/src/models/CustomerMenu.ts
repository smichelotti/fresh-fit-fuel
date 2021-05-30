import { MenuItem } from "./MenuItem";

export interface CustomerMenuResponse {
  currentMenu: CustomerMenu,
  stats: { menuItemId: string, count: number }[]
}

export interface CustomerMenu {
  start: Date,
  end: Date,
  menuItems: MenuItem[]
}