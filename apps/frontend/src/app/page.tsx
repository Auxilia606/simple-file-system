import { Stack } from "@mui/material";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/login");

  return (
    <Stack>
      <Link href="/login">로그인</Link>
    </Stack>
  );
}
