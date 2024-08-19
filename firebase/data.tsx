import { NextResponse } from 'next/server';
import { db } from './server';
import { Timestamp } from '@google-cloud/firestore';
import prisma from '@/prisma';
export const getCourses = async () => {
  try {
    const courses = await db
      ?.collection('courses')
      .orderBy('createdAt', 'desc')
      .get();
    const snapshot = courses?.docs.map((item) => {
      return { id: item.id, ...item.data() };
    });

    return snapshot;
  } catch (error) {
    console.log('error fetching courses', error);
  }
};
export const findCourseById = async (id: string) => {
  try {
    const ref = await db?.collection('courses').doc(id).get();
    return ref?.data();
  } catch (error) {
    console.log('error getting course', error);
  }
};

export const createCourse = async ({
  title,
  price,
  category,
  recommendedFor,
  description,
  durationInDays,
}: any) => {
  try {
    // const ref = await db?.collection("courses").add({
    //   title,
    //   createdAt: Date.now(),
    //   recommendedFor,
    //   thumbnail: "",
    //   price,
    //   category,
    //   description,
    //   durationInDays,
    //   completed: false,
    //   published: false,
    // });
    const ref = await prisma.course.create({
      data: {
        title,
        recommendedFor,
        thumbnail: '',
        price,
        categoryID: category,
        description,
        durationInDays,
      },
    });
    return ref?.id;
  } catch (error) {
    console.log('failed to create course', error);
  }
};
export const createChapter = async ({
  id,
  title,
  content,
  createdAt,
  editor,
  completed,
  published,
}: {
  id: string;
  title: string;
  content: string;
  createdAt: Timestamp;
  editor: string;
  completed: boolean;
  published: boolean;
}) => {
  try {
    const chapter = await db
      ?.collection('courses')
      .doc(id)
      .collection('chapters')
      .add({
        title,
        content,
        createdAt,
        editor,
        completed,
        published,
      });
    return chapter;
  } catch (error) {
    console.log('failed to create course chapter', error);
  }
};
export async function getCourseChapters(courseId: string) {
  try {
    const chapters = await db
      ?.collection('courses')
      .doc(courseId)
      .collection('chapters')
      .get();
    return NextResponse.json(chapters, { status: 200 });
  } catch (error) {
    console.log('failed to get chapters', error);
    return NextResponse.json('failed to fetch chapters', { status: 500 });
  }
}
