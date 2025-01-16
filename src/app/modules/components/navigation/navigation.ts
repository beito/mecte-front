export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: NavigationItem[];
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'navigation',
    title: 'MI EXPEDIENTE',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [
      {
        id: 'general-profile',
        title: 'Actividades',
        type: 'item',
        icon: 'feather icon-shopping-cart',
        url: '/home/actividades',
        target: false
      },
      {
        id: 'general-profile',
        title: 'Asignaturas',
        type: 'item',
        icon: 'feather icon-shopping-cart',
        url: '/home/asignaturas',
        target: false
      },
      {
        id: 'general-profile',
        title: 'Carreras',
        type: 'item',
        icon: 'feather icon-shopping-cart',
        url: '/home/carreras',
        target: false
      },
      {
        id: 'general-profile',
        title: 'Competencias',
        type: 'item',
        icon: 'feather icon-shopping-cart',
        url: '/home/competencias',
        target: false
      },
      {
        id: 'general-profile',
        title: 'Evaluaciones',
        type: 'item',
        icon: 'feather icon-shopping-cart',
        url: '/home/evaluaciones',
        target: false
      },
      {
        id: 'general-profile',
        title: 'Decanos',
        type: 'item',
        icon: 'feather icon-shopping-cart',
        url: '/home/decanos',
        target: false
      },
      {
        id: 'general-profile',
        title: 'Facultades',
        type: 'item',
        icon: 'feather icon-shopping-cart',
        url: '/home/facultades',
        target: false
      },
      {
        id: 'general-profile',
        title: 'Períodos Académicos',
        type: 'item',
        icon: 'feather icon-shopping-cart',
        url: '/home/periodos-academicos',
        target: false
      },
      {
        id: 'general-profile',
        title: 'Procesos de Mejora',
        type: 'item',
        icon: 'feather icon-shopping-cart',
        url: '/home/procesos-mejora',
        target: false
      },
      {
        id: 'general-profile',
        title: 'Seguimientos',
        type: 'item',
        icon: 'feather icon-shopping-cart',
        url: '/home/seguimientos',
        target: false
      },
      {
        id: 'general-profile',
        title: 'Sub Competencias',
        type: 'item',
        icon: 'feather icon-shopping-cart',
        url: '/home/sub-competencias',
        target: false
      }
    ]
  },
  {
    id: 'log-out-group',
    title: '',
    type: 'group',
    icon: 'feather icon-layers',
    children: [
     {
        id: 'log-out',
        title: 'Salir',
        type: 'item',
        icon: 'feather icon-log-out',
        url: 'logout',
      },
    ]
  },
];
