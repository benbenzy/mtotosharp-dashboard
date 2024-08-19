'use client';
import Pagination from '@/app/ui/dashboard/pagination/pagination';
import RemoteImage from '@/app/ui/dashboard/remoteImage/RemoteImage';
import Search from '@/app/ui/dashboard/search/search';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import React, { Suspense, useState } from 'react';
import {
  MdAnalytics,
  MdArrowDownward,
  MdArrowDropDownCircle,
  MdArrowForward,
  MdArrowForwardIos,
  MdCheckBox,
  MdCheckCircleOutline,
  MdDelete,
  MdDoDisturb,
  MdEdit,
  MdIncompleteCircle,
  MdMore,
  MdMoreHoriz,
  MdMoreVert,
  MdMoveDown,
  MdNote,
  MdNoteAdd,
  MdRemoveRedEye,
} from 'react-icons/md';

function ProductsPage() {
  const [activeIndex, setActiveIndex] = useState('');

  const {
    data: courses,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const res = await axios.get('/api/courses');
      return res.data;
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
      <table className="bg-gray-600 rounded-md  w-full mt-5 p-4 border-collapse table-auto border-spacing-2">
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
          {courses?.map((item: any) => (
            <tr key={item?.id} className="m-5 hover  border border-slate-100">
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
                {' '}
                <div className="flex flex-col gap-1 ">
                  <div className="flex flex-row justify-between">
                    <h3 className="text-lg">{item?.title}</h3>{' '}
                    {activeIndex === item.id ? (
                      <MdArrowForwardIos
                        size={24}
                        className=" hover:bg-gray-300 rounded-full"
                        onClick={() =>
                          activeIndex === item.id
                            ? setActiveIndex('')
                            : setActiveIndex(item?.id)
                        }
                      />
                    ) : (
                      <MdArrowDropDownCircle
                        size={24}
                        className=" hover:bg-gray-300 rounded-full"
                        onClick={() =>
                          activeIndex === item.id
                            ? setActiveIndex('')
                            : setActiveIndex(item?.id)
                        }
                      />
                    )}
                  </div>

                  <p className=" text-sm line-clamp-2">{item?.description}</p>

                  {activeIndex === item.id && (
                    <div className="flex flex-row justify-between items-center">
                      <Link
                        href={`/dashboard/products/${item.id}`}
                        className="hover:bg-slate-400 rounded-full h-10 w-10"
                      >
                        <MdEdit size={24} className="self-center" />
                      </Link>
                      <Link
                        href={`/dashboard/products/${item.id}`}
                        className="hover:bg-slate-400 rounded-full  h-10 w-10"
                      >
                        <MdAnalytics size={24} />
                      </Link>
                      <Link
                        href={`/dashboard/products/${item.id}`}
                        className="hover:bg-slate-400 rounded-full  h-10 w-10"
                      >
                        <MdRemoveRedEye size={24} />
                      </Link>
                      <button className="hover:bg-slate-400 rounded-full  h-10 w-10">
                        <MdDelete
                          size={24}
                          onClick={() => {
                            let text = 'confirm delete';
                            if (confirm(text) == true) {
                              handleDeleteCourse(item.id);
                            } else {
                              text = 'You canceled!';
                            }
                          }}
                        />
                      </button>
                      <button className="hover:bg-slate-400 rounded-full h-10 w-10">
                        <MdMoreHoriz size={24} />
                      </button>
                    </div>
                  )}
                </div>
              </td>

              <td>
                <div className=" flex flex-col gap-2">
                  <span className="">
                    {new Date(item?.created_at).toDateString()}
                  </span>
                  <span className="text-yellow-500 h-5 w-full rounded-lg self-center">
                    {item.status}
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
