import { redirect } from "next/navigation";
import { IntroSelector } from "@/components/intro";

/**
 * 홈페이지
 * - production: /opening/door로 리다이렉트
 * - development: 6가지 인트로 선택 화면
 */
export default function Home() {
  if (process.env.NODE_ENV === "production") {
    redirect("/opening/door");
  }

  return <IntroSelector />;
}
