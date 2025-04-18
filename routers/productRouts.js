import express from "express";
import { deleteProduct, getProduct, getProductId, saveProduct, updateProduct } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/", saveProduct)
productRouter.get("/", getProduct)
productRouter.delete("/:productId", deleteProduct)
productRouter.put("/:productId", updateProduct )
productRouter.get("/:productId", getProductId) 

export default productRouter;