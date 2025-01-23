"use client";
import { Box, Button, Link, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    email: string;
    password: string;
  }>();

  return (
    <Box
      component="form"
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
      noValidate
      sx={{ mt: 3 }}
    >
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="이메일 주소"
        autoComplete="email"
        autoFocus
        error={!!errors.email}
        helperText={errors.email?.message}
        {...register("email", { required: "이메일을 입력해주세요." })}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="비밀번호"
        type="password"
        id="password"
        autoComplete="current-password"
        error={!!errors.password}
        helperText={errors.password?.message}
        {...register("password", { required: "비밀번호를 입력해주세요." })}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        로그인
      </Button>
      <Box display="flex" justifyContent="space-between">
        {/* <Link href="/login/find-pw" variant="body2" aria-label="비밀번호 찾기">
          비밀번호를 잊으셨나요?
        </Link> */}
        <Link
          href="/login/signup"
          variant="body2"
          aria-label="회원가입 페이지로 이동"
        >
          회원가입
        </Link>
      </Box>
    </Box>
  );
};

export default LoginForm;
