import Footer from "./Footer";
import Meta from "./Meta";
import Nav from "./Nav";

export default function Layout({ children }) {
  return (
    <>
      <Meta />
      <div className="antialiased">
        <Nav />
        <div className="container max-w-5xl mx-auto px-4 sm:px-8">
          <main>{children}</main>
          <Footer />
        </div>
      </div>
    </>
  );
}
