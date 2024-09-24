'use client';
import Link from 'next/link';
import { SignOut } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { usePathname, useRouter } from 'next/navigation';
import { getRedirectMethod } from '@/utils/auth-helpers/settings';
import s from './Navbar.module.css';

interface NavlinksProps {
  user?: any;
}

export default function Navlinks({ user }: NavlinksProps) {
  const router = getRedirectMethod() === 'client' ? useRouter() : null;

  return (
    <div className="relative flex flex-row justify-between py-4 align-center items-center md:py-6">
      <Link href="/" aria-label="Logo">
        <div className="flex flex-row rounded-full items-center p-2 ">
          <h2 className="font-extrabold text-zinc-300">Mtoto</h2>
          <h2 className="font-extrabold text-red-600 ">Sharp</h2>
          <h2 className="font-extrabold text-yellow-600 "> Foundation</h2>
        </div>
      </Link>

      <div className="flex justify-end space-x-8">
        <Link href="/message" className={s.link}>
          contact us
        </Link>
        {user && (
          <form onSubmit={(e) => handleRequest(e, SignOut, router)}>
            <input type="hidden" name="pathName" value={usePathname()} />
            <button type="submit" className={s.link}>
              Sign out
            </button>
          </form>
        )}
        {!user && (
          <Link href="/login" className={s.link}>
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
