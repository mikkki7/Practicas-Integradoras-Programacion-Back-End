import mongoose from "mongoose";

mongoose.pluralize(null);

const productsCollection = "products";

const productSchema = new mongoose.Schema({
    category: { type: String, required: true },
    code: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: Boolean, required: true },
    stock: { type: Number, required: true },
    thumbnails: { type: Array, required: true },
    title: { type: String, required: true, index: true }
});

const productModel = mongoose.model(productsCollection, productSchema);

export default productModel;