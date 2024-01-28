import carService from "../service/car-service.js";
import { logger } from "../application/logging.js";

const create = async (req, res, next) => {
  try {
    const user = req.user;
    const request = req.body;
    const result = await carService.create(user, request);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const user = req.user;
    const carId = req.params.carId;
    const result = await carService.get(user, carId);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const user = req.user;
    const carId = req.params.carId;
    const request = req.body;
    request.id = carId;

    const result = await carService.update(user, request);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const user = req.user;
    const carId = req.params.carId;

    await carService.remove(user, carId);
    res.status(200).json({
      data: "OK",
    });
  } catch (e) {
    next(e);
  }
};

const search = async (req, res, next) => {
  try {
    const user = req.user;
    const request = {
      merek: req.query.merek,
      model: req.query.model,
      tahun_produksi: req.query.tahun_produksi,
      warna: req.query.warna,
      bahan_bakar: req.query.bahan_bakar,
      kilometer_tempuh: req.query.kilometer_tempuh,
    };

    const result = await carService.search(user, request);
    res.status(200).json({
      data: result.data,
      paging: result.paging,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  create,
  get,
  update,
  remove,
  search,
};
