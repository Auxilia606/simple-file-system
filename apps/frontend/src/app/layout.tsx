import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import MainHeader from "@/widget/MainHeader";
import MainLogo from "@/widget/MainLogo";
import MainSideAdd from "@/widget/MainSideAdd";
import MainSideBar from "@/widget/MainSideBar";
import { Box, Stack } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";

import "./globals.css";
import theme from "@/shared/utils/theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SFS",
  description: "Simple File System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Box
              sx={{ height: "100%" }}
              display="grid"
              gridTemplateColumns="auto 1fr auto auto auto"
              gridTemplateRows="auto auto 1fr"
              gridTemplateAreas={`
          "logo head head head c-sh"
          "newb vwgr d--s c-sw c-sh"
          "navp vwgr d--s c-sw c-sh"
        `}
            >
              <Stack gridArea="logo">
                <MainLogo />
              </Stack>
              <Stack gridArea="head">
                <MainHeader />
              </Stack>
              <Stack gridArea="newb">
                <MainSideAdd />
              </Stack>
              <Stack gridArea="navp">
                <MainSideBar />
              </Stack>
              <Stack gridArea="vwgr">{children}</Stack>
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
