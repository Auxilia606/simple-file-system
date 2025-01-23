"use client";
import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    email: string;
    username: string;
    password: string;
    passwordCheck: string;
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
        slotProps={{
          input: {
            endAdornment: (
              <Button variant="outlined" size="small">
                인증
              </Button>
            ),
          },
        }}
        {...register("email", {
          required: "이메일을 입력해주세요",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "올바른 이메일 형식을 입력해주세요.",
          },
        })}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="이름"
        autoComplete="name"
        autoFocus
        error={!!errors.username}
        helperText={errors.username?.message}
        {...register("username", {
          required: "이름을 입력해주세요",
          pattern: {
            value: /^[a-zA-Z가-힣\s]{2,20}$/,
            message:
              "이름은 2자 이상 20자 이하의 한글, 영문, 공백만 허용됩니다.",
          },
        })}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="비밀번호"
        type="password"
        id="password"
        autoComplete="code"
        error={!!errors.password}
        helperText={errors.password?.message}
        {...register("password", {
          required: "비밀번호를 입력해주세요",
          pattern: {
            value: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\W)(?=\S+$).{9,20}$/,
            message:
              "영문 대소문자, 숫자, 특수문자를 포함하여 9자 이상 20자 이하로 입력해 주세요.",
          },
        })}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="비밀번호 확인"
        type="password"
        id="password-check"
        autoComplete="code"
        error={!!errors.passwordCheck}
        helperText={errors.passwordCheck?.message}
        {...register("passwordCheck", {
          required: "비밀번호를 다시 입력해주세요",
          validate: (_v, values) => {
            if (values.password !== values.passwordCheck)
              return "비밀번호가 일치하지 않습니다.";
            return true;
          },
          pattern: {
            value: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\W)(?=\S+$).{9,20}$/,
            message:
              "영문 대소문자, 숫자, 특수문자를 포함하여 9자 이상 20자 이하로 입력해 주세요.",
          },
        })}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        가입하기
      </Button>
    </Box>
  );
};

export default SignupForm;
