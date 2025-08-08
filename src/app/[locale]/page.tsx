import { redirect } from "next/navigation";
import { generatePath } from "./_utils/redirectPath";
import { Locale } from "@/i18n/routing";

export default function RootRedirect() {
  const strictLocale: Locale = "en";
  redirect(generatePath(strictLocale, "login"));
}
