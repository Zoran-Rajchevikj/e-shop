
import './App.css'

import { Routes, Route, BrowserRouter} from "react-router-dom";
import ProductsPage from "./pages/ProductPage/ProductPage.tsx";
import ProductDetails from "./components/products/ProductDetails/ProductDetails.tsx";
import Login from "./components/auth/Login/Login.tsx";
import Register from "./components/auth/Register/Register.tsx";
import HomePage from "./pages/HomePage/HomePage.tsx";
import Layout from "./components/Layout/Layout/Layout.tsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.tsx";
import ProductTypeMen from "./components/products/ProductTypeMen/ProductTypeMen.tsx";
import ProductMen from "./components/products/ProductMen/ProductMen.tsx";
import ProductTypeWomen from "./components/products/ProductTypeWomen/ProductTypeWomen.tsx";
import ProductWomen from "./components/products/ProductWomen/ProductWomen.tsx";
import CartPage from "./pages/CartPage/CartPage.tsx";
import {ToastContainer} from "react-toastify";
import AdminPanel from "./components/AdminPanel/AdminPanel.tsx";


function App() {
    return (
        <BrowserRouter>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Routes>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<HomePage/>}/>
                    <Route element={<ProtectedRoute/>}>
                        <Route path="/products" element={<ProductsPage />} />
                        <Route path="/product-men/:productType" element={<ProductMen/>}></Route>
                        <Route path="/product-women/:productType" element={<ProductWomen/>}></Route>
                        <Route path="/products/:id" element={<ProductDetails/>}></Route>
                        <Route path="/product-men" element={<ProductTypeMen/>}></Route>
                        <Route path="/product-women" element={<ProductTypeWomen/>}></Route>
                          <Route element={<ProtectedRoute requiredRole={"ROLE_ADMIN"}/>}>
                            <Route path="/adminPanel" element={<AdminPanel/>}></Route>
                              <Route path="/admin/product/:id" ></Route> // add element
                         </Route>

                        {/*<Route path="/product-kids" element={<ProductTypeKids/>}></Route>*/}
                        <Route path="/cart" element={<CartPage/>} ></Route>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;