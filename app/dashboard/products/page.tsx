'use client';
import Pagination from '@/app/ui/dashboard/pagination/pagination';
import RemoteImage from '@/app/ui/dashboard/remoteImage/RemoteImage';
import Search from '@/app/ui/dashboard/search/search';
import { createClient } from '@/utils/supabase/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import React, { Suspense, useState } from 'react';
import {
  MdAnalytics,
  MdArrowDropDownCircle,
  MdArrowForwardIos,
  MdDelete,
  MdEdit,
  MdMoreHoriz,
  MdMoreVert,
  MdRemoveRedEye,
} from 'react-icons/md';

function ProductsPage() {
  const [activeIndex, setActiveIndex] = useState('');
  const supabase = createClient();

  const {
    data: courses,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) {
        console.log('error fetching courses', error.message);
      }
      return data;
    },
  });

  async function handleDeleteCourse(id: string) {
    try {
      deleteCourse();
      setActiveIndex('');
    } catch (error) {
      console.log('error refetching', error);
    }
  }

  const {
    mutate: deleteCourse,
    isError: deleteCorseError,
    isPending: deleteCoursePending,
    isSuccess: deleteCourseSucces,
  } = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`/api/products/${id}`);
    },
  });
  return (
    <div className="bg-slate-800 rounded-md p-5 mt-5">
      <div className="flex flex-row items-center justify-between">
        <Suspense>
          <Search placeholder="search plan by id" />
        </Suspense>
        <Link href={'/dashboard/products/add'}>
          <button className="p-2 bg-slate-700 hover:bg-slate-500 cursor-pointer rounded-md text-slate-200 border-none">
            New project
          </button>
        </Link>
      </div>
      {isLoading && <div>loading ...</div>}
      {isError && <div> error loading</div>}
      {deleteCorseError && (
        <div className="toast">
          <div className="alert alert-error">
            <span>failed to delete item</span>
          </div>
        </div>
      )}
      {deleteCoursePending && (
        <progress className="progress w-56">processing delete...</progress>
      )}
      {deleteCourseSucces && (
        <div className="toast">
          <div className="alert alert-success">
            <span>course deleted</span>
          </div>
        </div>
      )}
      <table className="bg-gray-600 rounded-md table w-full mt-5 p-4  ">
        <thead>
          <tr>
            <td>Course</td>
            <td>description</td>
            <td>Status</td>
            <td>Editor</td>
            <td>Price</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(courses) &&
            courses?.map((item: any) => (
              <tr key={item?.id} className="m-5 hover  ">
                <td className="w-32">
                  <div className="flex items-center gap-3">
                    <RemoteImage
                      size={0}
                      className="h-16 w-28 object-cover rounded-md"
                      fallback={'/noproduct.jpg'}
                      bucket="course_thumbnails"
                      path={item?.thumbnail}
                      alt={''}
                    />
                  </div>
                </td>
                <td className="w-1/3">
                  <div className="flex flex-col gap-1 ">
                    <div className="flex flex-row justify-between">
                      <h3 className="text-lg">{item?.title}</h3>{' '}
                    </div>
                    <p className=" text-sm line-clamp-2">{item?.description}</p>
                  </div>
                </td>

                <td>
                  <div className=" flex flex-col gap-2">
                    <span className="">
                      {new Date(item?.created_at).toDateString()}
                    </span>
                    <span className="text-yellow-500 h-5 w-full rounded-lg self-center">
                      {item?.status}
                    </span>
                  </div>
                </td>
                <td>
                  <div className=" flex flex-col gap-2">
                    <span className="">{item?.editor}</span>
                    <span className="text-yellow-500 h-5 w-full rounded-lg self-center">
                      {item?.editor_status}
                    </span>
                  </div>
                </td>
                <td>{item.price}</td>
                <td>
                  <MdMoreVert
                    size={25}
                    onClick={() =>
                      activeIndex === item.id
                        ? setActiveIndex('')
                        : setActiveIndex(item.id)
                    }
                  />
                  {activeIndex == item.id && (
                    <div className="flex flex-col gap-2 absolute bg-slate-700">
                      <Link
                        href={{
                          pathname: `/dashboard/products/${activeIndex}`,
                        }}
                      >
                        <button
                          onClick={() => {}}
                          className="flex flex-row items-center gap-2 text-green-500 hover:bg-slate-400 hover:cursor-pointer"
                        >
                          <MdRemoveRedEye /> open
                        </button>
                      </Link>

                      <button
                        onClick={() => {}}
                        className="flex flex-row items-center gap-2 text-green-500 hover:bg-slate-400 hover:cursor-pointer"
                      >
                        <MdEdit /> edit title
                      </button>

                      <button
                        onClick={() => {}}
                        className="flex flex-row gap-2 items-center text-red-500 hover:bg-slate-400 hover:cursor-pointer"
                      >
                        <MdDelete /> delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Pagination page={0} />
    </div>
  );
}

export default ProductsPage;
