import { getSales, saleById, getSaleTotals, getSalesByCustomerEmail, postUpdateCouponValue, getTopProducts} from "../services/salesService.js";

export const getAllSales = async (req, res) => {
    try {
        const page = req.query.page ? parseInt(req.query.page) : undefined;
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : undefined;
        const sales = await getSales(page, pageSize);
        res.json(sales);
    } catch (error) {
        console.log("Error fetching sales: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

//1
export const getSaleById = async (req, res) => {
    try {
        const {id} = req.params;
        const sale = await saleById(id);
        if (!sale){
            return res.status(404).json({message: "Venta no encontrada"});
        }
        res.json(sale);
    }catch (error){
        res.status(500).json({ message: "Internal server error" });
    }
};

//2
export const getTotalsSales = async(req, res) => {
    try {
        const sales = getSaleTotals();
        res.json(sales);
    }catch (error){
        res.status(500).json({ message: "Internal server error" });
    }
};

//3
export const getSalesByEmail = async (req, res) => {
    try{
        const email = req.params.email;
        const sales = await getSalesByCustomerEmail(email);
        res.json(sales);
    } catch (error){
        res.status(500).json({ message: "Internal server error" });
    }
};

//4
export const updateCouponValue = async (req, res) => {
    
    const id = req.params.id;
    const newValue = req.query.newValue;
    try{
        const updatedRows = postUpdateCouponValue(id, newValue)
        if(!updatedRows){
            return res.status(500).json({ message: "Fallo al actualizar" });
        }
        res.json({message: "Cupon actualizado"})
    } catch (error){
        res.status(500).json({ message: "Internal server error" });
    }
};

//5
export const getTopProductsController = async (req, res) => {
    const cantidad = parseInt(req.query.cantidad)
    try {
        const limit = parseInt(req.query.limit) || 5;
        const topProducts = await getTopProducts(limit)
        res.json(topProducts)
    }catch (error){
        res.status(500).json({ message: "Internal server error" });
    }
};