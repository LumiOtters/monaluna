import type { Metadata } from "next";
import { SectionTitle } from "@/components/section-title";
import { PageHero } from "@/components/page-hero";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "WORK",
  description: "项目作品集 —— 目前还在起步阶段。",
};

export default function WorkPage() {
  const doneCount = projects.filter((p) => p.status === "done").length;
  const buildingCount = projects.filter((p) => p.status === "building").length;

  return (
    <>
      <PageHero
        jp="成果物"
        lines={["SELECTED", "WORK"]}
        description="我刚上大一，才刚开始接触这些东西。这里不放虚假的成果，只写下我打算做什么、做到哪一步了。"
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionTitle
          en="PROJECTS"
          jp="一覧"
          note={`目前完成 ${doneCount} 个，进行中 ${buildingCount} 个，其余还在计划里。`}
        />
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>
    </>
  );
}
