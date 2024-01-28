import Joi from "joi";

const createCarValidation = Joi.object({
  merek: Joi.string().max(100).required(),
  model: Joi.string().max(100).optional(),
  tahun_produksi: Joi.string().max(100).optional(),
  warna: Joi.string().max(100).optional(),
  bahan_bakar: Joi.string().max(100).optional(),
  kilometer_tempuh: Joi.string().max(100).optional(),
});

const getCarValidation = Joi.number().positive().required();

const updateCarValidation = Joi.object({
  id: Joi.number().positive().required(),
  merek: Joi.string().max(100).required(),
  model: Joi.string().max(100).optional(),
  tahun_produksi: Joi.string().max(100).optional(),
  warna: Joi.string().max(100).optional(),
  bahan_bakar: Joi.string().max(100).optional(),
  kilometer_tempuh: Joi.string().max(100).optional(),
});

const searchCarValidation = Joi.object({
  page: Joi.number().min(1).positive().default(1),
  size: Joi.number().min(1).positive().max(100).default(10),
  merek: Joi.string().optional(),
  model: Joi.string().optional(),
  tahun_produksi: Joi.string().optional(),
  warna: Joi.string().optional(),
  bahan_bakar: Joi.string().optional(),
  kilometer_tempuh: Joi.string().optional(),
});

export {
  createCarValidation,
  getCarValidation,
  updateCarValidation,
  searchCarValidation,
};
