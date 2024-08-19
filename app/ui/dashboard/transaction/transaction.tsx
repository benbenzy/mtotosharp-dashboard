import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import React from 'react';

interface transaction {
  id: string;
  created_at: Date;
  amount: string;
  status: string;
  user_id: string;
}

function Transaction() {
  const {
    data: transactions,
    isLoading: transactionsLoading,
    isError: tranactionsError,
  } = useQuery<transaction[]>({
    queryKey: ['courses'],
    queryFn: async () => {
      const res = await axios.get('/api/transactions');
      return res.data;
    },
  });
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
          {transactions?.map((item, index) => (
            <tr key={index} className="mt-2">
              <td className="flex flex-row gap-2 p-2 items-center">
                <Image
                  height={30}
                  width={30}
                  alt=""
                  src={'/noavatar.png'}
                  className="rounded-full object-cover"
                />
                {item.user_id}
              </td>
              <td className="p-2">
                {new Date(item.created_at).toDateString()}
              </td>
              <td className="p-2">{item.amount.toLocaleString()}</td>
              <td
                className={` font-medium p-2 ${
                  item.status === 'pending'
                    ? 'text-yellow-600'
                    : item.status === 'success'
                    ? 'text-lime-600'
                    : item.status === 'reversed'
                    ? 'text-gray-400'
                    : 'text-red-600'
                }`}
              >
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
