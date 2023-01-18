import { Link, useLoaderData, useParams } from "@remix-run/react";
import { redirect } from "@remix-run/node";

import { getBio, getRepos } from "~/utils/gh.server";
import Layout from "~/components/layout";
import Bio from "~/components/bio";
import Projects from "~/components/project";

import { SECTIONS } from "~/constants/sections";

export const loader = async ({ params }) => {
  const userId = params.user;

  const [bioData, projectData] = await Promise.all([
    getBio(userId),
    getRepos(userId),
  ]);
  return { bio: bioData, projects: projectData };
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const newUserId = formData.get("newAlias");
  return redirect(`/${newUserId}`);
};

export default function NewUser() {
  const data = useLoaderData();

  return (
    <Layout userName={data.bio.name} navSections={SECTIONS}>
      <Bio data={data.bio} />
      <Projects data={data.projects} navId={"projects"} />
    </Layout>
  );
}

export function ErrorBoundary({ error }) {
  const { user } = useParams();
  return (
    <div className="bg-red-600 text-white p-14">
      <h1 className="text-3xl pb-8">Page Error</h1>
      <p className="w-auto break-normal">
        {`There was an error loading user '${user}'--double check your GitHub username and try again at the `}
        <Link to="/" className="text-txt-pri underline">
          homepage
        </Link>
        .
      </p>
    </div>
  );
}
