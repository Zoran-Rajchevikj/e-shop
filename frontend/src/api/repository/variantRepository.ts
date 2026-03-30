import axiosInstance from "../axios.ts";
import type {DisplayProductVariant} from "../../models/variant/DisplayProductVariant.ts";
import type {CreateProductVariant} from "../../models/variant/CreateProductVariant.ts";

const variantRepository = {
    getAllVariantsByProduct: async (productId:number): Promise<DisplayProductVariant[]> => {
        return await axiosInstance.get(`/variants/product/${productId}`);
    },
    addVariant: async(data:CreateProductVariant): Promise<DisplayProductVariant> => {
        return await axiosInstance.post("/variants/add",data);
    },
    updatePrice: async(id:number,price:number): Promise<DisplayProductVariant> => {
        return await axiosInstance.put(`/variants/update/${id}/price`,null,{params:{newPrice:price}});
    },
    updateStock:async(id:number,stock:number): Promise<DisplayProductVariant> => {
        return await axiosInstance.put(`/variants/update/${id}/stock`,null,{params:{newStock:stock}});
    },
    getById:async(id:number) :Promise<DisplayProductVariant> => {
        return await axiosInstance.get(`/variants/variant/${id}`);
    },
    deleteById: async(id:number): Promise<void> => {
        return await axiosInstance.delete(`/variants/delete/${id}`);
    },
    decreaseStock:async(id:number,quantity:number):Promise <DisplayProductVariant> => {
        return await axiosInstance.put(`/variants/decreaseStock/${id}`,null,{params:{quantity}});
    }
}
export default variantRepository;