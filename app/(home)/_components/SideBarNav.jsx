// SideBarNav.js
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Search, Layout, Mail, Trophy, Menu, X } from "lucide-react";

export const menuList = [
  { id: 1, name: "Browse", icon: Search, path: "/browse" },
  { id: 2, name: "Dashboard", icon: Layout, path: "/dashboard" },
  { id: 3, name: "Contests", icon: Trophy, path: "/contests" },
  { id: 4, name: "Blogs", icon: Mail, path: "/blogs" },
];

function SideBarNav() {
  const router = useRouter();
  const pathname = usePathname();

  const getActiveIndex = () => {
    const currentPath = pathname;
    const activeItem = menuList.findIndex((item) => item.path === currentPath);
    return activeItem !== -1 ? activeItem : 0;
  };

  const [activeIndex, setActiveIndex] = useState(getActiveIndex());
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setActiveIndex(getActiveIndex());
  }, [pathname]);

  const handleNavigation = (index, path) => {
    setActiveIndex(index);
    router.push(path);
    setDropdownOpen(false); // Close dropdown on navigation
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="hidden lg:flex flex-col h-screen bg-white border-r shadow-md ">
      <div className="p-5 border-b">
        <Image src="/logo.svg" alt="logo" width={159} height={100} />
      </div>
      <div className="flex flex-col mt-4">
        {menuList.map((item, index) => (
          <div
            key={item.id}
            className={`group flex gap-2 items-center p-4 px-6 mr-2 ml-2 mt-2 rounded-md text-gray-500 hover:bg-gray-200 cursor-pointer ${
              activeIndex === index ? "bg-green-200 text-red-800" : ""
            }`}
            onClick={() => handleNavigation(index, item.path)}
          >
            <item.icon className="group-hover:animate-bounce" />
            <h2>{item.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideBarNav;
