"use client";
import { Add as AddIcon } from "@mui/icons-material";
import { Button, Menu, MenuItem, Stack } from "@mui/material";
import { useState } from "react";

const MainSideAdd = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack
      flex={1}
      sx={{ width: 256, py: 2 }}
      justifyContent="center"
      alignItems={"center"}
    >
      <Button
        id="main-add-button"
        size="large"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
        }}
        variant="contained"
        startIcon={<AddIcon />}
      >
        추가하기
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>새 폴더</MenuItem>
        <MenuItem onClick={handleClose}>파일 업로드</MenuItem>
      </Menu>
    </Stack>
  );
};

export default MainSideAdd;
