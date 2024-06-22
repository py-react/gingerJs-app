import React, {useRef,useEffect, Suspense, useState} from "react";
import {useLocation} from "react-router-dom"
import { MoonStarIcon, SunIcon, SunMoon,EllipsisVertical } from "lucide-react";
import { useTheme } from "next-themes"
import Link from "src/libs/Link";
import useNavigate from "src/libs/navigate";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const links = [
  {href:"/#features",label:"Features",children:undefined},
  {href:"https://www.gingersociety.org/",label:"About Us",children:undefined}
]

function scrollToAnchor() {
  const location = useLocation();
  const lastHash = useRef('');

  // listen to location change using useEffect with location as dependency
  // https://jasonwatmore.com/react-router-v6-listen-to-location-route-change-without-history-listen
  useEffect(() => {
    if (location.hash) {
      lastHash.current = location.hash.slice(1); // safe hash for further use after navigation
    }

    if (lastHash.current && document.getElementById(lastHash.current)) {
      setTimeout(() => {
        document
          .getElementById(lastHash.current)
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        lastHash.current = '';
      }, 100);
    }
  }, [location]);

  return null;
}

export default function Header({authStatus}) {
  const autoScroll = scrollToAnchor()
  const [open,setOpen] = useState(false)

  return (
      <header style={{top:"0px"}} className="fixed z-50 w-screen p-4 lg:p-6 bg-white shadow-md dark:bg-gray-900">
        <div className="flex items-center">
          <Link to="/" className="flex items-center justify-center" >
            <DatabaseIcon className="h-6 w-6 dark:text-white" />
            <span className="sr-only">Database Visualizer</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6 dark:text-white">
            <Link to="/#features" className="text-sm font-medium hover:underline underline-offset-4"> 
                Features
            </Link> 
            <a href="https://www.gingersociety.org/" className="text-sm font-medium hover:underline underline-offset-4"> 
                About us
            </a> 
            <Link className="text-sm font-medium hover:underline underline-offset-4"> 
                <AccountDropdown status={authStatus}/>
            </Link> 
          </nav>
        </div>
      </header>
  )
}

export function AccountDropdown({status}) {
  const navigate = useNavigate()
  return (
    <DropdownMenu >
      <div className="flex items-center justify-center !p-0">
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <div className="flex space-x-2 items-center justify-center text-sm font-medium hover:underline underline-offset-4">
           Account <EllipsisVertical size={"16px"}/>
          </div>
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ThemeIteme />
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            if (status==="authenticated") {
              return navigate("/logout")
            } else {
              return navigate(`/login`);
            }
          }}
        >
          {status === "authenticated" ? "Log Out" : "Log In"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


const ThemeIteme = ()=>{
  const { setTheme ,systemTheme } = useTheme()

  return (
    <DropdownMenuGroup>
      <DropdownMenuSub className="dark:bg-gray-900 dark:text-white">
        <DropdownMenuSubTrigger >Theme</DropdownMenuSubTrigger>
        <DropdownMenuPortal >
          <DropdownMenuSubContent >
            <DropdownMenuItem onClick={()=>setTheme("light")}>
                <SunIcon className="mr-2" />
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={()=>setTheme("dark")}>
                <MoonStarIcon className="mr-2" />
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={()=>setTheme("system")}>
            <SunMoon className="mr-2"/>
              System
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>
    </DropdownMenuGroup>
  )
}

function DatabaseIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  )
}