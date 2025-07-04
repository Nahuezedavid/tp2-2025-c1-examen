import { getDbSupplies } from "./connection.js";
import { ObjectId } from "mongodb";

export async function findAllSales(page, pageSize) {
    const db = getDbSupplies();
    if (page && pageSize) {
        const skip = (page - 1) * pageSize;
        const sales = await db.collection("sales")
            .find()
            .skip(skip)
            .limit(pageSize)
            .toArray();
        return sales;
    } else {
        // Sin paginación: trae todos los documentos
        const sales = await db.collection("sales").find().toArray();
        return sales;
    }
}
//1
export async function findSaleById(id){
    const db = getDbSupplies();
    return await db.collection("sales").findOne({_id: new ObjectId(id)});
}
//2
export async function totalSales(){
    const db = getDbSupplies();
    const sales = await db.collection("sales").find().toArray();

    for (const sale of sales){
        let total = 0;
        for (const item of sale.items){
            const price = parseFloat(item.price.toString());
            const quantity = item.quantity;

            total += price * quantity;
        }
         sale.total = parseFloat(total.toFixed(2));
    }
   return sales;

};

//3
export async function findSaleByCustomerEmail(email){
    const db = getDbSupplies();
    const sales = await db.collection("sales").find({"customer.email" : email }).toArray();
    return sales;
}

//4
export async function updateCouponValue(id, newValue){
    const db = getDbSupplies();
    try {
        const sales = await db.collection("sales").updateOne(
            {_id: new ObjectId(id)},
            {$set: {couponUsed: newValue}}
        )
        return true;
    } catch {
        return false
    }
}

//5


export const findTopProductsBySales = async (limit) =>{
    const db = getDbSupplies();
    const topProducts = await db.collection("sales").aggregate([
        {$unwind: "$items"},
        {
            $group:{
                _id: "$items.name",
                totalSold: {$sum: "$items.quantity"}
            }
        },
        {$sort: {totalSold: -1}},
        {$limit: limit},
        {
            $project: {
                _id: 0,
                product: "$_id",
                totalQuantity: 1
            }
        }

    ]).toArray();
    return topProducts;
}