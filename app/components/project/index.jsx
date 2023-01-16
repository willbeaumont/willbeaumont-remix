import LanguageBar from "~/components/project/languageBar";

function emojiElements(classValue, innerText) {
  const emojis = ["⭐️", "👀", "🔱"];
  return emojis.map((emoji, i) => (
    <p className={`${classValue}`} key={emoji}>{`${emoji} ${innerText[i]}`}</p>
  ));
}

function Projects({ data, navId }) {
  const cardData = data.filter((repo) => !repo.fork);
  return (
    <section id={navId} className="max-w-lg md:max-w-none mx-auto">
      <h2 className="text-xl p-4">Projects</h2>
      <div className="grid justify-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 m-auto">
        {cardData.map((card) => (
          <Card data={card} key={card.name} />
        ))}
      </div>
      <div className="flex justify-center text-sm pt-4">
        {emojiElements("px-4", ["= starred", "= watchers", "= forks"])}
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
      className="relative bg-bg-sec text-txt-sec m-2 p-4 rounded-md sm:max-w-lg cursor-pointer"
    >
      <h3 className="text-lg pb-2 text-slate-300">{name}</h3>
      <p className="text-sm min-h-[2.5rem]">{description}</p>
      <div className="pb-6">
        <LanguageBar data={languages} />
      </div>
      <div className="absolute bottom-0 w-11/12 flex justify-around text-sm py-4">
        <p>Last push: {push}</p>
        {emojiElements("", [stargazers, watchers, forks])}
      </div>
      <a href={url} target="_blank" rel="noreferrer noopener">
        <span className="absolute w-full h-full top-0 left-0 z-1"></span>
      </a>
    </section>
  );
}

export default Projects;
