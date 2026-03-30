import {ProductType, ProductTypeLabel} from "../../../models/enums.ts";
import {useNavigate} from "react-router-dom";

interface ProductTypeProps {
    title: string;
    category: string;
    productType: ProductType[]
}

const ProductTypes = ({title,category,productType}:ProductTypeProps) => {
    const navigate = useNavigate();

    const handleClick = (productType: ProductType) => {
        navigate(`/product-${category}/${productType}`);
    }

    return(
        <div className="product-men-container">
            <h1>{title}</h1>
            <div className="product-types-grid">
                {productType.map(type => (
                    <div
                        key={type}
                        className="product-type-card"
                        style={{
                            backgroundImage: `url(/public/images/products/${type}/default.jpg)`
                        }}
                        onClick={() => handleClick(type)}
                    >
                        <div className="overlay">
                            <span>{ProductTypeLabel[type]}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductTypes;