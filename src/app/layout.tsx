import { ThemeProvider } from '@mui/material/styles';
import '../configs/styles/reset.css';
import CssBaseline from '@mui/material/CssBaseline';
import defaultTheme from '@/configs/styles/theme/default-theme';
import { AlertProvider } from '@/contexts/alert.context';
import { MenuProvider } from '@/contexts/menu.context';
import TanstackProvider from '@/providers/tanstack.provider';
import DashboardLayoutComponent from '@/components/layout/dashboard';

export const metadata = {
  title: 'Lumi - Gerenciamento a sua energia.',
  description: 'Impulsionando os seus negócios, gerenciamento a sua energia.',
  icons: {
    icon: '/favicon.ico',
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <ThemeProvider theme={defaultTheme}>
          <CssBaseline />
          <AlertProvider>
            <MenuProvider>
              <TanstackProvider>
                <DashboardLayoutComponent>
                  {children}
                </DashboardLayoutComponent>
              </TanstackProvider>
            </MenuProvider>
          </AlertProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}