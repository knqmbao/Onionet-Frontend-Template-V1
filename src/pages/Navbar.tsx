"use client";

import * as React from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Sidebar as SidebarIcon,
  LogOut,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Example user data
const user = {
  name: "Onionet",
  email: "onionetNV@gmail.com",
  avatar: "/onionet.png",
};

export default function Navbar() {
  // Sidebar toggle state
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  // const location = useLocation(); // Get current page route

  // State for Date & Time
  const [currentTime, setCurrentTime] = React.useState(new Date());

  // Format Date & Time
  function formatDateTime(date: Date) {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  }

  // Update time every second
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function toggleSidebar() {
    setSidebarOpen((prev) => !prev);
  }

  return (
    <div className="w-screen h-screen flex flex-col [--header-height:theme(spacing.14)]">
      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="flex h-[--header-height] items-center gap-2 px-4 justify-between">
          {/* Left: Sidebar Toggle */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="text-white bg-transparent"
            >
              <SidebarIcon className="text-black" />
            </Button>
            <Separator orientation="vertical" className="h-4" />
          </div>

          {/* Right: Date & Time */}
          <div className="text-sm font-medium text-muted-foreground">
            {formatDateTime(currentTime)}
          </div>
        </div>
      </header>

      {/* BODY: Sidebar + Main Content */}
      <div className="relative flex-1 flex transition-all duration-300">
        {/* SIDEBAR (Moves in and out smoothly) */}
        <aside
          className={`fixed top-[--header-height] left-0 bottom-0 z-30 w-64 border-r bg-sidebar text-sidebar-foreground transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Sidebar Content */}
          <div className="flex flex-col h-full">
            {/* Branding / Logo */}
            <div className="p-2 border-b border-sidebar-border">
              <div className="flex items-center gap-2 p-2 rounded-md text-black">
                {/* Logo */}
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <LayoutDashboard className="size-5" />
                </div>
                {/* Text */}
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Onionet</span>
                  <span className="truncate text-xs">Inventory System</span>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-auto gap-2">
              <ul className="space-y-1 px-2 py-2 gap-2">
                <li>
                  <NavLink
                    to="inventory" // ✅ RELATIVE PATH
                    className={({ isActive }) =>
                      `flex items-center gap-5 p-3 my-2 rounded-lg text-sm text-black transition-colors ${
                        isActive ? "bg-black text-white pointer-events-none" : "hover:bg-sidebar-accent"
                      }`
                    }
                  >
                    <LayoutDashboard className="size-6" />
                    Inventory
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="profile" // ✅ RELATIVE PATH
                    className={({ isActive }) =>
                      `flex items-center gap-5 p-3 my-2 rounded-lg text-sm text-black transition-colors ${
                        isActive ? "bg-black text-white pointer-events-none" : "hover:bg-sidebar-accent"
                      }`
                    }
                  >
                    <User className="size-6" />
                    Profile
                  </NavLink>
                </li>


                <li>
                  <NavLink
                    to="/" // ✅ RELATIVE PATH
                    className={({ isActive }) =>
                      `flex items-center gap-5 p-3 my-2 rounded-lg text-sm text-black transition-colors ${
                        isActive ? "bg-black text-white pointer-events-none" : "hover:bg-sidebar-accent"
                      }`
                    }
                  >
                    <LogOut className="size-6" />
                    Logout
                  </NavLink>
                </li>
              </ul>
            </nav>

            {/* Footer (User Profile) */}
            <div className="p-2 border-t border-sidebar-border">
              <div className="flex items-center gap-2 p-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                <div className="text-sm leading-tight">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT (Changes when clicking Sidebar buttons) */}
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-0"}`}>
          <div className="flex flex-col gap-4 p-4 w-full h-full">
            <Outlet /> {/* ✅ This loads InventoryPage/ProfilePage inside Navbar */}
          </div>
        </main>
      </div>
    </div>
  );
}
