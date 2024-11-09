'use client';
import Pagination from '@/app/ui/dashboard/pagination/pagination';
import RemoteImage from '@/app/ui/dashboard/remoteImage/RemoteImage';
import Search from '@/app/ui/dashboard/search/search';
import { createClient } from '@/utils/supabase/client';
import {
  dataTagSymbol,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import React, { Suspense, useState } from 'react';
import {
  MdAnalytics,
  MdArrowDropDownCircle,
  MdArrowForwardIos,
  MdCheck,
  MdCheckBox,
  MdDelete,
  MdEdit,
  MdMoreHoriz,
  MdMoreVert,
  MdOutlineCheckBox,
  MdRemoveRedEye,
} from 'react-icons/md';

function ProductsPage() {
  const [activeIndex, setActiveIndex] = useState('');
  const supabase = createClient();
  const queryClient = useQueryClient();

  const {
    data: courses,
    isLoading,
    isError: loadingError,
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
  const {
    mutate: handleLiveStatus,
    isError: handleLiveCorseError,
    isPending: handleLiveCoursePending,
    isSuccess: handleLiveCourseSucces,
  } = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: boolean }) => {
      const updateStatus = !status;
      const { data, error } = await supabase
        .from('courses')
        .update({ is_live: updateStatus })
        .eq('id', id);
      if (error) {
        console.log('failed to update status', error.message);
      }
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['courses'] }),
  });
  const {
    mutate: handlePublishStatus,
    isError: publishCourseError,
    isPending: publishCoursePending,
    isSuccess: publishCourseSucces,
  } = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: boolean }) => {
      const updateStatus = !status;
      const { data, error } = await supabase
        .from('courses')
        .update({ published: updateStatus })
        .eq('id', id);
      if (error) {
        console.log('failed to update status', error.message);
      }
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['courses'] }),
  });
  const isloading =
    handleLiveCoursePending || publishCoursePending || deleteCoursePending;
  const isError =
    publishCourseError || handleLiveCorseError || deleteCorseError;
  const isSuccess =
    publishCourseSucces || handleLiveCourseSucces || deleteCourseSucces;
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
      {loadingError && <div> error loading</div>}
      {isError && (
        <div className="toast">
          <div className="alert alert-error">
            <span>failed to delete item</span>
          </div>
        </div>
      )}
      {isloading && (
        <progress className="progress w-56">processing ...</progress>
      )}
      {isSuccess && (
        <div className="toast">
          <div className="alert alert-success">
            <span>success</span>
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
                      {item?.published ? 'published' : 'not published'}
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
                <td>
                  <div className=" flex flex-col gap-2">
                    <span className="">
                      {item?.is_live ? 'live' : 'offline'}
                    </span>
                    <span className="text-yellow-500 h-5 w-full rounded-lg self-center">
                      {item.price}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="dropdown dropdown-hover dropdown-left">
                    <MdMoreVert size={25} tabIndex={0} role="button" />

                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                    >
                      <Link
                        href={{
                          pathname: `/dashboard/products/${item.id}`,
                        }}
                      >
                        <button
                          onClick={() => {}}
                          className="flex flex-row items-center gap-2 text-slate-300 hover:bg-slate-400 hover:cursor-pointer"
                        >
                          <MdRemoveRedEye /> open
                        </button>
                      </Link>

                      <button
                        onClick={() => {
                          handleLiveStatus({
                            id: item.id,
                            status: item?.is_live,
                          });
                        }}
                        className="flex flex-row gap-2 items-center text-slate-300 hover:bg-slate-400 hover:cursor-pointer"
                      >
                        {item?.is_live ? <MdCheckBox /> : <MdOutlineCheckBox />}
                        {item?.is_live ? 'Go Offline' : 'Go Live'}
                      </button>
                      <button
                        onClick={() => {
                          handlePublishStatus({
                            id: item.id,
                            status: item.published,
                          });
                        }}
                        className="flex flex-row gap-2 items-center text-slate-300 hover:bg-slate-400 hover:cursor-pointer"
                      >
                        {item?.published ? <MdCheck /> : <MdCheckBox />}
                        {item?.published ? 'revoke publish' : 'publish'}
                      </button>

                      <button
                        onClick={() => {}}
                        className="flex flex-row gap-2 items-center text-red-500 hover:bg-slate-400 hover:cursor-pointer"
                      >
                        <MdDelete /> delete
                      </button>
                    </ul>
                  </div>
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
