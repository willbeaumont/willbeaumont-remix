export function Banner({ title, children }) {
  return (
    <header className="bg-emerald-500 text-txt-pri p-2 text-xl fixed top-0 w-full z-40">
      {children}
    </header>
  );
}
