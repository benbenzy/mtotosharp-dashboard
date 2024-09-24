import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import React from 'react';
import TransactionComponent from './transactionComponent';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';

interface transaction {
  id: string;
  created_at: Date;
  amount: string;
  status: string;
  user_id: string;
}

function Transaction() {
  const supabase = createClient();
  const { data: transactions } = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const res = await supabase.from('transactions').select('*').limit(10);
      return res.data;
    },
  });
  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <h2 className="capitalize font-medium">latest transactions</h2>
        <Link
          href={'/dashboard/transactions'}
          className="bg-slate-500 rounded-md w-1/6 hover:bg-slate-300 hover:text-green-800 capitalize"
        >
          see all
        </Link>
      </div>
      <table className="w-full table table-xs">
        <thead className="p-2">
          <tr>
            <td className="p-2">id</td>
            <td className="p-2">amount</td>
            <td className="p-2">date</td>
            <td className="p-2">status</td>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(transactions) &&
            transactions?.map((item) => (
              <TransactionComponent key={item.id} item={item} />
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transaction;
