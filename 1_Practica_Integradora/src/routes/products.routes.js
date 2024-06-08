import { Router } from 'express';
import { ProductManagerMDB } from "../dao/productManager.mdb.js";

const productsRouter = Router();

productsRouter.get("/", (req, res) => {
    try {
        const products = ProductManagerMDB.getProducts();
        const limit = parseInt(req.query.limit);
        const limitedProducts = [...products];
        if (!isNaN(limit) && limit > 0) {
            limitedProducts = limitedProducts.slice(0, limit);
        }
        res.status(200).send(limitedProducts);
    } catch (error) {
        res.status(500).json({ error: "Error al querer obtener los productos" });
    }
});

productsRouter.get("/:pid", (req, res) => {
    try {
        const products = ProductManagerMDB.getProducts();
        const pid = parseInt(req.params.pid);
        const product = products.find(product => product.id === pid);
        if (!product) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        res.send(product);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el producto" });
    }
});

productsRouter.post("/", (req, res) => {
    try {
        let product = req.body;
        product = ProductManagerMDB.addProduct(product);
        res.json({ status: "success", payload: product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

productsRouter.put("/:pid", (req, res) => {
    try {
        const id = +req.params.pid;
        let product = req.body;
        product = ProductManagerMDB.updateProduct(id, product);
        res.json({ status: "success", payload: product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

productsRouter.delete("/:pid", (req, res) => {
    try {
        const id = req.params.pid;
        const product = ProductManagerMDB.deleteProduct(id);
        res.json({ status: "success", payload: product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default productsRouter;