import type {Product} from "../../models/product/Product.ts";
import {useCallback, useState} from "react";
import productRepository from "../repository/productRepository.ts";
interface ProductDetailsState {
    product: Product | null;
    loading: boolean;
}

const initialState: ProductDetailsState = {
    product: null,
    loading: false,
};

const useProductDetails= () => {

    const [product, setProduct] = useState<ProductDetailsState>(initialState);
    const getProductById = useCallback((id: number) => {
        setProduct(prev => ({ ...prev, loading: true }));
        productRepository
            .getProductById(id)
            .then((response) => {
                setProduct({ product: response, loading: false });
            })
            .catch((error) => console.log(error));
    }, []);


    return {
        ...product,
        getProductById,
    };
};

export default useProductDetails;