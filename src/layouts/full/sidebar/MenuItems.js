// import SpeedRoundedIcon from '@mui/icons-material/SpeedRounded';
import { ReactComponent as devie } from 'src/assets/devie.svg';
import { ReactComponent as DealerManagement } from 'src/assets/DealerManagement.svg';
import { ReactComponent as usermanagment } from 'src/assets/usermanagment.svg';
// import { ReactComponent as warranty } from 'src/assets/warranty.svg';
import { ReactComponent as Technical } from 'src/assets/Technical.svg';
import { ReactComponent as settings } from 'src/assets/settings.svg';
import { uniqueId } from 'lodash';

const Menuitems = [
  // {
  //   id: uniqueId(),
  //   title: 'Dashboard',
  //   icon: SpeedRoundedIcon,
  //   href: '/dashboard',
  //   hasBorder: true,
  // },
  {
    id: uniqueId(),
    title: 'BESI Admin Management',
    icon: usermanagment,
    href: '/admin-management',
  },
  {
    id: uniqueId(),
    title: 'System Management',
    icon: devie,
    href: '/system-managment',
  },
  {
    id: uniqueId(),
    title: 'Authorized Service Partner',
    icon: DealerManagement,
    href: '/service-partner',
  },
  // {
  //   id: uniqueId(),
  //   title: 'Terms & Conditions',
  //   icon: warranty,
  //   href: '/terms-conditions',
  // },
  {
    id: uniqueId(),
    title: 'Technical Data',
    icon: Technical,
    href: '/technical-data',
  },
  {
    id: uniqueId(),
    title: 'Settings',
    icon: settings,
    href: '/settings',
  },
];

export default Menuitems;
