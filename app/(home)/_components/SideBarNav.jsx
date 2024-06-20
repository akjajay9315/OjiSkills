"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Search, Layout, Mail, Trophy } from "lucide-react";

function SideBarNav() {
  const router = useRouter();
  const pathname = usePathname();
  const menuList = [
    { id: 1, name: "Browse", icon: Search, path: "/browse" },
    { id: 2, name: "Dashboard", icon: Layout, path: "/dashboard" },
    { id: 3, name: "Contests", icon: Trophy, path: "/contests" },
    { id: 4, name: "Blogs", icon: Mail, path: "/blogs" },
  ];

  const getActiveIndex = () => {
    const currentPath = pathname;
    const activeItem = menuList.findIndex((item) => item.path === currentPath);
    return activeItem !== -1 ? activeItem : 0;
  };

  const [activeIndex, setActiveIndex] = useState(getActiveIndex());

  useEffect(() => {
    setActiveIndex(getActiveIndex());
  }, [pathname]);

  const handleNavigation = (index, path) => {
    setActiveIndex(index);
    router.push(path);
  };

  return (
    <div className="h-full bg-white border-r flex flex-col overflow-y-auto shadow-md">
      <div className="p-5 border-b z-50">
        <Image src="/logo.svg" alt="logo" width={170} height={100} />
      </div>
      <div className="flex flex-col">
        {menuList.map((item, index) => (
          <div
            key={item.id}
            className={`flex gap-2 items-center p-4 px-6 text-gray-500 hover:bg-gray-200 cursor-pointer ${
              activeIndex === index ? "bg-green-100 text-red-800" : ""
            }`}
            onClick={() => handleNavigation(index, item.path)}
          >
            <item.icon />
            <h2>{item.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideBarNav;
