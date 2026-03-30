import type {Product} from "../../models/product/Product.ts";
import type {CreateProduct} from "../../models/product/CreateProduct.ts";
import axiosInstance from "../axios.ts";

const productRepository = {
    getAllProducts:async(): Promise<Product[]> => {
        const res = await axiosInstance.get("/products");
        return res.data;
    },
    addProduct: async(data:CreateProduct): Promise<Product> => {
        const res = await axiosInstance.post("/products/add", data);
        return res.data;
    },
    getProductById:async (id: number): Promise<Product> =>{
        const res = await axiosInstance.get(`/products/${id}`);
        return res.data;
    },
    deleteProductById:async (id: number): Promise<void> => {
        return await axiosInstance.delete(`/products/delete/${id}`)
    },
    getAllProductsPaginated:async(page:number,size:number): Promise<Product[]> => {
        const res= await axiosInstance.get("/products/paginated",{
            params:{page,size}
        });
        return res.data;
    },
    filterProducts: async(genderType?: string,
                          productType?: string,
                          searchName?: string,
                          minPrice?: number,
                          maxPrice?: number,
                          color?: string,
                          productSize?: string,
                          page: number = 0,
                          size: number = 10): Promise<Product[]> => {
        const res = await axiosInstance.get("/products/filter", {
            params: {
                genderType,
                productType,
                searchName,
                minPrice,
                maxPrice,
                color,
                productSize,
                page,
                size
            }
        });
        return res.data.content
    }
}
export default productRepository;
