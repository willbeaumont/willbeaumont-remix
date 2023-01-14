import LanguageBar from "~/components/languageBar";

import moment from "moment";
import { Octokit } from "octokit";
import { useEffect, useState } from "react";

const octokit = new Octokit();

const getUserRepos = async (userId, handler) => {
  const res = await octokit.request("GET /users/{user}/repos", {
    user: userId,
  });

  console.log(res.headers["x-ratelimit-remaining"])
  handler(res.headers["x-ratelimit-remaining"])

  if (res.status === 200) {
    console.log(`ok response for ${userId} repos!`);
  } else {
    console.log(`not ok response for ${userId} repos!`);
    console.log(JSON.stringify(res.status));
    console.log(JSON.stringify(res.data));
  }

  return res.data;
};

const getRepoLanguages = async (userId, repoName, handler) => {
  const res = await octokit.request("GET /repos/{user}/{repo}/languages", {
    user: userId,
    repo: repoName,
  });

  console.log(res.headers["x-ratelimit-remaining"])
  handler(res.headers["x-ratelimit-remaining"])

  if (res.status === 200) {
    console.log(`ok response for ${userId}/${repoName}!`);
  } else {
    console.log(`not ok response for ${userId}/${repoName}!`);
    console.log(JSON.stringify(res.status));
    console.log(JSON.stringify(res.data));
  }

  return res.data;
};

function Projects({ user, counter }) {
  const [repoData, setRepoData] = useState([]);
  const [langData, setLangData] = useState({});

  useEffect(() => {
    getUserRepos(user, counter).then((data) => {
      setRepoData([...data]);
    });
  }, [user]);

  useEffect(() => {
    repoData.forEach((repo) => {
      getRepoLanguages(user, repo.name, counter).then((data) => {
        const total = Object.values(data).reduce((a, b) => a + b, 0);

        const languageData = [];
        for (const [key, value] of Object.entries(data)) {
          languageData.push({
            name: `${key} ${((value * 100) / total).toFixed(1).toString()}%`,
            value: value,
          });
        }

        setLangData((old) => ({ ...old, [repo.name]: languageData }));
      });
    });
  }, [repoData]);

  const cardData = repoData
    .filter((repo) => !repo.fork)
    .map((repo) => ({ ...repo, date: new Date(repo.created_at) }))
    .sort((a, b) => b.date - a.date)
    .map((repo) => ({
      name: repo.name,
      description: repo.description,
      language: repo.language,
      push: moment(repo.pushed_at).format("l"),
      stargazers: repo.stargazers_count,
      watchers: repo.watchers_count,
      forks: repo.forks_count,
      languages: langData[repo.name],
      url: repo.html_url,
    }))
    .slice(0, 10);

  return (
    <section id="Projects" className=" max-w-lg md:max-w-none mx-auto">
      <h2 className="text-xl p-4">Projects</h2>
      <div className="grid justify-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 m-auto">
        {cardData.map((card) => (
          <Card data={card} key={card.name} />
        ))}
      </div>
      <div className="flex justify-center text-sm pt-4">
        <p className="px-4">⭐️ = starred</p>
        <p className="px-4">👀 = watchers</p>
        <p className="px-4">🔱 = forks</p>
      </div>
    </section>
  );
}

function Card({
  data: {
    name,
    description,
    push,
    stargazers,
    watchers,
    forks,
    languages,
    url,
  },
}) {
  return (
    <section
      id={name}
      className="bg-bg-sec text-txt-sec m-2 p-4 rounded-md sm:max-w-lg cursor-pointer relative"
    >
      <h3 className="text-lg pb-2 text-slate-300">{name}</h3>
      <p className="text-sm">{description}</p>
      <div>
        <LanguageBar data={languages} />
      </div>
      <div className="flex justify-around text-sm pt-4">
        <p>Last push: {push}</p>
        <p>⭐️ {stargazers}</p>
        <p>👀 {watchers}</p>
        <p>🔱 {forks}</p>
      </div>
      <a href={url} target="_blank" rel="noreferrer noopener">
        <span className="absolute w-full h-full top-0 left-0 z-1"></span>
      </a>
    </section>
  );
}

export default Projects;
