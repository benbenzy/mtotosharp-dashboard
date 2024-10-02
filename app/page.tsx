'use client';
import './ui/globals.css';
import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { SupabaseClient } from '@supabase/supabase-js';
import cn from 'classnames';
import Button from '@/components/ui/Button';
import { useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import RemoteImage from './ui/dashboard/remoteImage/RemoteImage';
import { Carousel } from 'react-responsive-carousel';
import { Tables } from '@/database.types';

export default function Home() {
  const supabase: SupabaseClient = createClient();
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: courses } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const { data, error } = await supabase.from('courses').select('*');
      return data;
    },
  });

  return (
    <main>
      <Navbar />
      <div className="mt-12 space-y-0 sm:mt-16 flex flex-wrap justify-center gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
        <div className="carousel w-1/2 self-center flex">
          {Array.isArray(courses) &&
            courses.map((item, _index) => {
              return (
                <div key={item.id} className="carousel-item w-full">
                  {courses[currentIndex] && (
                    <RemoteImage
                      size={200}
                      className="w-full"
                      fallback={'/noproduct.jpg'}
                      bucket="course_thumbnails"
                      path={item?.thumbnail}
                      alt={''}
                    />
                  )}

                  <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <button
                      onClick={() =>
                        currentIndex > 0 && setCurrentIndex(currentIndex - 1)
                      }
                      className="btn btn-circle"
                    >
                      ❮
                    </button>
                    <button
                      onClick={() =>
                        courses.length - 1 != currentIndex &&
                        setCurrentIndex(currentIndex + 1)
                      }
                      className="btn btn-circle"
                    >
                      ❯
                    </button>
                  </div>
                </div>
              );
            })}
          <div className="flex w-full justify-center gap-2 py-2">
            {Array.isArray(courses) &&
              courses.map((item, _index) => {
                return (
                  <a href="#item1" className="btn btn-xs">
                    1
                  </a>
                );
              })}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
