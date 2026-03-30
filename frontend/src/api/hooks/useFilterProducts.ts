import {type GenderType, ProductType} from "../../models/enums.ts";
import type {Product} from "../../models/product/Product.ts";
import {useEffect, useState} from "react";
import productRepository from "../repository/productRepository.ts";

interface FilterParams{
    genderType?: GenderType | string;
    productType?: ProductType | string;
    searchName?: string;
    minPrice?: number;
    maxPrice?: number;
    color?: string;
    productSize?: string;
    page?: number;
    size?: number;
}
interface UseFilterProductsResult {
    products: Product[];
    loading: boolean;
}
export const useFilterProducts = (filters : FilterParams):UseFilterProductsResult => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const data = await productRepository.filterProducts(
                    filters.genderType,
                    filters.productType,
                    filters.searchName,
                    filters.minPrice,
                    filters.maxPrice,
                    filters.color,
                    filters.productSize,
                    filters.page || 0,
                    filters.size || 10
                );
                setProducts(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [
        filters.genderType,
        filters.productType,
        filters.searchName,
        filters.minPrice,
        filters.maxPrice,
        filters.color,
        filters.productSize,
        filters.page,
        filters.size
    ]);

    return { products, loading };
};