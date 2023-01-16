import { useState } from "react";

import { useLoaderData } from "@remix-run/react";
import { redirect } from "@remix-run/node";

import { getBio, getRepos } from "~/utils/gh.server";
import Bio from "~/bio";
import Projects from "~/projects";

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
  const [updateAlias, setUpdateAlias] = useState(false);

  const handleClick = () => {
    setUpdateAlias((old) => !old);
  };

  return (
    <div className="bg-bg-pri text-txt-pri">
      <Bio
        data={data.bio}
        updateAlias={updateAlias}
        handleClick={handleClick}
      />

      <Projects data={data.projects} />

      <footer className={"w-full p-4 text-center"}>
        Will Beaumont &copy; 2023
      </footer>
    </div>
  );
}
