import {useParams} from "react-router-dom";
import useProductDetails from "../../../api/hooks/useProductDetails.ts";
import {useEffect, useState} from "react";
import UpdateVariantDialog from "../UpdateVariant/UpdateVariantDialog.tsx";
import DeleteVariantDialog from "../DeleteVariant/DeleteVariantDialog.tsx";
import VariantFormDialog from "../VariantFormDialog/VariantFormDialog.tsx";


const ShowProduct = () => {
    const {id} = useParams();
    const {product,loading,getProductById} = useProductDetails()
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [selectedVariant,setSelectedVariant] = useState<number | null>(null);
    useEffect(() => {
        if (id) {
            getProductById(Number(id));
        }
    }, [id, getProductById]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return(
        <>
            <div>
                <h2>{product?.name}</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Image</th>
                        <th>Price</th>
                        <th>Color</th>
                        <th>Size</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>

                        {product?.variants.map((variant) => (
                            <tr key={variant.id}>
                                <td >
                                    <img src={`/images/products/${product.productType}/${product.name.toLowerCase()}-${variant.color.toLowerCase()}.jpg`} alt="slika" style={{width:"100px",height:"100px"}}
                                    onError={(e) => { const img = e.currentTarget;

                                        if (!img.dataset.fallback) {
                                            img.src = `/images/products/${product.productType}/${product.name.toLowerCase()}-default.jpg`;
                                            img.dataset.fallback = "true";
                                        } else {
                                            img.src = "/images/products/vite.svg"; // 👈 FINAL fallback (стави една глобална слика)
                                        }
                                    }}/>
                                </td>
                                <td>{variant.price}</td>
                                <td>{variant.color}</td>
                                <td>{variant.size}</td>
                                <td>{variant.stock}</td>
                                <td>
                                    <button onClick={()=>{
                                        setOpenUpdate(true)
                                        setSelectedVariant(variant.id)
                                    }}>Update</button>
                                    <button onClick={()=> {
                                        setOpenDelete(true)
                                        setSelectedVariant(variant.id)
                                    }}>Delete</button>

                                </td>
                            </tr>
                            ))}

                    </tbody>
                </table>
                {selectedVariant && (
                    <>
                        <UpdateVariantDialog
                        open={openUpdate}
                        productId={Number(id)}
                        variantId={selectedVariant}
                        onSuccess={()=> getProductById(Number(id))}
                        close={() => setOpenUpdate(false)}
                    />
                        <DeleteVariantDialog
                        open={openDelete}
                        productId={Number(id)}
                        variantId={selectedVariant}
                        onSuccess={()=> getProductById(Number(id))}
                        close = {()=> setOpenDelete(false)}
                        />
                    </>

                )}
            <button onClick={()=> setOpenAdd(true)}>Add new Variant</button>
           <VariantFormDialog productId={Number(id)} close={()=> setOpenAdd(false)} open={openAdd} onSuccess={() => getProductById(Number(id))}/>
            </div>

        </>
    )
}

export default ShowProduct;