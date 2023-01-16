import { Form, Link } from "@remix-run/react";

const sections = ["Projects"];

const Bio = ({ data, updateAlias, handleClick }) => {
  return (
    <>
      <header className="bg-emerald-500 text-txt-pri p-2 text-xl fixed top-0 w-full z-40">
        <div className="flex justify-between">
          {updateAlias ? (
            <Form method="post">
              <label>
                <span>Enter a Github username: </span>
                <input
                  className="text-gray-700"
                  name="newAlias"
                  type="text"
                  placeholder=" stuck? try 'Lissy93'"
                />
              </label>
            </Form>
          ) : (
            <button onClick={() => handleClick()}>{data.name}</button>
          )}
          {sections.map((section) => (
            <Link to={`#${section}`} key={section}>
              {section}
            </Link>
          ))}
        </div>
      </header>
      <section
        id="bio"
        className="flex flex-col md:flex-row max-w-lg md:max-w-none mx-auto"
      >
        <div className="w-full md:w-1/2 p-4 pt-14">
          <img
            id="head-shot"
            src={data.avatar_url}
            alt="will"
            className="rounded-xl m-auto"
          />
        </div>
        <div className="md:pt-14">
          <h2 className="text-xl p-4 pt-0 md:py-4">About me</h2>
          <p className="px-4">{data.bio}</p>
        </div>
      </section>
    </>
  );
};

export default Bio;