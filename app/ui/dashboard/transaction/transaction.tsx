import Image from "next/image";
import React from "react";

function Transaction() {
  const transactions = [
    {
      id: 1,
      amount: 2000,
      status: "success",
      date: "sun feb 22 2023",
      name: "mary johnson",
    },
    {
      id: 2,
      amount: 6000,
      status: "pending",
      date: "mon feb 23 2023",
      name: "johnson luke",
    },

    {
      id: 4,
      amount: 300,
      status: "reversed",
      date: "sun feb 22 2023",
      name: "lydiah chep",
    },
    {
      id: 5,
      amount: 900,
      status: "cancelled",
      date: "sun feb 22 2023",
      name: "kipkirui",
    },
  ];
  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <h2 className="capitalize font-medium">latest transactions</h2>
        <button className="bg-slate-500 rounded-md w-1/6 hover:bg-slate-300 hover:text-green-800 capitalize">
          see all
        </button>
      </div>
      <table className="w-full">
        <thead className="p-2">
          <tr>
            <td className="p-2">Name</td>
            <td className="p-2">date</td>
            <td className="p-2">amount</td>
            <td className="p-2">status</td>
          </tr>
        </thead>
        <tbody>
          {transactions.map((item, index) => (
            <tr key={index} className="mt-2">
              <td className="flex flex-row gap-2 p-2 items-center">
                <Image
                  height={30}
                  width={30}
                  alt=""
                  src={"/noavatar.png"}
                  className="rounded-full object-cover"
                />
                {item.name}
              </td>
              <td className="p-2">{item.date}</td>
              <td className="p-2">{item.amount.toLocaleString()}</td>
              <td
                className={` font-medium p-2 ${
                  item.status === "pending"
                    ? "text-yellow-600"
                    : item.status === "success"
                    ? "text-lime-600"
                    : item.status === "reversed"
                    ? "text-gray-400"
                    : "text-red-600"
                }`}>
                {item.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transaction;
