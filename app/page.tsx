'use client';
import Link from 'next/link';
import './ui/globals.css';
import { useAuth } from './context/authContext';
import { createClient } from '@/utils/supabase/client';
import { redirect } from 'next/navigation';

export default function Home() {
  const supabase = createClient();
  const { currentUser } = useAuth();
  if (currentUser?.group == 'ADMIN') {
    redirect('/dashboard');
  }
  const RenderHeader = () => {
    return (
      <div className="flex flex-row justify-between items-center h-16">
        <h2 className="">
          Mtoto<span className="text-red-500">Sharp</span>
          <span className="text-yellow-500"> Foundation</span>
        </h2>
        <h2>{currentUser?.group}</h2>
        <div className="flex flex-row gap-20 ">
          {currentUser ? (
            <button onClick={async () => await supabase.auth.signOut()}>
              <h2>logout</h2>
            </button>
          ) : (
            <Link
              className=" hover:bg-slate-300 hover:cursor-pointer h-5 "
              href={'/login'}
            >
              <h2>login</h2>
            </Link>
          )}
          <Link
            className=" hover:bg-slate-300 hover:cursor-pointer h-5 mr-2"
            href={'/message'}
          >
            <h2>contact us</h2>
          </Link>
        </div>
      </div>
    );
  };
  return (
    <main>
      {RenderHeader()}
      <div></div>
    </main>
  );
}
