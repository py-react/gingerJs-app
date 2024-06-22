// import useNavigate from "@/libs/navigate";
import React from "react";
import Link from "@/libs/Link"

const keyFeatureDetails = [
  {
    heading:"Visualize Your Database Structure",
    subHeading:"Our intuitive interface allows you to easily visualize your database schema, including tables, columns, and relationships.",
    demoLink:"/dbEditor",
    signUpLink:"/login?next_url=/dbEditor"
  },
  {
    heading:"Explore Table Relationships",
    subHeading:"Understand how your tables are connected and the relationships between them.",
    demoLink:"/dbEditor",
    signUpLink:"/login?next_url=/dbEditor"
  }
]

export default function Home({authenticated}) {
  // const navigate =  useNavigate()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Visualize and Explore Your Database
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Our powerful database visualization tool helps you understand your data structure, explore
                    relationships, and generate comprehensive documentation.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    to="/dbEditor"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    
                  >
                    Try Demo
                  </Link>
                  {authenticated !== "authenticated" && (
                    <Link
                      to="/login?next_url=/dbEditor"
                      className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                      
                    >
                      Sign Up
                    </Link>
                  )}
                </div>
              </div>
              <img
                src="https://generated.vusercontent.net/placeholder.svg"
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-700">
          <div id="features"  className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Powerful Database Visualization</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our database visualization tool helps you understand your data structure, explore relationships, and
                  generate comprehensive documentation.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <img
                src="https://generated.vusercontent.net/placeholder.svg"
                width="550"
                height="310"
                alt="Image"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Visualize Database Schemas</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Easily visualize your database schema, including tables, columns, and relationships.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Explore Table Relationships</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Understand the relationships between your tables and how they connect.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        {keyFeatureDetails.map((featureDetails,index) => (
          <section key={featureDetails.heading} className={`w-full py-12 md:py-24 lg:py-32 ${index % 2 == 0?"":"bg-gray-100 dark:bg-gray-700"}`}>
            <div className={`container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10`}>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  {featureDetails.heading}
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  {featureDetails.subHeading}
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
                <Link
                  to={featureDetails.demoLink}
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                >
                  Try Demo
                </Link>
                {authenticated !== "authenticated" && (
                  <Link
                    to={featureDetails.signUpLink}
                    className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                  >
                    Sign Up
                  </Link>
                )}
              </div>
            </div>
          </section>
        ))}
        
      </main>
    </main>
  );
}
