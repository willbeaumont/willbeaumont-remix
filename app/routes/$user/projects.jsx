import { Link, useCatch, useLoaderData, useParams } from "@remix-run/react";

import { getRepos } from "~/utils/gh.server";
import Projects from "~/components/project";

export const loader = async ({ params }) => {
  const userId = params.user;

  try {
    const projectData = await getRepos(userId);
    return projectData;
  } catch (error) {
    throw new Response("Problem calling github api.", {
      status: error.status,
    });
  }
};

export const meta = () => {
  const { user } = useParams();
  return {
    description: "GitHub user account information as a dev page.",
    title: `Developer Site | ${user}`,
  };
};

export default function UserProject() {
  const data = useLoaderData();

  return (
      <Projects data={data} navId={"projects"} />
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  const { user } = useParams();
  if (caught.status === 404) {
    return (
      <div className="bg-red-600 text-white p-14">
        <h1 className="text-3xl pb-8">Server Error {caught.status}</h1>
        <p className="w-auto break-normal">
          {`Error, user '${user}' not found--double check your GitHub username and try again at the `}
          <Link to="/" className="text-txt-pri underline">
            homepage
          </Link>
          .
        </p>
      </div>
    );
  }
  throw new Error(`Unhandled error: ${caught.status}`);
}

export function ErrorBoundary({ error }) {
  return (
    <div className="bg-red-600 text-white p-14">
      <h1 className="text-3xl pb-8">Page Error</h1>
      <p className="w-auto break-normal">Unexpected Error!</p>
    </div>
  );
}
