import React from "react";
import Header from "@/components/atoms/Header";

import { Outlet } from "react-router-dom";
import {Link} from "react-router-dom"
import { ThemeProvider } from "src/libs/theme-provider"


function Layout(props) {
  
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="p-0 m-0 dark:bg-gray-800 dark:text-white">
        <Header authStatus={props.authStatus||undefined}/>
        <Outlet />
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t roun">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            &copy; 2024 GingerDbr. All rights reserved.
          </p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link href="#" className="text-xs hover:underline underline-offset-4" >
              Terms of Service
            </Link>
            <Link href="#" className="text-xs hover:underline underline-offset-4" >
              Privacy
            </Link>
          </nav>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default Layout;
