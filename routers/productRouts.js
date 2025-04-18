import express from "express";
import { deleteProduct, getProduct, saveProduct, updateProduct } from "../controllers/productcontroller.js";

const productRouter = express.Router();

productRouter.post("/", saveProduct)
productRouter.get("/", getProduct)
productRouter.delete("/:productId", deleteProduct)
productRouter.put("/:productId", updateProduct )

export default productRouter;