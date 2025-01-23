import { Box, Container, Typography } from "@mui/material";
import FindPasswordForm from "./FindPasswordForm";

export default function Home() {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          비밀번호 찾기
        </Typography>
        <FindPasswordForm />
      </Box>
    </Container>
  );
}
