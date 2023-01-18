import Banner from "~/components/UI/banner";

const Layout = ({ children, banner = true, ...props }) => {
  return (
    <div className={`relative`}>
      <header>
        <Banner {...props} />
      </header>
      <main className="pb-20">{children}</main>
      <footer
        className={`absolute bottom-0 w-full p-4 flex justify-center items-center`}
      >
        Will Beaumont &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default Layout;
