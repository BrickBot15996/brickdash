import { setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { generatePath } from "./_utils/redirectPath";
import { Locale } from "@/i18n/routing";

export default async function RootRedirect({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const strictLocale: Locale = "en";
  redirect(generatePath(strictLocale, "login"));
}
