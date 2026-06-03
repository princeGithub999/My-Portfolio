import LoohPartnerDetails from "@/lib/fetures/project/looh/partner-app";
import ProjectDetailPage from "@/lib/fetures/project/looh/looh";
import FocusVidyapeeth from "@/lib/fetures/project/looh/focus-vidyapeeth";

const projects = [
  {
    title: "LOOH",
    slug: "looh",
  },
  {
    title: "LOOH Partners App",
    slug: "partner-app",
  },

    {
    title: "Focus Vidyapeeth",
    slug: "focus-vidyapeeth",
  },
  {
    title: "LOOH Admin",
    slug: "looh-admin",
  },
  {
    title: "LOOH Admin Dashboard",
    slug: "looh-admin-dashboard",
  },
  
];

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const { slug } = await params;
  console.log(slug);

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return <div>Project Not Found</div>;
  }

  if (project.slug === "looh") {
    return <ProjectDetailPage />;
  }

  if (project.slug === "partner-app") {
    return <LoohPartnerDetails />;
  }

  if (project.slug === "focus-vidyapeeth") {
    return <FocusVidyapeeth />;
  }
}




