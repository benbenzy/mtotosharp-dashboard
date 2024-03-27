import React from "react";
import {
  MdAnalytics,
  MdAttachMoney,
  MdDashboard,
  MdHelpCenter,
  MdLogout,
  MdOutlineSettings,
  MdPeople,
  MdShoppingBag,
  MdSupervisedUserCircle,
  MdWork,
} from "react-icons/md";
import MenuLink from "./menuLink/menuLink";
import Image from "next/image";
import { url } from "inspector";

function Sidebar() {
  const menuItems = [
    {
      title: "Pages",
      list: [
        { title: "Dashboard", path: "/dashboard", icon: <MdDashboard /> },
        {
          title: "Users",
          path: "/dashboard/users",
          icon: <MdSupervisedUserCircle />,
        },
        {
          title: "Products",
          path: "/dashboard/products",
          icon: <MdShoppingBag />,
        },
        {
          title: "Transacations",
          path: "/dashboard/transactions",
          icon: <MdAttachMoney />,
        },
      ],
    },
    {
      title: "Analytics",
      list: [
        { title: "Revenue", path: "/dashboard/revenue", icon: <MdAnalytics /> },
        {
          title: "Reports",
          path: "/dashboard/reports",
          icon: <MdWork />,
        },
        {
          title: "Teams",
          path: "/dashboard/teams",
          icon: <MdPeople />,
        },
      ],
    },
    {
      title: "User",
      list: [
        {
          title: "Settings",
          path: "/dashboard/settings",
          icon: <MdOutlineSettings />,
        },
        {
          title: "Help",
          path: "/dashboard/help",
          icon: <MdHelpCenter />,
        },
      ],
    },
  ];
  return (
    <div className="sticky top-10">
      <div className="flex flex-row gap-5 mb-5">
        <Image
          src="/noavatar.png"
          alt=""
          width="50"
          height="50"
          className=" rounded-full object-cover"
        />

        <div className=" flex-col flex">
          <span className=" font-bold">mary john</span>
          <span className=" font-thin text-slate-100">customer support</span>
        </div>
      </div>
      <ul className=" list-none">
        {menuItems.map((cat) => {
          return (
            <li key={cat.title}>
              <span className=" text-slate-200 font-bold size-5 mt-3 mb-0">
                {cat.title}
              </span>
              {cat.list.map((item) => {
                return <MenuLink key={item.title} item={item} />;
              })}
            </li>
          );
        })}
      </ul>
      <div className="flex flex-row gap-2 cursor-pointer rounded-md items-center mt-2 mb-0 bg-none border-none w-full hover:bg-slate-300">
        <MdLogout size={24} />
        <button>logout</button>
      </div>
    </div>
  );
}

export default Sidebar;
