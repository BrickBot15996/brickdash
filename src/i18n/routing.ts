import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en"],

  defaultLocale: "en",
});

export type Locale = "en";

// export type RedirectKey = "";

export type RouteKey =
  | "login"
  | "blog"
  | "editBlog"
  | "createBlog"
  | "sponsors"
  | "theVault"
  | "checkpoint"
  | "sparks"
  | "seasons"
  | "sponsorshipTiers"
  | "projects";

export const routeMap: Record<RouteKey, Record<Locale, string[]>> = {
  login: {
    en: ["login"],
  },
  blog: {
    en: ["blog"],
  },
  editBlog: {
    en: ["blog", "edit"],
  },
  createBlog: {
    en: ["blog", "create"],
  },
  sponsors: {
    en: ["sponsors"],
  },
  theVault: {
    en: ["the-vault"],
  },
  checkpoint: {
    en: ["checkpoint"],
  },
  sparks: {
    en: ["sparks"],
  },
  seasons: {
    en: ["seasons"],
  },
  sponsorshipTiers: {
    en: ["sponsorship-tiers"],
  },
  projects: {
    en: ["projects"],
  },
};
