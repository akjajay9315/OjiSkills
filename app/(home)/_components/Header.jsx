// Header.js
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import { menuList } from "./SideBarNav";
import SearchBar from "./SearchBar";
import { Menu, X } from "lucide-react";

function Header() {
  const { user } = useUser();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleNavigation = (path) => {
    router.push(path);
    setDropdownOpen(false); // Close dropdown on navigation
  };

  return (
    <div className="p-5 border-b flex items-center justify-between relative lg:ml-64">
      {/* Logo for screens less than 1024px */}
      <div className="lg:hidden">
        <Image src="/logo.svg" alt="logo" width={170} height={100} />
      </div>

      {/* SearchBar for screens 1024px and larger */}
      <div className="hidden lg:block">
        <SearchBar />
      </div>

      {/* UserButton or Login button */}
      <div className="flex items-center ml-auto">
        {!user ? (
          <button onClick={() => router.push("/sign-in")} className="mr-4">
            Login
          </button>
        ) : (
          <UserButton />
        )}

        {/* Menu button for screens less than 1024px */}
        <div className="lg:hidden ml-2">
          <button onClick={handleDropdownToggle}>
            {dropdownOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {dropdownOpen && (
        <div className="absolute top-full left-0 w-full bg-white border shadow-md rounded-md z-50 lg:hidden">
          <div className="p-4">
            {menuList.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-2 p-2 rounded-md text-gray-500 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleNavigation(item.path)}
              >
                <item.icon className="group-hover:animate-bounce" />
                <h2>{item.name}</h2>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
