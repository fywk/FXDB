import Link from "next/link";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="container max-w-5xl flex flex-col space-y-8 mx-auto px-4 sm:px-8">
        <section className="flex flex-col items-center py-16">
          <div className="flex flex-col space-y-6 mb-10 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Fujifilm X and GFX Database
            </h1>
            <h2 className="text-xl">
              <strong>FXDB</strong> is a database of cameras and lenses made for
              Fujifilm X and Fujifilm G systems. You can find relevant
              specifications for each product including products from
              third-party manufacturers.
            </h2>
          </div>
          <div className="flex space-x-6">
            <Link href="#">
              <a className="bg-gray-700 px-4 py-2 rounded-lg">Browse Cameras</a>
            </Link>
            <Link href="#">
              <a className="bg-gray-700 px-4 py-2 rounded-lg">Browse Lenses</a>
            </Link>
          </div>
        </section>
        <section>
          <h1 className="text-2xl font-semibold">Latest Cameras</h1>
        </section>
        <section>
          <h1 className="text-2xl font-semibold">Latest Lenses</h1>
        </section>
      </div>
    </Layout>
  );
}
