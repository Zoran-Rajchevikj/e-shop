import {useCallback, useEffect, useState} from "react";
import productRepository from "../repository/productRepository.ts";
import type {Product} from "../../models/product/Product.ts";
import type {CreateProduct} from "../../models/product/CreateProduct.ts";

interface ProductState{
    products: Product[];
    loading: boolean;
}

const initialState: ProductState = {
    products:[],
    loading: true,
}
const useProduct = () => {
    const [products, setProducts] = useState<ProductState>(initialState);

    const getAllProducts = useCallback(() => {
        productRepository
            .getAllProducts()
            .then((response) => {
                console.log("Backend response:", response);
                setProducts({
                    products: response,
                    loading: false,
                })
            })
            .catch((error) => console.log(error));
    }, [])

    const addProduct = useCallback(async (data:CreateProduct) => {
            try {
                const response = await productRepository.addProduct(data)
                console.log(response)
                getAllProducts();
                return response;
            } catch (error) {
                console.log(error)
                throw error;
            }
        },[getAllProducts]
    )

    const deleteProduct = useCallback((id:number) => {
        productRepository
            .deleteProductById(id)
            .then(() => {
                console.log("Successfully deleted a products.");
                getAllProducts();
            })
            .catch((error) => console.log(error));
    },[getAllProducts])

    useEffect(() => {
        getAllProducts();
    }, [getAllProducts]);

    return {
        ...products,getAllProducts,addProduct,deleteProduct
    }
}


export default useProduct;