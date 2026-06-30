import prisma from "../config/prisma";
import { AppError } from "../utils/AppError";

export const getStores = async (
  page: number,
  limit: number,
  search: string
) => {
  const skip = (page - 1) * limit;

  const where = search
    ? {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive" as const,
            },
          },
          {
            address: {
              contains: search,
              mode: "insensitive" as const,
            },
          },
        ],
      }
    : {};

  const stores = await prisma.store.findMany({
    where,
    skip,
    take: limit,
    include: {
      ratings: true,
    },
  });

  const formattedStores = stores.map((store) => {
    const avg =
      store.ratings.length === 0
        ? 0
        : store.ratings.reduce(
            (sum, item) => sum + item.rating,
            0
          ) / store.ratings.length;

    return {
      id: store.id,
      name: store.name,
      email: store.email,
      address: store.address,
      averageRating: Number(avg.toFixed(1)),
    };
  });

  const total = await prisma.store.count({
    where,
  });

  return {
    stores: formattedStores,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

export const addRating = async (
  userId: string,
  storeId: string,
  rating: number
) => {
  // Check store exists
  const store = await prisma.store.findUnique({
    where: {
      id: storeId,
    },
  });

  if (!store) {
    throw new AppError("Store not found", 404);
  }

  // Check if already rated
  const existingRating = await prisma.rating.findUnique({
    where: {
      userId_storeId: {
        userId,
        storeId,
      },
    },
  });

  if (existingRating) {
    throw new AppError(
      "You have already rated this store",
      400
    );
  }

  const newRating = await prisma.rating.create({
    data: {
      rating,
      userId,
      storeId,
    },
  });

  return newRating;
};

export const updateRating = async (
  userId: string,
  storeId: string,
  rating: number
) => {
  const existingRating = await prisma.rating.findUnique({
    where: {
      userId_storeId: {
        userId,
        storeId,
      },
    },
  });

  if (!existingRating) {
    throw new AppError("Rating not found", 404);
  }

  const updatedRating = await prisma.rating.update({
    where: {
      userId_storeId: {
        userId,
        storeId,
      },
    },
    data: {
      rating,
    },
  });

  return updatedRating;
};