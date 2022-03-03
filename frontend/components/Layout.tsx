import Footer from "./Footer";
import Meta from "./Meta";
import Navbar from "./nav/Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Meta />
      <div className="flex min-h-screen flex-col antialiased">
        <Navbar />
        <main
          className="mx-auto flex w-full max-w-6xl grow flex-col px-5 sm:px-8"
          id="content"
        >
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
