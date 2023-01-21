import {
  Link,
  Outlet,
  useCatch,
  useLoaderData,
  useParams,
} from "@remix-run/react";
import { json, redirect } from "@remix-run/node";

import { getBio } from "~/utils/gh.server";
import Layout from "~/components/layout";
import Bio from "~/components/bio";

import { SECTIONS } from "~/constants/sections";

export const loader = async ({ params }) => {
  const userId = params.user;
  
  try {
    const bioData = await getBio(userId);
    
    return json(bioData, {headers: {"Cache-Control": "max-age=300, s-maxage=600"}});
  } catch (error) {
    throw new Response("Problem calling github api.", {
      status: error.status,
    });
  }
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const newUserId = formData.get("newAlias");
  return redirect(`/${newUserId}/projects`);
};

export const meta = ({ data }) => {
  const metaTags = {
    description: "GitHub user account information as a dev page.",
  };
  if (!data) {
    const { user } = useParams();
    metaTags["title"] = `Developer Site | ${user}`;
  } else {
    metaTags["title"] = `Developer Site | ${data.name}`;
  }
  return metaTags;
};

export default function NewUser() {
  const data = useLoaderData();

  return (
    <Layout userName={data.name} navSections={SECTIONS}>
      <Bio data={data} />
      <Outlet />
    </Layout>
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
