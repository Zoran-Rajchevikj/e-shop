
import useProductVariant from "../../api/hooks/useProductVariant.ts";
import { useParams} from "react-router-dom";

import useProductDetails from "../../api/hooks/useProductDetails.ts";



const ProductVariants = () => {
    const {id} = useParams();
    const {variants,loading} = useProductVariant(Number(id))
    const {product} = useProductDetails();

    function handleUpdate(id: number) {

    }

    function handleDelete(id: number) {

    }

    function handleAddVariant() {

    }

    // //   const newImg = `/images/products/${product.productType}/${product.name.toLowerCase()}-${selectedColor.toLowerCase()}.jpg`;
    return (
        <>

            <div className="variants-container">
                {variants.map(variant => (
                    <div key={variant.id} className="variant-row">

                        {/* Слика */}
                        <img
                            src={`/images/products/${product.productType}/${product.name.toLowerCase()}-${variant.color.toLowerCase()}.jpg`}
                            alt={variant.color}
                            className="variant-image"
                        />

                        {/* Инфо */}
                        <div className="variant-info">
                            <h4>{product.name}</h4>
                            <p>Color: {variant.color}</p>
                            <p>Size: {variant.size}</p>
                            <p>Price: {variant.price} </p>
                            <p>Stock: {variant.stock}</p>
                        </div>

                        {/* Actions */}
                        <div className="variant-actions">
                            <button
                                onClick={() => handleUpdate(variant.id)}
                                className="btn-update"
                            >
                                Update
                            </button>

                            <button
                                onClick={() => handleDelete(variant.id)}
                                className="btn-delete"
                            >
                                Delete
                            </button>
                        </div>

                    </div>
                ))}

                {/* ➕ Add new variant */}
                <div className="variant-add">
                    <button onClick={handleAddVariant}>
                        + Add Variant
                    </button>
                </div>
            </div>

        </>
    )
}
export default ProductVariants;