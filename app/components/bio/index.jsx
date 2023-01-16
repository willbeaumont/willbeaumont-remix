const Bio = ({ data }) => {
  return (
    <>
      <section
        id="bio"
        className="flex flex-col md:flex-row max-w-lg md:max-w-none mx-auto"
      >
        <div className="w-full md:max-w-[300px] p-4 pt-14">
          <img
            id="head-shot"
            src={data.avatar_url}
            alt="Developer's GitHub user profile picture"
            className="rounded-xl m-auto "
          />
        </div>
        <div className="md:pt-14 my-auto">
          <h2 className="text-xl p-4 pt-0">About me</h2>
          <p className="px-4">{data.bio}</p>
        </div>
      </section>
    </>
  );
};

export default Bio;
