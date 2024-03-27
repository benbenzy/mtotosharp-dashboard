import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdMore } from "react-icons/md";

function ProductsPage() {
  const products = [
    {
      id: 6,
      title: "mary ben",
      author: "mary@gmaiil.com",
      createdAt: "jun 05 2024",
      status: "published",
    },
    {
      id: 5,
      title: "mary ben",
      author: "mary@gmaiil.com",
      createdAt: "jun 05 2024",
      status: "published",
    },
    {
      id: 1,
      title: "mary ben",
      author: "mary@gmaiil.com",
      createdAt: "jun 05 2024",
      status: "pending",
    },
    {
      id: 2,
      title: "mary ben",
      author: "mary@gmaiil.com",
      createdAt: "jun 05 2024",
      status: "inreview",
    },
    {
      id: 3,
      title: "mary ben",
      author: "mary@gmaiil.com",
      createdAt: "jun 05 2024",
      status: "rejected",
    },
    {
      id: 4,
      title: "mary ben",
      author: "mary@gmaiil.com",
      createdAt: "jun 05 2024",
      status: "published",
    },
  ];
  return (
    <div className="bg-slate-800 rounded-md p-5 mt-5">
      <div className="flex flex-row items-center justify-between">
        <Search placeholder="search user by email/id" />
        <Link href={"/dashboard/products/add"}>
          <button className="p-2 bg-slate-700 hover:bg-slate-500 cursor-pointer rounded-md text-slate-200 border-none">
            New challenge
          </button>
        </Link>
      </div>
      <table className="bg-gray-600 rounded-md  w-full mt-5 p-4">
        <thead>
          <tr>
            <td className="p-2">id</td>

            <td>title</td>
            <td>author</td>
            <td>Created At</td>

            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <tr key={item.id} className="m-5">
              <td className="p-2">{item.id}</td>
              <td className="capitalize">{item.title}</td>
              <td>{item.author}</td>
              <td>{item.createdAt}</td>

              <td
                className={`${
                  item.status === "published"
                    ? "text-lime-600"
                    : item.status === "pending"
                    ? "text-gray-400"
                    : item.status === "inreview"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}>
                {item.status}
              </td>
              <td>
                <button className="cursor-pointer ">
                  <MdMore size={25} />
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

export default ProductsPage;
