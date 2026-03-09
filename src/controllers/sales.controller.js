import {
  getAllSalesService,
  getSaleByIdService,
  createSaleService,
  updateSaleService,
  deleteSaleService,
} from "../services/sales.service.js";

export async function getSales(req, res, next) {
  try {
    const sales = await getAllSalesService();
    return res.status(200).json(sales);
  } catch (error) {
    next(error);
  }
}

export async function getSaleById(req, res, next) {
  try {
    const sale = await getSaleByIdService(req.params.id);
    return res.status(200).json(sale);
  } catch (error) {
    next(error);
  }
}

export async function createSale(req, res, next) {
  try {
    const newSale = await createSaleService(req.body);
    return res.status(201).json(newSale);
  } catch (error) {
    next(error);
  }
}

export async function updateSale(req, res, next) {
  try {
    const updatedSale = await updateSaleService(req.params.id, req.body);
    return res.status(200).json(updatedSale);
  } catch (error) {
    next(error);
  }
}

export async function deleteSale(req, res, next) {
  try {
    await deleteSaleService(req.params.id);
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}
