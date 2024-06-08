import productModel from "./models/product.model";

export class ProductManagerMDB {
    
    constructor () {
        this.products = [];
    }

    getProducts (limit) {
        try {
            this.products = productModel.find.limit(limit).lean();
            
            if(!this.products){
                throw new Error("No se encontraron dichos productos");
            }
            return this.products;
        } catch (error) {
            throw error;
        }
    }

    getProductById (id) {
        try {
            if(id.length !== 24){
                throw new Error("El id debe tener 24 caracteres");
            }

            const product = productModel.findById({ _id: id });
            
            if(!product){
                throw new Error(`No se encontro el producto con el id ${id}`);
            }
            return product;
        } catch (error) {
            throw error;
        }
    }

    addProduct (product) {
        try{
            product = productModel.create(product);

            if(!product){
                throw new Error("No se pudo crear dicho producto");
            }
            return product;
        } catch (error) {
            if(error.code === 11000){
                throw new Error(`Ya existe algun producto con el codigo ${product.code}`);
            }
        }
    }

    updateProduct (id, product) {
        try {
            if(id.length !== 24){
                throw new Error("El id debe tener 24 caracteres");
            }

            product = productModel.findByIdAndUpdate({ _id: id }, product, { new: true });

            if(!product){
                throw new Error(`No se encontro algun producto con el id ${id}`);
            }
            return product;
        } catch (error) {
            if(error.code === 11000){
                throw new Error(`Ya existe algun producto con el codigo ${product.code}`);
            }
            throw error;
        }
    }

    deleteProduct (id) {
        try {
            if(id.length !== 24){
                throw new Error("El id debe tener 24 caracteres");
            }

            const product = productModel.findByIdAndDelete({ _id: id });

            if(!product){
                throw new Error(`No se encontro dicho producto con el id ${id}`);
            }
            return product;
        } catch (error) {
            throw error;
        }
    }
}