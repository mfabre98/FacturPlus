// Sidebar route metadata
export interface RouteInfo {
  path: string;
  tab: string;
  title: string;
  icon: string;
  ionIcon: string;
  class: string;
  extralink: boolean;
  submenu: RouteInfo[];
  showOnDesktop: boolean;
}
