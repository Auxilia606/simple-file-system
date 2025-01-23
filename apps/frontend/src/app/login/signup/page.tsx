import { Box, Container, Typography } from "@mui/material";
import SignupForm from "./SignupForm";

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
          회원가입
        </Typography>
        <SignupForm />
      </Box>
    </Container>
  );
}
