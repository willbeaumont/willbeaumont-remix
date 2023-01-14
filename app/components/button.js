export function ButtonGroup({ children }) {
  return <div className="flex justify-between">{children}</div>;
}

export function Button({ value, action, href }) {
  if (action) {
    return <button onClick={() => action()}>{value}</button>;
  } else {
    return <a href={href}>{value}</a>;
  }
}

export function TextInput({ action }) {
  return (
    <form onSubmit={(e) => action(e)}>
      <label>
        <span>Enter a Github username: </span>
        <input
          className="text-gray-700"
          name="newAlias"
          type="text"
          placeholder=" stuck? try 'Lissy93'"
        />
      </label>
    </form>
  );
}
