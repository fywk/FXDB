import Footer from "./Footer";
import Meta from "./Meta";
import Nav from "./Nav";

export default function Layout({ children }) {
  return (
    <>
      <Meta />
      <div className="flex flex-col min-h-screen antialiased">
        <Nav />
        <main className="grow flex flex-col w-full max-w-5xl mx-auto px-4 sm:px-8">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
