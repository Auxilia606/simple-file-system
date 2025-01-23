import { Box, Container, Typography } from "@mui/material";
import LoginForm from "./LoginForm";

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
          로그인
        </Typography>
        <LoginForm />
      </Box>
    </Container>
  );
}
