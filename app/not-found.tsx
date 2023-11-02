import Link from "next/link";

export default function NotFound() {
  return (
    <main className="lg:mf-grid mb-12 flex flex-col gap-8 p-4 pt-36 lg:mb-32 xl:mb-80 lg:pt-64">
      <div className="flex flex-col gap-4 lg:col-span-5 lg:col-start-3">
        <h1 className="text-5xl lg:text-6xl font-bold uppercase text-gray-400">
          404
        </h1>
        <h2 className="text-lg mt-2">
          Sorry, we can&apos;t seem to find this page
        </h2>
      </div>
      <div className="lg:col-span-4">
        <h3 className="text-lg md:text-xl font-bold">
          Here are some helpful links instead:
        </h3>
        <div className="mt-8 flex flex-col gap-2 font-medium  text-red-500 lg:text-lg lg:leading-8">
          <Link title="Homepage" href="/">
            Home
          </Link>
          <Link title="Popular Movies" href="/popular">
            Popular Movies
          </Link>
          <Link title="Upcoming Movies" href="/upcoming">
            Upcoming Movies
          </Link>
        </div>
      </div>
    </main>
  );
}
