import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import ProjectCasePage from "@/components/ProjectCasePage";
import { getProjectBySlug, getProjectData, getProjectSlugs } from "@/data/projectData";
import { breadcrumbJsonLd, buildPageMetadata, projectJsonLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug, "en");
  if (!project) return {};
  return buildPageMetadata({
    locale: "en",
    path: `/projects/${slug}`,
    title: `${project.seoTitle} | Morris Liu`,
    description: project.seoDescription,
    image: project.socialImage,
  });
}

export default async function ProjectPageEn({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug, "en");
  if (!project) notFound();
  const relatedProjects = getProjectData("en").projects
    .filter((candidate) => candidate.slug !== slug && candidate.categories.some((category) => project.categories.includes(category)))
    .slice(0, 3);

  return (
    <>
      <JsonLd data={projectJsonLd(project, "en")} />
      <JsonLd data={breadcrumbJsonLd([
        { name: "Home", path: "/en" },
        { name: "Case Studies", path: "/en/projects" },
        { name: project.title, path: `/en/projects/${slug}` },
      ])} />
      <ProjectCasePage project={project} relatedProjects={relatedProjects} locale="en" />
    </>
  );
}
