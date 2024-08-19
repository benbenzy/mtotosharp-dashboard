'use client';
import { ActionButton } from '@/app/ui/dashboard/ActionButton/ActionButton';
import RemoteImage from '@/app/ui/dashboard/remoteImage/RemoteImage';
import { createClient } from '@/utils/supabase/client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import React, { FC, useEffect, useRef, useState } from 'react';
import {
  MdAddCircle,
  MdBorderColor,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdCreateNewFolder,
  MdDelete,
  MdMoreVert,
  MdRemoveRedEye,
} from 'react-icons/md';

interface CourseDetailsProps {
  params: {
    courseId: string;
  };
}

const CourseDeatilsPage: FC<CourseDetailsProps> = ({ params }) => {
  const supabase = createClient();
  const [image, setImage] = useState<File | null>(null);
  const [course, setCourse] = useState();
  const [onEdit, setOnEdit] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState('');
  const [uploading, setUploading] = useState(false);
  const imageRef = useRef();

  const { data } = useQuery({
    queryKey: ['course', params?.courseId],
    queryFn: async () => {
      const res = await axios.get(`/api/courses/${params.courseId}`);
      return res.data;
    },
  });
  useEffect(() => {
    setCourse(data);
  }, [data]);

  const uploadImage = async () => {
    setUploading(true);
    const fileExt = image?.name?.split('.').pop();
    const filePath = `${course?.id}-${Math.random()}.${fileExt}`;
    const { data, error } = await supabase.storage
      .from('course_thumbnails')
      .upload(filePath, image);
    if (error) {
      setUploading(false);
      console.log('image could not be uploaded', error);
      setImage(null);
    }
    if (data?.path) {
      const { data: courseUpdate, error: courseUpdateError } = await supabase
        .from('courses')
        .update({ thumbnail: data.path })
        .eq('id', course?.id);
      if (courseUpdateError) {
        console.log('could not update course', courseUpdateError);
        setUploading(false);
        setImage(null);
      }
      console.log('updated', courseUpdate);
      setUploading(false);
      setImage(null);
    }
  };
  const {
    mutate: updateCourse,
    isError: updateError,
    isPending: updating,
    isSuccess: updatesuccess,
  } = useMutation({
    mutationFn: async (course) => {
      await axios.patch(`/api/courses/${params.courseId}`, course);
    },
  });

  const handleUpdate = () => {
    updateCourse(course);
  };
  function handleDelete() {
    deleteChapter();
  }
  const {
    mutate: deleteChapter,
    isError: deleteChapterError,
    isPending: deleting,
    isSuccess: deletesuccess,
  } = useMutation({
    mutationFn: async () => {
      await axios.delete(
        `/api/courses/${params.courseId}/chapters/${selectedChapter}`
      );
    },
  });
  const { mutate: uploadChapter, isPending: uploadingChapter } = useMutation({
    mutationFn: async ({ title }: { title: string }) => {
      try {
        await axios.post(`/api/courses/${params?.courseId}/chapters`, {
          title,
          courseId: params.courseId,
        });
        console.log('uploaded chapter');
      } catch (error) {
        throw new Error('failed to upload chapter');
      }
    },
  });
  function createChapter() {
    let title = prompt('Enter chapter title');
    if (title == null || title == '') {
      throw new Error('user cancelled process');
    } else {
      uploadChapter({ title });
    }
  }
  const queryClient = useQueryClient();
  const actions = [
    {
      name: 'view',
      icon: <MdRemoveRedEye />,
      pathname: `/dashboard/products/${params.courseId}/newChapter`,
      query: {
        requestType: 'view',
        courseId: params.courseId,
        chapterId: selectedChapter,
      },
    },
    {
      name: 'add quiz',
      icon: <MdAddCircle />,
      pathname: `/dashboard/products/${params.courseId}/newChapter`,
      query: {
        requestType: 'create',
        courseId: params.courseId,
        chapterId: selectedChapter,
      },
    },
    {
      name: 'add subtopic',
      icon: <MdCreateNewFolder />,
      pathname: `/dashboard/products/${params.courseId}/newChapter`,
      query: {
        requestType: 'create',
        courseId: params.courseId,
        chapterId: selectedChapter,
      },
    },
    {
      name: 'edit',
      icon: <MdBorderColor />,
      pathname: `/dashboard/products/${params.courseId}/newChapter`,
      query: {
        requestType: 'edit',
        courseId: params.courseId,
        chapterId: selectedChapter,
      },
    },
  ];
  return (
    <div>
      {updateError && (
        <div className="toast">
          <div className="alert alert-error">
            <span>failed to update </span>
          </div>
        </div>
      )}
      {updatesuccess && (
        <div className="toast">
          <div className="alert alert-success">
            <span>updated </span>
          </div>
        </div>
      )}
      {updating && (
        <div className="toast">
          <div className="alert alert-success">
            <span>suubmitting update... </span>
          </div>
        </div>
      )}
      {uploadingChapter && (
        <div className="toast">
          <div className="alert alert-success">
            <span>uploading chapter... </span>
          </div>
        </div>
      )}
      {deleteChapterError && (
        <div className="toast">
          <div className="alert alert-error">
            <span>failed to delete </span>
          </div>
        </div>
      )}
      {deletesuccess && (
        <div className="toast">
          <div className="alert alert-success">
            <span>deleted</span>
          </div>
        </div>
      )}
      {deleting && (
        <div className="toast">
          <div className="alert alert-success">
            <span>deleting ... </span>
          </div>
        </div>
      )}
      <div className="flex flex-row justify-between">
        <div className="w-1/4 ">
          <RemoteImage
            path={`${course?.thumbnail}`}
            fallback="/noproduct.jpg"
            size={150}
            className={'h-full w-full'}
            bucket={'course_thumbnails'}
            alt={''}
            onClick={() => imageRef?.current?.click()}
            uploadImage={image}
            cancelled={!image}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setImage(e.target.files[0])}
            ref={imageRef}
          />
          {image && (
            <div>
              {uploading ? (
                <div>uploading ...</div>
              ) : (
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => uploadImage()}
                    className="bg-green-500 "
                  >
                    upload
                  </button>
                  <button
                    onClick={() => setImage(null)}
                    className="bg-slate-400"
                  >
                    cancel
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4 flex-1">
          <div className="flex flex-col">
            <label htmlFor="">Title</label>
            <input
              type="text"
              className="text-slate-900 p-2 rounded-l dark:bg-slate-700  dark:text-slate-100"
              value={course?.title}
              onChange={(e) => {
                setOnEdit(true),
                  setCourse({ ...course, title: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Description</label>
            <textarea
              className="text-slate-900 p-2 rounded-lg  dark:bg-slate-700  dark:text-slate-100"
              name="description"
              id=""
              value={course?.description}
              onChange={(e) => {
                setOnEdit(true),
                  setCourse({ ...course, description: e.target.value });
              }}
              cols={10}
              rows={5}
            ></textarea>
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Audience</label>
            <input
              type="text"
              className="text-slate-900 p-2 rounded-lg  dark:bg-slate-700  dark:text-slate-100"
              onChange={(e) => {
                setOnEdit(true),
                  setCourse({ ...course, audience: e.target.value });
              }}
              value={course?.audience}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Duration</label>
            <input
              type="text"
              className="text-slate-900 p-2 rounded-lg  dark:bg-slate-700  dark:text-slate-100"
              onChange={(e) => {
                setOnEdit(true),
                  setCourse({ ...course, duration: e.target.value });
              }}
              value={course?.duration}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Price</label>
            <input
              type="text"
              className="text-slate-900 p-2 rounded-lg  dark:bg-slate-700  dark:text-slate-100"
              onChange={(e) => {
                setOnEdit(true),
                  setCourse({ ...course, price: e.target.value });
              }}
              value={course?.price}
            />
          </div>
        </div>
      </div>

      {onEdit && (
        <button
          onClick={handleUpdate}
          className="w-full bg-blue-300 p-2 m-5 rounded-md"
        >
          update
        </button>
      )}
      <div className="flex flex-row justify-between m-5">
        <div className=" font-bold uppercase underline">chapters</div>

        <button onClick={() => createChapter()} className="btn btn-neutral">
          New Chapter
        </button>
      </div>
      <table className="w-full">
        <thead>
          <tr>
            <td>title</td> <td>createdAt</td> <td>reviewed</td>
            <td>completed</td> <td>actions</td>
          </tr>
        </thead>
        <tbody>
          {course?.chapters?.map((item, index) => (
            <tr key={item.id}>
              <td>
                <div>{item?.title}</div>
              </td>
              <td>
                <div>{new Date(item?.created_at).toDateString()}</div>
              </td>
              <td>
                <div>
                  {item?.published ? (
                    <MdCheckBox />
                  ) : (
                    <MdCheckBoxOutlineBlank />
                  )}
                </div>
              </td>

              <td>
                <div>{item?.published ? 'reviwed' : 'complete'}</div>
              </td>
              <td>
                <button
                  onClick={() => {
                    selectedChapter == item.id
                      ? setSelectedChapter('')
                      : setSelectedChapter(item.id);
                  }}
                >
                  <MdMoreVert />
                </button>
                {selectedChapter == item.id && (
                  <div className="flex flex-col gap-1 absolute bg-slate-700">
                    {actions.map((item, index) => {
                      return (
                        <ActionButton
                          key={item.name}
                          pathname={item.pathname}
                          icon={item.icon}
                          query={item.query}
                          name={item.name}
                        />
                      );
                    })}
                    <button
                      onClick={() => {
                        let text = 'confirm delete';
                        if (confirm(text) == true) {
                          handleDelete();
                        } else {
                          text = 'You canceled!';
                        }
                      }}
                      className="flex flex-row items-center text-red-500 hover:bg-slate-400 hover:cursor-pointer"
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
    </div>
  );
};

export default CourseDeatilsPage;
