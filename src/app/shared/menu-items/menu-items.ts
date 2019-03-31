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
          state: 'instances',
          short_label: 'A',
          name: 'Instances',
          type: 'link',
          icon: 'ti-list'
        },

        {
          state: 'project',
          short_label: 'p',
          name: 'Projects',
          type: 'sub',
          icon: 'ti-clipboard',
          children: [
            {
              state: 'projects',
              name: 'All Projects'
            },
            {
              state: 'newProject',
              name: 'Add project'
            }]
        },
        {
          state: 'teams',
          short_label: 't',
          name: 'Teams',
          type: 'link',
          icon: 'fa fa-group'
        },
      {
        state: 'users',
        short_label: 'u',
        name: 'Users',
        type: 'link',
        icon: 'ti-user'
      },
      {
        state: 'schedules',
        short_label: 's',
        name: 'Schedules',
        type: 'link',
        icon: 'ti-calendar'
      },
      {
        state: 'reports',
        short_label: 'r',
        name: 'Reports',
        type: 'link',
        icon: 'ti-stats-up'
      },
      {
        state: 'notifications',
        short_label: 'n',
        name: 'Notifications',
        type: 'link',
        icon: 'ti-bell'
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
