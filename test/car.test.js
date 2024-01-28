import {
  createManyTestCars,
  createTestCar,
  createTestUser,
  getTestCar,
  removeAllTestCars,
  removeTestUser,
} from "./test-util.js";
import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";

describe("POST /api/cars", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeAllTestCars();
    await removeTestUser();
  });

  it("should can create new car", async () => {
    const result = await supertest(web)
      .post("/api/cars")
      .set("Authorization", "test")
      .send({
        merek: "merek apa",
        model: "model apa",
        tahun_produksi: "kapan tahun produksi",
        warna: "warna apa",
        bahan_bakar: "bahan bakar apa",
        kilometer_tempuh: "berapa kilometer tempuh",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.merek).toBe("honda");
    expect(result.body.data.model).toBe("civic");
    expect(result.body.data.tahun_produksi).toBe("2024");
    expect(result.body.data.warna).toBe("merah");
    expect(result.body.data.bahan_bakar).toBe("bensin");
    expect(result.body.data.kilometer_tempuh).toBe("15000");
  });

  it("should reject if request is not valid", async () => {
    const result = await supertest(web)
      .post("/api/cars")
      .set("Authorization", "test")
      .send({
        merek: "",
        model: "model",
        tahun_produksi: "produksi",
        warna: "warna ",
        bahan_bakar: "bahan bakar",
        kilometer_tempuh: "tempuh",
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/cars/:carId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestCar();
  });

  afterEach(async () => {
    await removeAllTestCars();
    await removeTestUser();
  });

  it("should can get car", async () => {
    const testCar = await getTestCar();

    const result = await supertest(web)
      .get("/api/cars/" + testCar.id)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testCar.id);
    expect(result.body.data.merek).toBe(testCar.merek);
    expect(result.body.data.model).toBe(testCar.model);
    expect(result.body.data.tahun_produksi).toBe(testCar.tahun_produksi);
    expect(result.body.data.warna).toBe(testCar.warna);
    expect(result.body.data.bahan_bakar).toBe(testCar.bahan_bakar);
    expect(result.body.data.kilometer_tempuh).toBe(testCar.kilometer_tempuh);
  });

  it("should return 404 if car id is not found", async () => {
    const testCar = await getTestCar();

    const result = await supertest(web)
      .get("/api/cars/" + (testCar.id + 1))
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});

describe("PUT /api/cars/", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestCar();
  });

  afterEach(async () => {
    await removeAllTestCars();
    await removeTestUser();
  });

  it("should can update existing car", async () => {
    const testCar = await getTestCar();

    const result = await supertest(web)
      .put("/api/cars/" + testCar.id)
      .set("Authorization", "test")
      .send({
        merek: "toyota",
        model: "avanza",
        tahun_produksi: "2023",
        warna: "putih",
        bahan_bakar: "bensin",
        kilometer_tempuh: "12000",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testCar.id);
    expect(result.body.data.merek).toBe("toyota");
    expect(result.body.data.model).toBe("avanza");
    expect(result.body.data.tahun_produksi).toBe("2023");
    expect(result.body.data.warna).toBe("putih");
    expect(result.body.data.bahan_bakar).toBe("bensin");
    expect(result.body.data.kilometer_tempuh).toBe("12000");
  });

  it("should reject if request is invalid", async () => {
    const testCar = await getTestCar();

    const result = await supertest(web)
      .put("/api/cars/" + testCar.id)
      .set("Authorization", "test")
      .send({
        merek: "",
        model: "avanza",
        tahun_produksi: "",
        warna: "",
        bahan_bakar: "",
        kilometer_tempuh: "",
      });

    expect(result.status).toBe(400);
  });

  it("should reject if car is not found", async () => {
    const testCar = await getTestCar();

    const result = await supertest(web)
      .put("/api/cars/" + (testCar.id + 1))
      .set("Authorization", "test")
      .send({
        merek: "toyota",
        model: "avanza",
        tahun_produksi: "2023",
        warna: "putih",
        bahan_bakar: "bensin",
        kilometer_tempuh: "12000",
      });

    expect(result.status).toBe(404);
  });
});

describe("DELETE /api/cars/", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestCar();
  });

  afterEach(async () => {
    await removeAllTestCars();
    await removeTestUser();
  });

  it("should can delete car", async () => {
    let testCar = await getTestCar();
    const result = await supertest(web)
      .delete("/api/cars/" + testCar.id)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");

    testCar = await getTestCar();
    expect(testCar).toBeNull();
  });

  it("should reject if car is not found", async () => {
    let testCar = await getTestCar();
    const result = await supertest(web)
      .delete("/api/cars/" + (testCar.id + 1))
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});

describe("GET /api/cars", function () {
  beforeEach(async () => {
    await createTestUser();
    await createManyTestCars();
  });

  afterEach(async () => {
    await removeAllTestCars();
    await removeTestUser();
  });

  it("should can search without parameter", async () => {
    const result = await supertest(web)
      .get("/api/cars")
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(10);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.total_item).toBe(15);
  });

  it("should can search to page 2", async () => {
    const result = await supertest(web)
      .get("/api/cars")
      .query({
        page: 2,
      })
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(5);
    expect(result.body.paging.page).toBe(2);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.total_item).toBe(15);
  });

  it("should can search using merek", async () => {
    const result = await supertest(web)
      .get("/api/cars")
      .query({
        merek: "merek 1",
      })
      .set("Authorization", "merek");

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  });

  it("should can search using tahun produksi", async () => {
    const result = await supertest(web)
      .get("/api/cars")
      .query({
        tahun_produksi: "test1",
      })
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  });

  it("should can search using model", async () => {
    const result = await supertest(web)
      .get("/api/cars")
      .query({
        model: "civic",
      })
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  });

  it("should can search using warna", async () => {
    const result = await supertest(web)
      .get("/api/cars")
      .query({
        warna: "putih",
      })
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  });

  it("should can search using bahan bakar", async () => {
    const result = await supertest(web)
      .get("/api/cars")
      .query({
        bahan_bakar: "bensin",
      })
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  });

  it("should can search using kilometer_tempuh", async () => {
    const result = await supertest(web)
      .get("/api/cars")
      .query({
        kilometer_tempuh: "15000",
      })
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  });
});
