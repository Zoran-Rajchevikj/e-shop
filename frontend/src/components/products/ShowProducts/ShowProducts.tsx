import {GenderType, ProductTypeLabel} from "../../../models/enums.ts";
import {useNavigate, useParams} from "react-router-dom";
import {useFilterProducts} from "../../../api/hooks/useFilterProducts.ts";

interface Props{
    genderType:GenderType,
}

const ShowProducts = ({genderType}:Props) => {
    const navigate = useNavigate();
    const {productType} = useParams();
    const {products,loading} = useFilterProducts({
        genderType: genderType,
        productType:productType,
        page:0,
        size:10,
    })
    if (loading) {
        return (
            <div className="pm-loading-container">
                <div className="pm-spinner">Вчитување...</div>
            </div>
        );
    }
    return(
        <div className="pm-container">
            <div className="pm-header">
                <button onClick={() => navigate(-1)} className="pm-back-btn">
                    ← Назад
                </button>
                <h1>{ProductTypeLabel[productType as keyof typeof ProductTypeLabel]}</h1>
                <p className="pm-product-count">{products.length} производи</p>
            </div>

            <div className="pm-products-grid">
                {products.map(product => (
                    <div
                        key={product.id}
                        className="pm-product-card"

                        onClick={() => navigate(`/products/${product.id}`)}
                    >
                        <div className="pm-product-image-wrapper">
                            <img
                                //   const newImg = `/images/products/${product.productType}/${product.name.toLowerCase()}-${selectedColor.toLowerCase()}.jpg`;
                                src={`/images/products/${product.productType}/${product.name.toLowerCase()}-default.jpg`}
                                alt={product.name}
                                className="pm-product-image"
                            />
                            <div className="pm-product-overlay">
                                <button className="pm-quick-view-btn">Брз преглед</button>
                            </div>
                        </div>

                        <div className="pm-product-info">
                            <h3 className="pm-product-name">{product.name}</h3>
                            <div className="pm-product-footer">
                                <span className="pm-product-price">
                                    {Math.min(...product.variants.map(v => v.price))} ден
                                </span>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default ShowProducts;