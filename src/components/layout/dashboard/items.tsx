import { JSX } from 'react';
import TableChartIcon from '@mui/icons-material/TableChart';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
export interface IMenuItem {
  text: string;
  icon: JSX.Element;
  url: string
  items: { text: string; icon: JSX.Element }[];
}

export const menuItems: IMenuItem[] = [
  {
    text: 'Dashboard',
    icon: <TableChartIcon />,
    url: '/dashboard',
    items: [

    ],
  },
  {
    text: 'Biblioteca',
    icon: <LibraryBooksIcon />,
    url: '/library',
    items: [
    ],
  },
];
