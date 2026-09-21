import Link from "next/link";
import Page from "@/components/utility/Page";

function Page404() {
  return (
    <Page
      currentPage="404"
      meta={{
        desc: "That page is missing. Head back home to see my work.",
        noindex: true,
      }}
    >
      <div className="flex min-h-[60vh] w-full flex-col items-center justify-center py-20 text-center">
        <h1 className="text-6xl font-mono font-bold text-white sm:text-7xl">{`{ error: 404 }`}</h1>
        <p className="mt-6 text-fun-gray sm:text-lg">Sorry, looks like that page is missing.</p>
        <Link
          href="/"
          className="mt-8 rounded-full border border-fun-accent bg-fun-navy-dark px-6 py-2.5 text-base text-fun-accent transition-colors hover:bg-fun-accent hover:text-fun-navy-darkest"
        >
          Return Home
        </Link>
      </div>
    </Page>
  );
}

export default Page404;
