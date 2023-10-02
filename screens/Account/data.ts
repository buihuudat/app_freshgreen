interface DataActionProps {
  icon: string;
  title: string;
  path: any;
  active: boolean;
}

export const dataAction: Array<DataActionProps> = [
  {
    icon: 'person-outline',
    title: 'Tài khoản',
    path: 'Profile',
    active: false,
  },
  {
    icon: 'grading',
    title: 'Quản lý đơn hàng',
    path: 'OrderManager',
    active: false,
  },
  {
    icon: 'history',
    title: 'Lịch sử đơn hàng',
    path: 'History',
    active: false,
  },
  {
    icon: 'favorite',
    title: 'Sản phẩm yêu thích',
    path: 'Favorite',
    active: false,
  },
  {
    icon: 'quiz',
    title: 'Câu hỏi thường gặp',
    path: 'FAQ',
    active: true,
  },
  {
    icon: 'support-agent',
    title: 'Liên hệ',
    path: 'Supports',
    active: true,
  },
  {
    icon: 'settings',
    title: 'Cài đặt',
    path: 'Settings',
    active: true,
  },
];
