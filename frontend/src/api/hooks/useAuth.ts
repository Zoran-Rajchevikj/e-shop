import {useContext} from "react";
import AuthContext from "../context/AuthContext.ts";

const useAuth = () => useContext(AuthContext);

export default useAuth;
