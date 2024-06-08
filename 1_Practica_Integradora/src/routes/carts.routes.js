import { Router } from 'express';
import { CartsManagerMDB } from "../dao/cartManager.mdb.js";

const cartsRouter = Router();

cartsRouter.post("/", (req, res) => {
    try {
        const cart = CartsManagerMDB.createCart();
        res.json({ status: "succes", payload: cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

cartsRouter.get("/:cid", (req, res) => {
    try {
        const id = req.params.cid;
        const cart = CartsManagerMDB.getCartById(id);
        res.json({ status: "success", payload: cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

cartsRouter.post("/:cid/product/:pid", (req, res) => {
    try {
        const cid = req.params.cid;
        const pid= req.params.pid;
        const cart = CartsManagerMDB.addProductToCart(cid, pid);
        res.json({ status: "success", payload: cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

cartsRouter.delete("/:cid/product/:pid", (req, res) => {
    try {
        const cid = req.params.cid;
        const pid= req.params.pid;
        const cart = CartsManagerMDB.deleteProductFromCart(cid, pid);
        res.json({ status: "success", payload: cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default cartsRouter;