import Meta from "./Meta";
import Nav from "./Nav";

export default function Layout({ children }) {
  return (
    <>
      <Meta />
      <Nav />
      <main>{children}</main>
    </>
  );
}
