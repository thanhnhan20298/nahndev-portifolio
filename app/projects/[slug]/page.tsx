import { notFound } from "next/navigation";
import { ProjectPageEnter } from "@/components/manga/projects/ProjectPageEnter";
import { getProject, projects } from "@/lib/content/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return <ProjectPageEnter project={project} />;
}
