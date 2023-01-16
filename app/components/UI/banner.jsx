import { Form, Link, useTransition } from "@remix-run/react";
import { useState } from "react";

const Banner = ({
  userName = "Default User",
  navSections = [{ title: "Default Section", key: "default-section" }],
  navigation = true
}) => {
  const transition = useTransition();
  const [showForm, setShowForm] = useState(false);
  const toggleShow = () => {
    setShowForm((old) => !old);
  };

  return (
    <div className="bg-bg-tri text-txt-pri p-2 text-xl fixed top-0 w-full z-40">
      <div className="flex justify-between">
        {transition.state !== "idle" ? (
          <div>
            Retrieving {transition.submission.formData.get("newAlias")}...
          </div>
        ) : showForm ? (
          <Form method="post" onSubmit={() => toggleShow()}>
            <label>
              <span>Enter a Github username: </span>
              <input
                className="text-gray-700 px-2 rounded-sm"
                name="newAlias"
                type="text"
                placeholder=" stuck? try 'sdras'"
              />
            </label>
          </Form>
        ) : (
          <button onClick={() => toggleShow()}>{userName}</button>
        )}
        <nav>
          {navigation && navSections.map((section) => (
            <Link to={`#${section.key}`} key={section.key}>
              {section.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Banner;
