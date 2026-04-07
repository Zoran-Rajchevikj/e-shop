import ProductForm from "./ProductForm/ProductForm.tsx";
import VariantForm from "./VariantForm/VariantForm.tsx";
import {useState} from "react";


const AdminPanel= () => {
    const [createdProductId, setCreatedProductId] = useState<number | null>(null);
    console.log(createdProductId)
    return (
        <>
            <ProductForm onProductCreated={setCreatedProductId}/>
            {createdProductId &&  <VariantForm productId={createdProductId}/>}

        </>
    )
}
export default AdminPanel;