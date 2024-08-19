import { User } from '@prisma/client';
import prisma from '..';

export async function getUserChannels(userId: any) {
  try {
    const res = await prisma.channel.findMany({ where: { userId } });
    return res;
  } catch (error) {
    console.log('error getting user channels', error);
  }
}
export async function createUser({ data }: { data: User }) {
  try {
    const res = await prisma.user.create({
      data: {
        displayName: data.displayName,
        email: data.email,
        phone: data.phone,
        group: data.group,
      },
    });
    return res.id;
  } catch (error) {
    console.log('error creating user', error);
  }
}
export async function getUserById(userId: number) {
  try {
    const res = await prisma.user.findFirst({
      where: { id: userId },
      include: { wallets: true },
    });
    return res;
  } catch (error) {
    console.log('error fetching user', error);
  }
}
