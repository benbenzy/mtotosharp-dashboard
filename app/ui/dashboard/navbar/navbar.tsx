"use client";
import { usePathname } from "next/navigation";
import React from "react";
import {
  MdNotifications,
  MdOutlineChat,
  MdPublic,
  MdSearch,
} from "react-icons/md";

function Navbar() {
  const pathname = usePathname();
  return (
    <div className=" bg-slate-800 rounded-md  items-center flex flex-row justify-between p-5">
      <div className=" text-slate-300 capitalize font-mono">
        {pathname.split("/").pop()}
      </div>
      <div className="flex flex-row gap-5 items-center">
        <div className="flex flex-row gap-2 items-center p-2 rounded-md bg-slate-700">
          <MdSearch size={20} />{" "}
          <input
            type="text"
            placeholder="search"
            className=" border-none bg-transparent text-slate-950"
          />
        </div>
        <div className="flex flex-row gap-1">
          <MdOutlineChat size={20} />
          <MdNotifications size={20} />
          <MdPublic size={20} />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
