'use client';
import { createClient } from '@/utils/supabase/client';
import s from './Navbar.module.css';
import Navlinks from './Navlinks';
import { useQuery } from '@tanstack/react-query';

export default function Navbar() {
  const supabase = createClient();
  const { data: user } = useQuery({
    queryKey: ['client'],
    queryFn: async () => {
      const { data } = await supabase.auth.getUser();
      return data.user;
    },
  });

  return (
    <nav className={s.root}>
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="max-w-6xl px-6 mx-auto">
        <Navlinks user={user} />
      </div>
    </nav>
  );
}
