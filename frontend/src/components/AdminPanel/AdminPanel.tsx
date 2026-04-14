import ProductForm from "./ProductForm/ProductForm.tsx";
import VariantForm from "./VariantFormDialog/VariantFormDialog.tsx";
import {useState} from "react";
import ShowProducts from "../products/ShowProducts/ShowProducts.tsx";
import useProduct from "../../api/hooks/useProduct.ts";


const AdminPanel= () => {
    const [createdProductId, setCreatedProductId] = useState<number | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const {addProduct,getAllProducts} = useProduct();
    const [refreshKey,setrefreshKey] = useState(0);
    const handleProductCreated = (id:number)=>{
        setCreatedProductId(id);
        setrefreshKey( prev => prev + 1)
    }
    return (
        <>
            <button onClick={() => setOpen(true)}>Add new Product</button>
            <ProductForm
                onProductCreated={handleProductCreated}
                open={open}
                close={() => setOpen(false)}
                addProduct={addProduct}/>

            <ShowProducts administrator={true} refreshKey={refreshKey}/>
        </>
    )
}
export default AdminPanel;