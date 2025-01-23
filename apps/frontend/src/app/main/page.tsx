import MainHeader from "@/widget/MainHeader";
import MainLogo from "@/widget/MainLogo";
import MainSideAdd from "@/widget/MainSideAdd";
import MainSideBar from "@/widget/MainSideBar";
import { Box, Stack } from "@mui/material";
import { PropsWithChildren } from "react";

export default function Home({ children }: PropsWithChildren) {
  return (
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
  );
}
