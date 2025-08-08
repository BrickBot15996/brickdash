import { notFound, redirect } from "next/navigation";
import { routeMap, RouteKey } from "@/i18n/routing";
import { Metadata } from "next";
import { loginMetadata } from "../_pages/login/login-metadata";
import { blogMetadata } from "../_pages/blog/blog-metadata";
import { editBlogMetadata } from "../_pages/blog/edit-blog/edit-blog-metadata";
import { createBlogMetadata } from "../_pages/blog/create-blog/create-blog-metadata";
import { sponsorsMetadata } from "../_pages/sponsors/sponsors-metadata";
import { theVaultMetadata } from "../_pages/projects/the-vault/the-vault-metadata";
import { seasonsMetadata } from "../_pages/seasons/seasons-metadata";
import { sparksMetadata } from "../_pages/projects/sparks/sparks-metadata";
import { checkpointMetadata } from "../_pages/projects/checkpoint/checkpoint-metadata";
import { sponsorshipTiersMetadata } from "../_pages/sponsors/sponsorship-tiers/sponsorship-tiers-metadata";
import { projectsMetadata } from "../_pages/projects/projects-metadata";
import LoginPage from "../_pages/login/login-page";
import BlogPage from "../_pages/blog/blog-page";
import EditBlogPage from "../_pages/blog/edit-blog/edit-blog-page";
import CreateBlogPage from "../_pages/blog/create-blog/create-blog-page";
import SponsorsPage from "../_pages/sponsors/sponsors-page";
import TheVaultPage from "../_pages/projects/the-vault/the-vault-page";
import CheckpointPage from "../_pages/projects/checkpoint/checkpoint-page";
import SparksPage from "../_pages/projects/sparks/sparks-page";
import SeasonsPage from "../_pages/seasons/seasons-page";
import SponsorshipTiersPage from "../_pages/sponsors/sponsorship-tiers/sponsorship-tiers-page";
import ProjectsPage from "../_pages/projects/projects-page";

export const dynamic = "force-dynamic";

const metadataMap: Record<RouteKey, Record<string, Metadata>> = {
  login: loginMetadata,
  blog: blogMetadata,
  editBlog: editBlogMetadata,
  createBlog: createBlogMetadata,
  sponsors: sponsorsMetadata,
  theVault: theVaultMetadata,
  checkpoint: checkpointMetadata,
  sparks: sparksMetadata,
  seasons: seasonsMetadata,
  sponsorshipTiers: sponsorshipTiersMetadata,
  projects: projectsMetadata,
};

const componentMap: Record<RouteKey, React.ComponentType> = {
  login: LoginPage,
  blog: BlogPage,
  editBlog: EditBlogPage,
  createBlog: CreateBlogPage,
  sponsors: SponsorsPage,
  theVault: TheVaultPage,
  checkpoint: CheckpointPage,
  sparks: SparksPage,
  seasons: SeasonsPage,
  sponsorshipTiers: SponsorshipTiersPage,
  projects: ProjectsPage,
};

// const redirectMap: Record<RedirectKey, string> = {};

function findRouteMatch(segments: string[], locale?: string) {
  if (locale) {
    const match = Object.entries(routeMap).find(([, localized]) => {
      const localizedPath = localized[locale as "en"];
      return (
        localizedPath.length === segments.length &&
        localizedPath.every((seg, idx) => seg === segments[idx])
      );
    });
    if (match) {
      return { key: match[0], detectedLocale: locale };
    }
  }

  for (const [routeKey, localized] of Object.entries(routeMap)) {
    for (const [lang, path] of Object.entries(localized)) {
      if (
        path.length === segments.length &&
        path.every((seg, idx) => seg === segments[idx])
      ) {
        return { key: routeKey, detectedLocale: lang };
      }
    }
  }

  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; segments?: string[] }>;
}): Promise<Metadata> {
  const { locale, segments = [] } = await params;

  const match = findRouteMatch(segments, locale);
  console.log(match);

  if (!match) {
    return {
      title: "Page not found",
      description: "The page you're looking for doesn't exist.",
    };
  }

  const { key } = match;

  // if (key in redirectMap) {
  //   return {
  //     title: locale === "en" ? "Redirecting..." : "Redirecționare...",
  //     description:
  //       locale === "en"
  //         ? "Redirecting to external resource."
  //         : "Ești redirecționat către o resursă externă",
  //   };
  // }

  const pageMeta = metadataMap[key as RouteKey];

  return (
    pageMeta?.[locale] ?? {
      title: "BrickDash",
      description: "BrickBot Website Dashboard",
    }
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; segments?: string[] }>;
}) {
  const { locale, segments = [] } = await params;

  const match = findRouteMatch(segments, locale);

  if (!match) {
    return notFound();
  }

  const { key, detectedLocale } = match;

  if (detectedLocale !== locale) {
    const correctPath = `/${detectedLocale}/${segments.join("/")}`;
    redirect(correctPath);
  }

  // if (key in redirectMap) {
  //   redirect(redirectMap[key as RedirectKey]);
  // }

  const Component = componentMap[key as RouteKey];
  if (!Component) {
    return notFound();
  }

  return <Component />;
}
