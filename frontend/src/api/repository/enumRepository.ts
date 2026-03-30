import axiosInstance from "../axios.ts";

const enumRepository = {
    getGenderTypes: async():Promise<string[]> => {
        const res= await axiosInstance.get("/enums/gender");
        return res.data
    },
    getProductTypes: async():Promise<string[]> => {
        const res = await axiosInstance.get("/enums/product");
        return res.data
    },
    getSizes: async():Promise<string[]> => {
        const res = await axiosInstance.get("/enums/size");
        return res.data
    }
}
export default enumRepository;