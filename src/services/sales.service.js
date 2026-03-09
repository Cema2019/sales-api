import {
  findAllSales,
  findSaleById,
  insertSale,
  updateSaleById,
  deleteSaleById,
} from "../repositories/sales.repository.js";

function createAppError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

export async function getAllSalesService() {
  return await findAllSales();
}

export async function getSaleByIdService(id) {
  const saleId = Number(id);

  if (!Number.isInteger(saleId) || saleId <= 0) {
    throw createAppError("Invalid sale id", 400);
  }

  const sale = await findSaleById(saleId);

  if (!sale) {
    throw createAppError("Sale not found", 404);
  }

  return sale;
}

export async function createSaleService(data) {
  const { name, price, delivery } = data;

  if (!name || typeof name !== "string" || !name.trim()) {
    throw createAppError("Name is required", 400);
  }

  if (price == null || Number.isNaN(Number(price))) {
    throw createAppError("Price must be a valid number", 400);
  }

  if (delivery == null || Number.isNaN(Number(delivery))) {
    throw createAppError("Delivery must be a valid number", 400);
  }

  return await insertSale({
    name: name.trim(),
    price: Number(price),
    delivery: Number(delivery),
  });
}

export async function updateSaleService(id, data) {
  const saleId = Number(id);

  if (!Number.isInteger(saleId) || saleId <= 0) {
    throw createAppError("Invalid sale id", 400);
  }

  const { name, price, delivery } = data;

  if (!name || typeof name !== "string" || !name.trim()) {
    throw createAppError("Name is required", 400);
  }

  if (price == null || Number.isNaN(Number(price))) {
    throw createAppError("Price must be a valid number", 400);
  }

  if (delivery == null || Number.isNaN(Number(delivery))) {
    throw createAppError("Delivery must be a valid number", 400);
  }

  const updatedSale = await updateSaleById(saleId, {
    name: name.trim(),
    price: Number(price),
    delivery: Number(delivery),
  });

  if (!updatedSale) {
    throw createAppError("Sale not found", 404);
  }

  return updatedSale;
}

export async function deleteSaleService(id) {
  const saleId = Number(id);

  if (!Number.isInteger(saleId) || saleId <= 0) {
    throw createAppError("Invalid sale id", 400);
  }

  const deleted = await deleteSaleById(saleId);

  if (!deleted) {
    throw createAppError("Sale not found", 404);
  }
}
