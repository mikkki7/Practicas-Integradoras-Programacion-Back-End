import express from "express";
import { Router } from "express";
import { ProductManagerMDB } from "../dao/productManager.mdb";
import productModel from "../dao/models/product.model";

const viewsRouter = Router();

viewsRouter.get("/realtimeproducts", (req, res) => {
    try {
        let products = productModel.find().lean();
        res.render("realTimeProducts", { products : products });
    } catch (error) {
        console.error("Error al obtener los productos en tiempo real:", error);
        res.status(500).send("Error en el servidor")
    }
})

viewsRouter.get("/products", (req, res) => {
    try {
        const products = ProductManagerMDB.getProducts();
        res.render("products", { products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

viewsRouter.get("/chat", (req, res) => {
    res.render("chat", {});
})

export default viewsRouter;