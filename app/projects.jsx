import LanguageBar from "./languageBar";

function Projects({ data }) {
  const cardData = data.filter((repo) => !repo.fork);
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
