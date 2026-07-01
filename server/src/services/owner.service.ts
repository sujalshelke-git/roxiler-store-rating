import prisma from "../config/prisma";
import { AppError } from "../utils/AppError";

export const getOwnerDashboard = async (
  ownerId: string
) => {
  const store = await prisma.store.findUnique({
    where: {
      ownerId,
    },
    include: {
      ratings: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });

  if (!store) {
    throw new AppError("Store not found", 404);
  }

  const averageRating =
    store.ratings.length === 0
      ? 0
      : store.ratings.reduce(
          (sum, rating) => sum + rating.rating,
          0
        ) / store.ratings.length;

  return {
    store: {
      id: store.id,
      name: store.name,
      email: store.email,
      address: store.address,
    },
    averageRating: Number(averageRating.toFixed(1)),
    totalRatings: store.ratings.length,
    ratings: store.ratings.map((rating) => ({
      id: rating.id,
      rating: rating.rating,
      user: rating.user,
      createdAt: rating.createdAt,
    })),
  };
};