import prisma from "../config/prisma";

export const getDashboardData = async () => {
  const totalUsers = await prisma.user.count();

  const totalStores = await prisma.store.count();

  const totalRatings = await prisma.rating.count();

  return {
    totalUsers,
    totalStores,
    totalRatings,
  };
};