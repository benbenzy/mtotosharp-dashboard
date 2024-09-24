'use client';
import './ui/globals.css';
import { useAuth } from './context/authContext';
import { createClient } from '@/utils/supabase/client';

import { useQuery } from '@tanstack/react-query';
import { SupabaseClient } from '@supabase/supabase-js';
import cn from 'classnames';
import Button from '@/components/ui/Button';
import { useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export default function Home() {
  const supabase: SupabaseClient = createClient();
  const [priceIdLoading, setPriceLoading] = useState('');
  const { data: courses } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const { data, error } = await supabase.from('courses').select('*');
      return data;
    },
  });
  const subscription = false;
  function handleStripeCheckout(price: any): void {
    throw new Error('Function not implemented.');
  }

  return (
    <main>
      <Navbar />
      <div className="mt-12 space-y-0 sm:mt-16 flex flex-wrap justify-center gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
        {Array.isArray(courses) &&
          courses.map((product) => {
            return (
              <div
                key={product.id}
                className={cn(
                  'flex flex-col rounded-lg shadow-sm divide-y divide-zinc-600 bg-zinc-900',
                  {
                    'border border-pink-500': subscription
                      ? product.name === 'sub'
                      : product.name === 'Freelancer',
                  },
                  'flex-1', // This makes the flex item grow to fill the space
                  'basis-1/3', // Assuming you want each card to take up roughly a third of the container's width
                  'max-w-xs' // Sets a maximum width to the cards to prevent them from getting too large
                )}
              >
                <div className="p-6">
                  <h2 className="text-2xl font-semibold leading-6 text-white">
                    {product?.title}
                  </h2>
                  <p className="mt-4 text-zinc-300 line-clamp-2">
                    {product?.description}
                  </p>
                  <p className="mt-8">
                    <span className="text-5xl font-extrabold white">
                      {product?.price}
                    </span>
                    <span className="text-base font-medium text-zinc-100">
                      /{8}
                    </span>
                  </p>
                  <Button
                    variant="slim"
                    type="button"
                    loading={priceIdLoading === '100'}
                    onClick={() => handleStripeCheckout(product?.price)}
                    className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900"
                  >
                    {subscription ? 'Manage' : 'Subscribe'}
                  </Button>
                </div>
              </div>
            );
          })}
      </div>

      <Footer />
    </main>
  );
}
