import express from 'express';
import { createOrder } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/', createOrder); // Create a new order


export default orderRouter;