'use client';
import Pagination from '@/app/ui/dashboard/pagination/pagination';
import RemoteImage from '@/app/ui/dashboard/remoteImage/RemoteImage';
import Search from '@/app/ui/dashboard/search/search';
import { User } from '@prisma/client';
import { UserIdentity } from '@supabase/supabase-js';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import {
  MdDelete,
  MdMessage,
  MdMore,
  MdMoreHoriz,
  MdPanoramaFishEye,
  MdRemoveRedEye,
} from 'react-icons/md';

interface props {
  searchParams: {
    q: string;
    page: Number;
  };
}
export type supabaseUser = {
  name: string;
  image: string;
  id: string;
  phone: string;
  email: string;
  created_at: Date;
  last_sign_in_at: Date;
  role: string;
  user_metadata: { firstName: string; lastName: string };
};
function UsersPage({ searchParams }: props) {
  const q = searchParams?.q || '';
  const page = searchParams.page;
  const [selectedUser, setSelectedUser] = useState('');
  const handleDeleteUser = () => {
    deleteUser();
  };
  const {
    mutate: deleteUser,
    isPending: deleteProgress,
    isError: deleteError,
    isSuccess: deleteSuccess,
  } = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/users/${selectedUser}`);
    },
  });
  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery<supabaseUser[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axios.get('/api/users');
      return res.data;
    },
  });
  function formatDate(dat: Date) {
    const date = new Date(dat);

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const dayName = days[date.getDay()];
    const monthName = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day} ${monthName} ${year} ${hours}:${minutes}`;
  }

  return (
    <div className="bg-slate-800 rounded-md p-5 mt-5">
      <div className="flex flex-row items-center justify-between">
        <Search placeholder="search user by email/id" />
        <Link href={'/dashboard/users/add'}>
          <button className="p-2 bg-slate-700 hover:bg-slate-500 cursor-pointer rounded-md text-slate-200 border-none">
            Add user
          </button>
        </Link>
      </div>
      {deleteError && (
        <div className="toast">
          <div className="alert alert-error">
            <span>failed to delete item</span>
          </div>
        </div>
      )}
      {deleteProgress && (
        <progress className="progress w-56 text-slate-100">
          deleting ...
        </progress>
      )}
      {deleteSuccess && (
        <div className="toast">
          <div className="alert alert-success">
            <span>user deleted</span>
          </div>
        </div>
      )}
      <table className="bg-gray-600 rounded-md  w-full mt-5 ">
        <thead>
          <tr>
            <td>Name</td>

            <td>Email</td>
            <td>Created At</td>
            <td>Last login</td>
            <td>Phone</td>
            <td>Role</td>
            <td>Action</td>
          </tr>
        </thead>

        <tbody>
          {users?.map((item) => (
            <tr key={item?.id} className="mt-2">
              <td className=" font-extralight capitalize">
                {item?.user_metadata?.firstName} {item?.user_metadata?.lastName}
              </td>

              <td className="">{item?.email}</td>
              <td className="">{formatDate(item?.created_at)}</td>
              <td className="">{formatDate(item?.last_sign_in_at)}</td>

              <td className="">{item?.phone}</td>
              <td className="">{item?.role}</td>
              <td>
                <MdMoreHoriz
                  className=""
                  size={24}
                  onClick={() =>
                    selectedUser === item.id
                      ? setSelectedUser('')
                      : setSelectedUser(item.id)
                  }
                />
                {selectedUser === item.id && (
                  <div className="flex flex-col gap-2 absolute bg-slate-800 rounded-md right-20 text-slate-200">
                    <Link
                      href={{
                        pathname: `/dashboard/users/${item.id}`,
                        query: { id: item.id },
                      }}
                    >
                      <button className="flex flex-row gap-1 items-center  hover:bg-slate-600">
                        <MdRemoveRedEye /> view
                      </button>
                    </Link>

                    <button className="flex flex-row gap-1 items-center  hover:bg-slate-600">
                      <MdMessage /> message
                    </button>
                    <button className="flex flex-row gap-1 items-center  hover:bg-slate-600">
                      <MdPanoramaFishEye /> disable
                    </button>
                    <button
                      onClick={handleDeleteUser}
                      className="flex flex-row gap-1 items-center hover:bg-slate-600"
                    >
                      <MdDelete /> delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isLoading && (
        <div className="text-slate-100 font-bold m-5">loading users....</div>
      )}
      {isError && (
        <div className="text-slate-100 font-bold m-5">
          failed to get users{error.message}
        </div>
      )}
      <Pagination page={0} />
    </div>
  );
}

export default UsersPage;