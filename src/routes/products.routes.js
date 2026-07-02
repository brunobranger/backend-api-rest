import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

// GET /api/products devuelve todos los productos.
router.get("/", getAllProducts);
// GET /api/products/:id devuelve el producto con el ID indicado.
router.get("/:id", getProductById);
// POST /api/products/create recibe la información
router.post("/create", verifyToken, createProduct);
// PUT /api/products/:id permite actualizar un producto -> La consigna del proyecto lo dice de manera literal pero no como requerimiento especifico (es decir, dice la palabra ACTUALIZAR pero no lo pide como endpoint)
router.put("/:id", verifyToken, updateProduct);
// DELETE /api/products/:id elimina el producto
router.delete("/:id", verifyToken, deleteProduct);

export default router;
