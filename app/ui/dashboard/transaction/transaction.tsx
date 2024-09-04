import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import React from 'react';
import TransactionComponent from './transactionComponent';

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
    queryKey: ['transactions'],
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
            <td className="p-2">phone</td>
            <td className="p-2">status</td>
            <td className="p-2">amount</td>
            <td className="p-2">date</td>
            <td className="p-2">action</td>
          </tr>
        </thead>
        <tbody>
          {transactions?.map((item, index) => (
            <TransactionComponent item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transaction;
