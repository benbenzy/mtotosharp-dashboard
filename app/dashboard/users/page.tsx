import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdMore } from "react-icons/md";

function UsersPage() {
  const users = [
    {
      id: 1,
      name: "mary ben",
      email: "mary@gmaiil.com",
      createdAt: "jun 05 2024",
      role: "admin",
      status: "active",
    },
    {
      id: 2,
      name: "ben mwangi",
      email: "mwangi@gmaiil.com",
      createdAt: "jun 05 2024",
      role: "author",
      status: "active",
    },
    {
      id: 3,
      name: "ian kigo",
      email: "ian@gmaiil.com",
      createdAt: "jun 05 2024",
      role: "author",
      status: "active",
    },
    {
      id: 4,
      name: "samwel muluba",
      email: "samwel@gmaiil.com",
      createdAt: "jun 05 2024",
      role: "editor",
      status: "disabled",
    },
    {
      id: 5,
      name: "snti welli",
      email: "welli@gmaiil.com",
      createdAt: "jun 05 2024",
      role: "editor",
      status: "closed",
    },
    {
      id: 6,
      name: "random name",
      email: "random@gmaiil.com",
      createdAt: "jun 05 2024",
      role: "admin",
      status: "active",
    },
    {
      id: 7,
      name: "sammy kim",
      email: "sammy@gmaiil.com",
      createdAt: "jun 05 2024",
      role: "author",
      status: "active",
    },
    {
      id: 8,
      name: "jandell imma",
      email: "imma@gmaiil.com",
      createdAt: "jun 05 2024",
      role: "general",
      status: "dormant",
    },
  ];
  return (
    <div className="bg-slate-800 rounded-md p-5 mt-5">
      <div className="flex flex-row items-center justify-between">
        <Search placeholder="search user by email/id" />
        <Link href={"/dashboard/users/add"}>
          <button className="p-2 bg-slate-700 hover:bg-slate-500 cursor-pointer rounded-md text-slate-200 border-none">
            Add user
          </button>
        </Link>
      </div>
      <table className="bg-gray-600 rounded-md  w-full mt-5">
        <thead>
          <tr>
            <td></td>
            <td>Name</td>
            <td>Email</td>
            <td>Created At</td>
            <td>Role</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {users.map((item, index) => (
            <tr key={item.id} className="">
              <td className="p-2">
                <Image
                  className="rounded-full object-cover"
                  src={"/noavatar.png"}
                  alt=""
                  width={40}
                  height={40}
                />
              </td>
              <td className="capitalize">{item.name}</td>

              <td>{item.email}</td>
              <td>{item.createdAt}</td>
              <td>{item.role}</td>
              <td
                className={`${
                  item.status === "active"
                    ? "text-lime-600"
                    : item.status === "disabled"
                    ? "text-gray-400"
                    : item.status === "dormant"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}>
                {item.status}
              </td>
              <td className="gap-2">
                <Link href={"/dashboard/users/test"}>
                  <button className="cursor-pointer p-1 mr-2 bg-green-600 rounded-md w-2/5">
                    view
                  </button>
                </Link>
                <button className="cursor-pointer p-1 bg-slate-400 rounded-md w-2/5 ">
                  message
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination page={0} />
    </div>
  );
}

export default UsersPage;
