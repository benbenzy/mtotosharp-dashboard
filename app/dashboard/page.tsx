'use client';
import React from 'react';
import Card from '../ui/dashboard/card/card';
import Transaction from '../ui/dashboard/transaction/transaction';
import Chart from '../ui/dashboard/chart/chart';
import { MdAnalytics, MdSupervisedUserCircle } from 'react-icons/md';
import { useAuth } from '../context/authContext';
import { redirect } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/utils/supabase/client';

function DashBoardPage() {
  const supabase = createClient();
  const { currentUser: user } = useAuth();
  if (user?.group != 'ADMIN') {
    return redirect('/');
  }

  const today = new Date();
  const lastWeekStart = new Date(today);
  lastWeekStart.setDate(today.getDate() - 14);
  const lastWeekEnd = new Date(today);
  lastWeekEnd.setDate(today.getDate() - 7);
  const currentWeekStart = new Date(today);
  currentWeekStart.setDate(today.getDate() - 7);

  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { count } = await supabase
        .from('profiles')
        .select('*', { count: 'exact' });
      return count;
    },
  });
  const { data: totalRevenue } = useQuery({
    queryKey: ['revenue'],
    queryFn: async () => {
      const { data } = await supabase
        .from('transactions')
        .select('*')
        .eq('status', 'success');

      let totalAmount = 0;
      if (data) {
        for (let i = 0; i < data?.length; i++) {
          totalAmount += Number(data[i]?.amount);
        }
      }
      return totalAmount;
    },
  });
  const { data: totalPosts } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const { count } = await supabase
        .from('courses')
        .select('*', { count: 'exact' });
      return count;
    },
  });
  const { data: totalEnrollment } = useQuery({
    queryKey: ['enrollments'],
    queryFn: async () => {
      const { count } = await supabase
        .from('students')
        .select('*', { count: 'exact' });
      return count;
    },
  });
  const { data: lastWeekPosts } = useQuery({
    queryKey: ['lastWeekPosts'],
    queryFn: async () => {
      const { count } = await supabase
        .from('courses')
        .select('*', { count: 'exact' })
        .gte('created_at', lastWeekStart.toISOString())
        .lt('created_at', lastWeekEnd.toISOString());
      return count;
    },
  });
  const { data: currentWeekPosts } = useQuery({
    queryKey: ['currentWeekPosts'],
    queryFn: async () => {
      const { count } = await supabase
        .from('courses')
        .select('*', { count: 'exact' })
        .gte('created_at', currentWeekStart.toISOString())
        .lt('created_at', today.toISOString());

      return count;
    },
  });
  const { data: lastWeekUsers } = useQuery({
    queryKey: ['lastWeekUsers'],
    queryFn: async () => {
      const { count } = await supabase
        .from('profiles')
        .select('*', { count: 'exact' })
        .gte('created_at', lastWeekStart.toISOString())
        .lt('created_at', lastWeekEnd.toISOString());
      return count;
    },
  });
  const { data: currentWeekUsers } = useQuery({
    queryKey: ['currentWeekUsers'],
    queryFn: async () => {
      const { count } = await supabase
        .from('profiles')
        .select('*', { count: 'exact' })
        .gte('created_at', currentWeekStart.toISOString())
        .lt('created_at', today.toISOString());

      return count;
    },
  });
  const { data: lastWeekStudents } = useQuery({
    queryKey: ['lastWeekStudents'],
    queryFn: async () => {
      const { count } = await supabase
        .from('students')
        .select('*', { count: 'exact' })
        .gte('created_at', lastWeekStart.toISOString())
        .lt('created_at', lastWeekEnd.toISOString());
      return count;
    },
  });
  const { data: currentWeekStudents } = useQuery({
    queryKey: ['currentWeekStudents'],
    queryFn: async () => {
      const { count } = await supabase
        .from('students')
        .select('*', { count: 'exact' })
        .gte('created_at', currentWeekStart.toISOString())
        .lt('created_at', today.toISOString());

      return count;
    },
  });
  const { data: currentWeekRevenue } = useQuery({
    queryKey: ['currentWeekRevenue'],
    queryFn: async () => {
      const { data } = await supabase
        .from('transactons')
        .select('*')
        .eq('status', 'success')
        .gte('created_at', currentWeekStart.toISOString())
        .lt('created_at', today.toISOString());
      return data;
    },
  });

  const { data: lastWeekRevenue } = useQuery({
    queryKey: ['lastWeekRevenue'],
    queryFn: async () => {
      const { data } = await supabase
        .from('transactons')
        .select('*')
        .eq('status', 'success')
        .gte('created_at', lastWeekStart.toISOString())
        .lt('created_at', lastWeekEnd.toISOString());
      return data;
    },
  });
  const totalLastWeek = () => {
    let totalAmount = 0;
    if (lastWeekRevenue) {
      for (let i = 0; i < lastWeekRevenue?.length; i++) {
        totalAmount += Number(lastWeekRevenue[i]?.amount);
      }
    }
    return totalAmount;
  };
  const totalThisWeek = () => {
    let totalAmount = 0;
    if (currentWeekRevenue) {
      for (let i = 0; i < currentWeekRevenue?.length; i++) {
        totalAmount += Number(currentWeekRevenue[i]?.amount);
      }
    }
    return totalAmount;
  };

  function calculatePercentageChange(oldValue: any, newValue: any) {
    if (oldValue === 0) return 0; // handle case where old value is 0
    return ((Number(newValue) - Number(oldValue)) / Number(oldValue)) * 100;
  }
  return (
    <div className=" flex flex-row gap-5 mt-5">
      <div className=" flex flex-1 flex-col gap-5 ">
        <div className="flex flex-row justify-between gap-5">
          <Card
            icon={<MdSupervisedUserCircle size={24} />}
            title="users"
            range={`${calculatePercentageChange(
              lastWeekUsers,
              currentWeekUsers
            )}%`}
            comment="last 7 days"
            value={data ?? ''}
          />
          <Card
            icon={<MdSupervisedUserCircle size={24} />}
            title="Enrollment"
            range={`${calculatePercentageChange(
              lastWeekStudents,
              currentWeekStudents
            )}%`}
            comment="last 30 days"
            value={totalEnrollment ?? 0}
          />
          <Card
            icon={<MdAnalytics size={24} />}
            title="revenue"
            range={`${calculatePercentageChange(
              totalLastWeek(),
              totalThisWeek()
            )}%`}
            comment="last 30 days"
            value={totalRevenue ?? 0}
          />
          <Card
            icon={<MdSupervisedUserCircle size={24} />}
            title="Courses"
            range={`${calculatePercentageChange(
              lastWeekPosts,
              currentWeekPosts
            )}%`}
            comment="last 7 days"
            value={totalPosts ?? 0}
          />
        </div>
        <Transaction />
        <Chart />
      </div>
    </div>
  );
}

export default DashBoardPage;
