"use client";
import { Box, Button, TextField } from "@mui/material";

const FindPasswordForm = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    console.log({ email, password }); // 서버로 보내기 위한 데이터
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="이메일 주소"
        name="email"
        autoComplete="email"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="인증코드"
        type="password"
        id="password"
        autoComplete="code"
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        로그인
      </Button>
    </Box>
  );
};

export default FindPasswordForm;
