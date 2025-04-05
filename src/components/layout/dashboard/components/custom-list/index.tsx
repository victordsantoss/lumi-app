import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { IMenuItem, menuItems } from '../../items';
import { Tooltip } from '@mui/material';
import { customListStyles } from './styles';
import { useMenu } from '@/contexts/menu.context';
import { useRouter } from 'next/navigation';

interface ICustomListProps {
  open: boolean;
}

const CustomList: React.FC<ICustomListProps> = ({ open }) => {
  const router = useRouter();
  const { selectedMenu, setSelectedMenu } = useMenu();


  const handleToggleItem = (item: IMenuItem) => {
    setSelectedMenu(item.text);
    router.push(item.url);
  };

  return (
    <List>
      {menuItems.map((item: IMenuItem) => (
        <div key={item.text}>
          <ListItem disablePadding sx={customListStyles.listItem}>
            <ListItemButton
              onClick={() => handleToggleItem(item)}
              sx={{
                ...customListStyles.listItemButton(open),
                backgroundColor: selectedMenu === item.text ? 'rgba(216, 209, 190, 0.1)' : 'transparent',
              }}
            >
              <Tooltip title={`${item.text}`} placement="right">
                <ListItemIcon sx={customListStyles.listItemIcon(open)}>
                  {item.icon}
                </ListItemIcon>
              </Tooltip>
              <ListItemText
                primary={item.text}
                sx={customListStyles.listItemText(open)}
              />
            </ListItemButton>
          </ListItem>
        </div>
      ))}
    </List>
  );
};

export default CustomList;