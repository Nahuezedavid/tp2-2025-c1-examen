import express from "express";
import {authMiddleware} from "../middleware/authMiddleware.js"
import { getAllSales, getSaleById, getTotalsSales, getSalesByEmail, updateCouponValue, getTopProductsController} from "../controllers/salesController.js";


const router = express.Router();
router.get("/", getAllSales);
//1
router.get("/:id",authMiddleware, getSaleById);
//2
router.get("/total", authMiddleware, getTotalsSales);
//3
router.get("/customer/:email", authMiddleware, getSalesByEmail);
//4
router.post("/customer/updateCoupon/:id",authMiddleware, updateCouponValue)
//5
router.get("/top-products", authMiddleware, getTopProductsController)
export default router;