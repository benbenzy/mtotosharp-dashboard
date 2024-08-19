import { Course } from '@prisma/client';
import prisma from '..';

export async function createCourse({
  title,
  description,
  recommendedFor,
  categoryId,
  thumbnail,
  price,
  durationInDays,
  channelId,
}: Course) {
  try {
    const res = await prisma.course.create({
      data: {
        title,
        description,
        recommendedFor,
        categoryId,
        thumbnail,
        price,
        durationInDays,
        channelId,
      },
    });
    return res?.id;
  } catch (error) {
    console.log('error creating course', error);
  }
}
export async function updateCourse({ course }: { course: Course }) {
  try {
    const res = await prisma.course.update({
      where: { id: course.id },
      data: { title: course.title, description: course.description },
    });
    return res;
  } catch (error) {
    console.log('error updating course', error);
  }
}
export async function updateCourseThumbnail({
  courseId,
  thumbnail,
}: {
  courseId: number;
  thumbnail: string;
}) {
  try {
    const res = await prisma.course.update({
      where: { id: courseId },
      data: { thumbnail: thumbnail },
    });
    return res.id;
  } catch (error) {
    console.log('error updating course thumbanil', error);
  }
}
