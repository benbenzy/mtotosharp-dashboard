'use client';
import React from 'react';
import {
  MdAnalytics,
  MdAttachMoney,
  MdDashboard,
  MdHelpCenter,
  MdLogout,
  MdOutlineSettings,
  MdShoppingBag,
  MdSupervisedUserCircle,
  MdWork,
} from 'react-icons/md';
import MenuLink from './menuLink/menuLink';
import Image from 'next/image';
import { useAuth } from '@/app/context/authContext';
import RemoteImage from '../remoteImage/RemoteImage';

function Sidebar() {
  const auth = useAuth();
  const menuItems = [
    {
      title: 'Pages',
      list: [
        { title: 'Dashboard', path: '/dashboard', icon: <MdDashboard /> },
        {
          title: 'Users',
          path: '/dashboard/users',
          icon: <MdSupervisedUserCircle />,
        },
        {
          title: 'courses',
          path: '/dashboard/products',
          icon: <MdShoppingBag />,
        },
        {
          title: 'Transacations',
          path: '/dashboard/transactions',
          icon: <MdAttachMoney />,
        },
      ],
    },
    {
      title: 'Analytics',
      list: [
        { title: 'Revenue', path: '/dashboard/revenue', icon: <MdAnalytics /> },
        {
          title: 'Reports',
          path: '/dashboard/reports',
          icon: <MdWork />,
        },
        {
          title: 'Orders',
          path: '/dashboard/orders',
          icon: <MdShoppingBag />,
        },
      ],
    },
    {
      title: 'Company',
      list: [
        {
          title: 'Teams',
          path: '/dashboard/teams',
          icon: <MdOutlineSettings />,
        },
        {
          title: 'Managers',
          path: '/dashboard/managers',
          icon: <MdHelpCenter />,
        },
        {
          title: 'Employees',
          path: '/dashboard/employees',
          icon: <MdHelpCenter />,
        },
        {
          title: 'Editors',
          path: '/dashboard/editors',
          icon: <MdOutlineSettings />,
        },
      ],
    },
    {
      title: 'Departments',
      list: [
        {
          title: 'Finance',
          path: '/dashboard/teams',
          icon: <MdOutlineSettings />,
        },
        {
          title: 'Reaserch',
          path: '/dashboard/managers',
          icon: <MdHelpCenter />,
        },
        {
          title: 'Reviews',
          path: '/dashboard/employees',
          icon: <MdHelpCenter />,
        },
      ],
    },
    {
      title: 'User',
      list: [
        {
          title: 'Settings',
          path: '/dashboard/settings',
          icon: <MdOutlineSettings />,
        },
        {
          title: 'Help',
          path: '/dashboard/help',
          icon: <MdHelpCenter />,
        },
      ],
    },
  ];
  return (
    <div className="sticky top-10">
      <div className="flex flex-row w-full gap-2">
        <div>
          {auth?.currentUser?.avatar_url ? (
            <RemoteImage
              size={50}
              path={auth?.currentUser?.avatar_url}
              alt="/noavatar.png"
              bucket="avatars"
              fallback="/noavatar.png"
              className="rounded-full h-14 w-14"
              uploadImage={undefined}
              cancelled={false}
            />
          ) : (
            <Image
              src="/noavatar.png"
              alt=""
              width="50"
              height="50"
              className=" rounded-full"
            />
          )}
        </div>

        <div className=" flex-col flex">
          <span className=" font-bold capitalize">
            {auth?.currentUser?.full_name?.split(' ')[0] ??
              auth?.currentUser?.email?.split('@')[0]}
          </span>
          <span className=" font-thin text-slate-100">
            {auth?.currentUser?.group}
          </span>
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
