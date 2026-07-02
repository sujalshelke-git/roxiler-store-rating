import prisma from "../config/prisma";
import { AppError } from "../utils/AppError";
import {
  comparePassword,
  hashPassword,
} from "../utils/password";

export const getStores = async (
  userId: string,
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
    const averageRating =
      store.ratings.length === 0
        ? 0
        : store.ratings.reduce(
            (sum, item) => sum + item.rating,
            0
          ) / store.ratings.length;

    const userRating = store.ratings.find(
      (rating) => rating.userId === userId
    );

    return {
      id: store.id,
      name: store.name,
      email: store.email,
      address: store.address,
      averageRating: Number(
        averageRating.toFixed(1)
      ),
      userRating: userRating
        ? userRating.rating
        : null,
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
  const store = await prisma.store.findUnique({
    where: {
      id: storeId,
    },
  });

  if (!store) {
    throw new AppError(
      "Store not found",
      404
    );
  }

  const existingRating =
    await prisma.rating.findUnique({
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

  return prisma.rating.create({
    data: {
      rating,
      userId,
      storeId,
    },
  });
};

export const updateRating = async (
  userId: string,
  storeId: string,
  rating: number
) => {
  const existingRating =
    await prisma.rating.findUnique({
      where: {
        userId_storeId: {
          userId,
          storeId,
        },
      },
    });

  if (!existingRating) {
    throw new AppError(
      "Rating not found",
      404
    );
  }

  return prisma.rating.update({
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
};

export const updateUserPassword = async (
  userId: string,
  currentPassword: string,
  newPassword: string
) => {
  const user =
    await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

  if (!user) {
    throw new AppError(
      "User not found",
      404
    );
  }

  const isPasswordCorrect =
    await comparePassword(
      currentPassword,
      user.password
    );

  if (!isPasswordCorrect) {
    throw new AppError(
      "Current password is incorrect",
      400
    );
  }

  const hashedPassword =
    await hashPassword(newPassword);

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password: hashedPassword,
    },
  });

  return {
    message:
      "Password updated successfully",
  };
};