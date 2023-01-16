import { Octokit } from "octokit";
import moment from "moment";

const noGitAuth = new Octokit();
const gitAuth = new Octokit({ auth: `${process.env.GIT_TOKEN}` });

/*
"GET /users/{user}" - bio data
*/

export const gh = async (path, params) => {
  const res = await gitAuth.request(path, params);
  // TODO: handle if noAuth runs out of requests
  // <section className="w-screen h-screen text-2xl text-center flex">
  //   <div className="m-auto">
  //     Oops! Github rate limit exceeded, comeback {rateRefresh}
  //   </div>
  // </section>;
  return res;
};

export const getBio = async (userId) => {
  const res = await gh("GET /users/{user}", { user: userId });
  if (res.status === 404) {
    // bad username
    return {
      error: `Not found: ${userId}`,
      user: userId,
    };
  }

  const data = res.data;
  return {
    name: data.name,
    avatar_url: data.avatar_url,
    bio: data.bio,
  };
};

export const getRepos = async (userId) => {
  const res = await gh("GET /users/{user}/repos", {
    user: userId,
    sort: "pushed",
    per_page: 10,
  });
  const data = res.data;

  let dataWithLanguage = [];
  for (const idx in data) {
    const project = data[idx];
    const languageDetail = await getRepoLanguages(userId, project.name);
    dataWithLanguage.push({
      name: project.name,
      description: project.description,
      language: project.language,
      push: moment(project.pushed_at).format("l"),
      stargazers: project.stargazers_count,
      watchers: project.watchers_count,
      forks: project.forks_count,
      url: project.html_url,
      languages: languageDetail,
    });
  }

  return dataWithLanguage;
};

const getRepoLanguages = async (userId, repoName) => {
  const res = await gh("GET /repos/{user}/{repo}/languages", {
    user: userId,
    repo: repoName,
  });

  if (res.status !== 200) {
    console.error(
      `Bad repo language call for user: ${userId}, repo: ${repoName}`
    );
    return null;
  }

  const total = Object.values(res.data).reduce((a, b) => a + b, 0);
  const languageData = [];
  for (const [key, value] of Object.entries(res.data)) {
    languageData.push({
      name: `${key} ${((value * 100) / total).toFixed(1).toString()}%`,
      value: value,
    });
  }

  return languageData;
};
