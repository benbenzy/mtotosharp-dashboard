'use client';
import React from 'react';
import Card from '../ui/dashboard/card/card';
import Rightbar from '../ui/dashboard/rightbar/rightbar';
import Transaction from '../ui/dashboard/transaction/transaction';
import Chart from '../ui/dashboard/chart/chart';
import { MdAnalytics, MdSupervisedUserCircle } from 'react-icons/md';

function DashBoardPage() {
  return (
    <div className=" flex flex-row gap-5 mt-5">
      <div className=" flex flex-1 flex-col gap-5 ">
        <div className="flex flex-row justify-between gap-5">
          <Card
            icon={<MdSupervisedUserCircle size={24} />}
            title="total users"
            range="+30%"
            comment="last 7 days"
            value={49000}
          />
          <Card
            icon={<MdAnalytics size={24} />}
            title="total revenue"
            range="+29%"
            comment="last 7 days"
            value={700000}
          />
          <Card
            icon={<MdSupervisedUserCircle size={24} />}
            title="total posts"
            range="-3%"
            comment="last 7 days"
            value={1000}
          />
        </div>
        <Transaction />
        <Chart />
      </div>
      <div className="flex w-1/4">
        <Rightbar />
      </div>
    </div>
  );
}

export default DashBoardPage;
