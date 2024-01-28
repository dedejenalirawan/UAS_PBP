import { prismaClient } from "../src/application/database.js";
import bcrypt from "bcrypt";

export const removeTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      username: "test",
    },
  });
};

export const createTestUser = async () => {
  await prismaClient.user.create({
    data: {
      username: "test",
      password: await bcrypt.hash("rahasia", 10),
      name: "test",
      token: "test",
    },
  });
};

export const getTestUser = async () => {
  return prismaClient.user.findUnique({
    where: {
      username: "test",
    },
  });
};

export const removeAllTestCars = async () => {
  await prismaClient.car.deleteMany({
    where: {
      username: "test",
    },
  });
};

export const createTestContact = async () => {
  await prismaClient.car.create({
    data: {
      merek: "toyota",
      model: "avanza",
      tahun_produksi: "2023",
      warna: "putih",
      bahan_bakar: "bensin",
      kilometer_tempuh: "12000",
    },
  });
};

export const createManyTestCars = async () => {
  for (let i = 0; i < 15; i++) {
    await prismaClient.car.create({
      data: {
        merek: `test`,
        model: `test ${i}`,
        tahun_produksi: `test ${i}`,
        warna: `test${i}`,
        bahan_bakar: `bensin${i}`,
        kilometer_tempuh: `15000${i}`,
      },
    });
  }
};
