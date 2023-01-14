import { useEffect, useState } from "react";
import { Octokit } from "octokit";

import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Banner } from "~/components/banner";
import { Button, ButtonGroup, TextInput } from "~/components/button";
import Projects from "~/components/project";
import moment from "moment";

const octokit = new Octokit();

export const loader = async () => {
  const getUserData = async (userId) => {
    const res = await octokit.request("GET /users/{user}", {
      user: userId,
    });

    if (res.status === 200) {
      console.log(`ok response for ${userId}!`);
      console.log(res.headers["x-ratelimit-remaining"]);
    } else {
      console.log(`not ok response for ${userId}!`);
      console.log(JSON.stringify(res.status));
      console.log(JSON.stringify(res.data));
    }

    return { data: res };
  };
};

function Index() {
  const { data } = useLoaderData()
  const [alias, setAlias] = useState("willbeaumont");
  const [updateAlias, setUpdateAlias] = useState(false);
  const [user, setUser] = useState({});
  const [rateRefresh, setRateRefresh] = useState(null);
  const [remLoads, setRemLoads] = useState(null);

  useEffect(() => {
    getUserData(alias).then((data) => {
      setRemLoads(data.headers["x-ratelimit-remaining"]);
      if (data.headers["x-ratelimit-remaining"] > 0) {
        setUser({ ...data.data });
      } else {
        setRateRefresh(
          moment.unix(data.headers["x-ratelimit-reset"]).calendar()
        );
      }
    });
  }, [alias]);

  const sections = ["Projects"];

  const handleSubmit = (event) => {
    event.preventDefault();
    setAlias(event.target.newAlias.value);
    setUpdateAlias((old) => !old);
  };

  const handleClick = () => {
    setUpdateAlias((old) => !old);
  };

  return (
    <div className="bg-bg-pri text-txt-pri">
      <Banner>
        <ButtonGroup>
          {updateAlias ? (
            <TextInput action={handleSubmit} />
          ) : (
            <Button value={user.name} action={handleClick} />
          )}
          Remaining Page Loads: {remLoads}
          {sections.map((section) => (
            <Button
              value={section}
              key={section}
              href={"#" + section}
              action={false}
            />
          ))}
        </ButtonGroup>
      </Banner>
      {rateRefresh ? (
        <section className="w-screen h-screen text-2xl text-center flex">
          <div className="m-auto">
            Oops! Github rate limit exceeded, comeback {rateRefresh}
          </div>
        </section>
      ) : (
        <>
          <section
            id="welcome"
            className="flex flex-col md:flex-row max-w-lg md:max-w-none mx-auto"
          >
            <div className="w-full md:w-1/2 p-4 pt-14">
              <img
                id="head-shot"
                src={user.avatar_url}
                alt="will"
                className="rounded-xl m-auto"
              />
            </div>
            <div className="pt-14">
              <h2 className="text-xl p-4 pt-0 md:py-4">About me</h2>
              <p className="px-4">{user.bio}</p>
            </div>
          </section>
          <Projects user={alias} counter={setRemLoads} />
        </>
      )}
      <footer
        className={
          rateRefresh
            ? "w-full p-4 text-center fixed bottom-0"
            : "w-full p-4 text-center"
        }
      >
        Will Beaumont &copy; 2023
      </footer>
    </div>
  );
}

export default Index;
