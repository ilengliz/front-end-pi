import {Injectable} from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  short_label?: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const MENUITEMS = [
  { label : '',
    main: [
      {
        state: 'nutritionnistes',
        short_label: 'S',
        name: 'Nutritioniste',
        type: 'link',
        icon: 'ti-layout-sidebar-left'
      }, 
      
      {
          state: 'instances',
          short_label: 'p',
          name: 'Instances',
          type: 'link',
          icon: 'ti-google'
        },
      
        {
          state: 'projects',
          short_label: 'p',
          name: 'Projects',
          type: 'link',
          icon: 'ti-clipboard'
        },
      {
        state: 'users',
        short_label: 'u',
        name: 'Users',
        type: 'link',
        icon: 'ti-user'
      },
      {
        state: 'log',
        short_label: 's',
        name: 'Logs',
        type: 'link',
        icon: 'ti-write'
      },
      {
        state: 'schedule',
        short_label: 's',
        name: 'Schedules',
        type: 'link',
        icon: 'ti-clipboard'
      }
    ]
  },

];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }
}
