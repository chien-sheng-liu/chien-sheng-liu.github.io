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
  const project = getProjectBySlug(slug, "zh");
  if (!project) return {};
  return buildPageMetadata({
    locale: "zh",
    path: `/projects/${slug}`,
    title: `${project.seoTitle}｜Morris Liu`,
    description: project.seoDescription,
    image: project.socialImage,
  });
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug, "zh");
  if (!project) notFound();
  const relatedProjects = getProjectData("zh").projects
    .filter((candidate) => candidate.slug !== slug && candidate.categories.some((category) => project.categories.includes(category)))
    .slice(0, 3);

  return (
    <>
      <JsonLd data={projectJsonLd(project, "zh")} />
      <JsonLd data={breadcrumbJsonLd([
        { name: "首頁", path: "/" },
        { name: "案例作品", path: "/projects" },
        { name: project.title, path: `/projects/${slug}` },
      ])} />
      <ProjectCasePage project={project} relatedProjects={relatedProjects} locale="zh" />
    </>
  );
}
