import ProductForm from "./ProductForm/ProductForm.tsx";
import VariantForm from "./VariantForm/VariantForm.tsx";
import {useState} from "react";
import ShowProducts from "../products/ShowProducts/ShowProducts.tsx";


const AdminPanel= () => {
    const [createdProductId, setCreatedProductId] = useState<number | null>(null);

    return (
        <>
            {/*<ProductForm onProductCreated={setCreatedProductId}/>*/}
            {/*{createdProductId &&  <VariantForm productId={createdProductId}/>}*/}
            <ShowProducts administrator={true}/>
        </>
    )
}
export default AdminPanel;