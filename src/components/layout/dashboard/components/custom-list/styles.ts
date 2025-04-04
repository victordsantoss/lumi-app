import { SxProps, Theme } from '@mui/material';

export const customListStyles: {
  listItem: SxProps<Theme>;
  listItemButton: (open: boolean) => SxProps<Theme>;
  nestedListItemButton: (open: boolean) => SxProps<Theme>;
  listItemIcon: (open: boolean) => SxProps<Theme>;
  listItemText: (open: boolean) => SxProps<Theme>;
} = {
  listItem: {
    display: 'block',
  },

  listItemButton: (open: boolean) => (theme: Theme) => ({
    minHeight: 48,
    px: 2.5,
    justifyContent: open ? 'initial' : 'center',
    transition: 'background-color 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: 'rgba(216, 209, 190, 0.1)',
      '& .MuiListItemIcon-root': {
        color: theme.palette.background.default,
      },
      '& .MuiListItemText-root': {
        color: theme.palette.background.default,
      }
    }
  }),

  nestedListItemButton: (open: boolean) => (theme: Theme) => ({
    maxHeight: 48,
    pl: open ? 4 : 2.5,
    justifyContent: open ? 'initial' : 'center',
    transition: 'background-color 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: 'rgba(216, 209, 190, 0.1)',
      '& .MuiListItemIcon-root': {
        color: theme.palette.background.default,
      },
      '& .MuiListItemText-root': {
        color: theme.palette.background.default,
      }
    }
  }),

  listItemIcon: (open: boolean) => (theme: Theme) => ({
    minWidth: 0,
    justifyContent: 'center',
    mr: open ? theme.spacing(1) : 'auto',
    color: theme.palette.primary.contrastText,
  }),

  listItemText: (open: boolean) => (theme: Theme) => ({
    opacity: open ? 1 : 0,
    color: theme.palette.primary.contrastText,
  }),
};