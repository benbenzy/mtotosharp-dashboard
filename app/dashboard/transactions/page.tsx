'use client';
import Search from '@/app/ui/dashboard/search/search';
import Link from 'next/link';
import React, { Suspense, useState } from 'react';
import { MdDelete, MdMore, MdRemoveRedEye } from 'react-icons/md';

function TransactionsPage() {
  const [selectedItem, setSelectedItem] = useState('');
  const transactions = [
    {
      id: '1',
      code: 'abcde',
      createdAt: 'mon 19 june 2023',
      phone: '0797766669',
      name: 'joyce',
      amount: '300',
    },
    {
      id: '2',
      code: 'abcde',
      createdAt: 'mon 19 june 2023',
      phone: '0797766669',
      name: 'joyce',
      amount: '300',
    },
    {
      id: '3',
      code: 'abcde',
      createdAt: 'mon 19 june 2023',
      phone: '0797766669',
      name: 'joyce',
      amount: '300',
    },
    {
      id: '4',
      code: 'abcde',
      createdAt: 'mon 19 june 2023',
      phone: '0797766669',
      name: 'joyce',
      amount: '300',
    },
    {
      id: '5',
      code: 'abcde',
      createdAt: 'mon 19 june 2023',
      phone: '0797766669',
      name: 'joyce',
      amount: '300',
    },
  ];
  async function handleDeleteTransaction() {}
  return (
    <div>
      <div className="flex flex-row items-center justify-between mt-2">
        <Suspense>
          <Search placeholder="enter transaction code" />
        </Suspense>
        <Link href={'/dashboard/users/add'}>
          <button className="p-2 bg-slate-700 hover:bg-slate-500 cursor-pointer rounded-md text-slate-200 border-none">
            Add transaction
          </button>
        </Link>
      </div>
      <table className="bg-gray-600 rounded-md  w-full mt-5">
        <thead>
          <tr>
            <td>code</td>
            <td>amount</td>
            <td>Name</td>

            <td>Created At</td>

            <td>Phone</td>

            <td>Action</td>
          </tr>
        </thead>

        <tbody>
          {transactions?.map((item) => (
            <tr key={item?.id} className="">
              <td className="">{item?.code}</td>

              <td className=" font-extralight">{item?.amount}</td>
              <td className="">{item?.name}</td>

              <td className="">
                {new Date(item?.createdAt).toLocaleDateString()}
              </td>
              <td className="">{item?.phone}</td>

              <td>
                <MdMore
                  className=""
                  size={24}
                  onClick={() =>
                    selectedItem === item.id
                      ? setSelectedItem('')
                      : setSelectedItem(item.id)
                  }
                />
                {selectedItem === item.id && (
                  <div className="flex flex-col gap-2 absolute bg-slate-800 rounded-md right-20 text-slate-200">
                    <button
                      onClick={handleDeleteTransaction}
                      className="flex flex-row gap-1 items-center hover:bg-slate-600"
                    >
                      <MdDelete /> delete
                    </button>
                    <Link
                      href={{
                        pathname: `/dashboard/users/`,
                        query: { id: item.id },
                      }}
                    >
                      <button className="flex flex-row gap-1 items-center  hover:bg-slate-600">
                        <MdRemoveRedEye /> view
                      </button>
                    </Link>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionsPage;
