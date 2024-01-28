import { validate } from "../validation/validation.js";
import {
  createCarValidation,
  getCarValidation,
  searchCarValidation,
  updateCarValidation,
} from "../validation/car-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const create = async (user, request) => {
  const car = validate(createCarValidation, request);
  car.username = user.username;

  return prismaClient.car.create({
    data: car,
    select: {
      id: true,
      merek: true,
      model: true,
      tahun_produksi: true,
      warna: true,
      bahan_bakar: true,
      kilometer_tempuh: true,
    },
  });
};

const get = async (user, carId) => {
  carId = validate(getCarValidation, carId);

  const car = await prismaClient.car.findFirst({
    where: {
      username: user.username,
      id: carId,
    },
    select: {
      id: true,
      merek: true,
      model: true,
      tahun_produksi: true,
      warna: true,
      bahan_bakar: true,
      kilometer_tempuh: true,
    },
  });

  if (!car) {
    throw new ResponseError(404, "car is not found");
  }

  return car;
};

const update = async (user, request) => {
  const car = validate(updateCarValidation, request);

  const totalCarInDatabase = await prismaClient.car.count({
    where: {
      username: user.username,
      id: car.id,
    },
  });

  if (totalCarInDatabase !== 1) {
    throw new ResponseError(404, "car is not found");
  }

  return prismaClient.car.update({
    where: {
      id: car.id,
    },
    data: {
      merek: car.merek,
      model: car.model,
      tahun_produksi: car.tahun_produksi,
      warna: car.warna,
      bahan_bakar: car.bahan_bakar,
      kilometer_tempuh: car.kilometer_tempuh,
    },
    select: {
      id: true,
      merek: true,
      model: true,
      tahun_produksi: true,
      warna: true,
      bahan_bakar: true,
      kilometer_tempuh: true,
    },
  });
};

const remove = async (user, carId) => {
  carId = validate(getCarValidation, carId);

  const totalInDatabase = await prismaClient.car.count({
    where: {
      username: user.username,
      id: carId,
    },
  });

  if (totalInDatabase !== 1) {
    throw new ResponseError(404, "car is not found");
  }

  return prismaClient.car.delete({
    where: {
      id: carId,
    },
  });
};

const search = async (user, request) => {
  request = validate(searchCarValidation, request);

  // 1 ((page - 1) * size) = 0
  // 2 ((page - 1) * size) = 10
  const skip = (request.page - 1) * request.size;

  const filters = [];

  filters.push({
    username: user.username,
  });

  if (request.merek) {
    filters.push({
      merek: {
        contains: request.merek,
      },
    });
  }
  if (request.model) {
    filters.push({
      model: {
        contains: request.model,
      },
    });
  }
  if (request.tahun_produksi) {
    filters.push({
      tahun_produksi: {
        contains: request.tahun_produksi,
      },
    });
  }
  if (request.warna) {
    filters.push({
      warna: {
        contains: request.warna,
      },
    });
  }
  if (request.bahan_bakar) {
    filters.push({
      bahan_bakar: {
        contains: request.bahan_bakar,
      },
    });
  }
  if (request.kilometer_tempuh) {
    filters.push({
      kilometer_tempuh: {
        contains: request.kilometer_tempuh,
      },
    });
  }

  const cars = await prismaClient.car.findMany({
    where: {
      AND: filters,
    },
    take: request.size,
    skip: skip,
  });

  const totalItems = await prismaClient.car.count({
    where: {
      AND: filters,
    },
  });

  return {
    data: cars,
    paging: {
      page: request.page,
      total_item: totalItems,
      total_page: Math.ceil(totalItems / request.size),
    },
  };
};

export default {
  create,
  get,
  update,
  remove,
  search,
};
