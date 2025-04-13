import express from "express";
import { deleteProduct, getProduct, saveProduct } from "../controllers/productcontroller.js";

const productRouter = express.Router();

productRouter.post("/", saveProduct)
productRouter.get("/", getProduct)
productRouter.delete("/:productId", deleteProduct)

export default productRouter;