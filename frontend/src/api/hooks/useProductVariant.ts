import {useCallback, useEffect, useState} from "react";

import type {DisplayProductVariant} from "../../models/variant/DisplayProductVariant.ts";
import variantRepository from "../repository/variantRepository.ts";
import type {CreateProductVariant} from "../../models/variant/CreateProductVariant.ts";


interface ProductVariantState{
    variants:DisplayProductVariant[];
    loading: boolean;
}
const initialState :ProductVariantState={
    variants:[],
        loading: true
}
interface Variant{
    variant:DisplayProductVariant|null;
    loading: boolean;
}
const initialVariantState :Variant = {
    variant:null,
    loading:true
}
const useProductVariant = (productId:number) => {
    const [variants, setVariants] = useState<ProductVariantState>(initialState);
    const [variant, setVariant] = useState<Variant>(initialVariantState);

    const getAllProductVariants = useCallback(() => {
        variantRepository
            .getAllVariantsByProduct(productId)
            .then((response) => {
                console.log("Backend response:", response);
                setVariants({
                    variants: response,
                    loading: false,
                })
            })
            .catch((error) => console.log(error));
    }, [productId]);

    const addVariant = useCallback((data:CreateProductVariant) => {
        variantRepository
            .addVariant(data)
            .then(() => {
                console.log("Successfully added a new variant.");
                getAllProductVariants();
            })
            .catch((error) => console.log(error));
    },[getAllProductVariants]);

    const deleteVariantById = useCallback((id:number) => {
        variantRepository
            .deleteById(id)
            .then(() => {
                console.log("Successfully deleted a variant.");
                getAllProductVariants();
            })
            .catch((error) => console.log(error));
    },[getAllProductVariants]);

    const updatePrice = useCallback((id:number,price:number) => {
        variantRepository
            .updatePrice(id, price)
            .then(() => {
                console.log("Successfully updated price:");
                getAllProductVariants();
            })
            .catch((error) => console.log(error));
    },[getAllProductVariants]);

    const updateStock = useCallback((id:number,stock:number) => {
        variantRepository
            .updateStock(id, stock)
            .then(() => {
                console.log("Successfully updated stock:");
                getAllProductVariants();
            })
            .catch((error) => console.log(error));
    },[getAllProductVariants]);

    const decreaseStock = useCallback((id:number,quantity:number) => {
        variantRepository
            .decreaseStock(id, quantity)
            .then(() => {
                console.log("Successfully decreased stock:");
                getAllProductVariants();
            })
            .catch((error) => console.log(error));
    },[getAllProductVariants]);

    const getVariantById = useCallback((id:number) => {
        variantRepository
            .getById(id)
            .then((response) => {
                console.log("Successfully getting variant:");
                setVariant({
                    variant: response,
                    loading: false,
                })
            })
            .catch((error) => console.log(error));
    },[])

    useEffect(() => {
        getAllProductVariants();
    }, [getAllProductVariants]);

    return {
       variant, ...variants,getAllProductVariants,addVariant,deleteVariantById,updatePrice,updateStock,decreaseStock,getVariantById
    }
}


export default useProductVariant;