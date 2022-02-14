import Footer from "./Footer";
import Meta from "./Meta";
import Nav from "./Nav";

export default function Layout({ children }) {
  return (
    <>
      <Meta />
      <div className="flex min-h-screen flex-col antialiased">
        <Nav />
        <main
          className="mx-auto flex w-full max-w-6xl grow flex-col px-4 sm:px-8"
          id="content"
        >
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
