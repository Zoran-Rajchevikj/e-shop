import type {DisplayUser} from "../../models/user/DisplayUser.ts";
import type {CreateUser} from "../../models/user/CreateUser.ts";
import axiosInstance from "../axios.ts";
import type {LoginUser} from "../../models/user/LoginUser.ts";
import type {LoginResponse} from "../../models/user/LoginResponse.ts";


const userRepository = {
    register: async (data:CreateUser): Promise<DisplayUser> => {
        const res = await axiosInstance.post("/user/register",data);
        return res.data;
    },
    login: async (data:LoginUser): Promise<LoginResponse>  => {
        const res = await axiosInstance.post("/user/login",data);
        return res.data;
    }
}
export default userRepository;