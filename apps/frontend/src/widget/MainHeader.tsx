import { Button, Stack, TextField } from "@mui/material";

const MainHeader = () => {
  return (
    <Stack direction="row" flex="1" alignItems="center" gap={2} sx={{ pr: 2 }}>
      <TextField
        variant="outlined"
        fullWidth
        placeholder="파일 또는 폴더 검색하기"
        size="small"
      />
      <Button variant="contained" size="medium">
        검색
      </Button>
    </Stack>
  );
};

export default MainHeader;
