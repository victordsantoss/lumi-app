'use client'

import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AppBar from './components/app-bar';
import Drawer from './components/drawer';
import CustomList from './components/custom-list';
import Image from 'next/image';
import { useMenu } from '@/contexts/menu.context';

import { miniDrawerStyles } from './styles';

const drawerWidth = 240;

export default function MiniDrawer({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { selectedMenu } = useMenu();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={miniDrawerStyles.root}>
      <CssBaseline />
      <AppBar
        open={open}
        drawerWidth={drawerWidth}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={miniDrawerStyles.menuButton(open)}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6" noWrap component="div">
              {selectedMenu ?? 'Dashboard'}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} drawerWidth={drawerWidth}>
        <Box sx={miniDrawerStyles.drawerHeader(theme)}>
          <Box sx={miniDrawerStyles.userInfoContainer}>
            <Box>
              <Typography variant="h6" fontWeight="bold">
                Lumi
              </Typography>
              <Typography fontSize={10} sx={{ maxWidth: 150 }}>Gerenciando a sua energia.</Typography>
            </Box>
          </Box>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon sx={{ color: theme.palette.primary.contrastText }} /> : <ChevronLeftIcon sx={{ color: theme.palette.primary.contrastText }} />}
          </IconButton>
        </Box>
        <Divider sx={{ backgroundColor: theme.palette.primary.contrastText }} />
        <CustomList open={open} setOpen={setOpen} />
        <Divider sx={{ backgroundColor: theme.palette.primary.contrastText }} />
        <Box sx={miniDrawerStyles.logoContainer(open)}>
          <Image
            src="/lumi-logo.jpeg"
            alt="Lumi Logo"
            width={240}
            height={240}
            priority
            style={{ objectFit: 'contain' }}
          />
        </Box>
      </Drawer>
      <Box component="main" sx={miniDrawerStyles.main}>
        <Box sx={miniDrawerStyles.drawerHeader(theme)} />
        {children}
      </Box>
    </Box>
  );
}