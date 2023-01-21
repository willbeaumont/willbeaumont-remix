import { Link, useCatch, useLoaderData, useParams } from "@remix-run/react";

import { getRepos } from "~/utils/gh.server";
import Projects from "~/components/project";
import { json } from "@remix-run/node";

const data = {};

export const loader = async ({ params }) => {
  const userId = params.user;
  if (data[userId]) {
    return data[userId]
  }

  // 1. have a long running server to cache data render/begin/railway .com
  // 2. app caching - redis in memory database (video 1 or 2 of remix)
  // 3. cdn - should honor http caching header
  // 4. user defer

  try {
    data[userId] = await getRepos(userId);
    return json(data[userId], {headers: {"Cache-Control": "max-age=300, s-maxage=600"}});
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

  return <Projects data={data} navId={"projects"} />;
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
  console.log(error)
  return (
    <div className="bg-red-600 text-white p-14">
      <h1 className="text-3xl pb-8">Page Error</h1>
      <p className="w-auto break-normal">Unexpected Error!</p>
    </div>
  );
}
