import { SxProps, Theme } from '@mui/material';

export const miniDrawerStyles: {
  root: SxProps<Theme>;
  menuButton: (open: boolean) => SxProps<Theme>;
  drawerHeader: (theme: Theme) => SxProps<Theme>;
  userInfoContainer: SxProps<Theme>;
  main: SxProps<Theme>;
  logoContainer: (open: boolean) => SxProps<Theme>;
} = {
  root: {
    display: 'flex',
    backgroundColor: 'background.paper',
    overflowX: 'auto'
  },

  menuButton: (open: boolean) => ({
    marginRight: 5,
    display: open ? 'none' : 'block',
  }),

  drawerHeader: (theme: Theme) => ({
    color: theme.palette.primary.contrastText,
    py: 1,
    pl: 2.5,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),

  userInfoContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    gap: 1,
  },

  main: {
    flexGrow: 1,
    p: 3,
    mt: 6,
    backgroundColor: 'background.paper',
  },

  logoContainer: (open: boolean) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    marginTop: 'auto',
    marginBottom: 2,
    '& img': {
      width: open ? '30%' : '40px',
      height: 'auto',
      transition: 'width 0.2s ease-in-out',
    }
  }),
};