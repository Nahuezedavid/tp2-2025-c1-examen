import { findAllSales, findSaleById, totalSales, findSaleByCustomerEmail, updateCouponValue, findTopProductsBySales} from "../data/salesData.js";

export const getSales = async (page, pageSize) => {
    return await findAllSales(page, pageSize);
}
//1
export const saleById = async (id) => await findSaleById(id);

//2
export const getSaleTotals = async () => await totalSales();

//3
export const getSalesByCustomerEmail = async (email) => await findSaleByCustomerEmail(email);

//4
export const postUpdateCouponValue = async (id, newValue) => await updateCouponValue(id, newValue);

//5
export const getTopProducts = async (limit) => await findTopProductsBySales(limit);