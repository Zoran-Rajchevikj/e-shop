import type {Product} from "../../../models/product/Product.ts";
import { useNavigate } from "react-router-dom";
import {Card, CardContent, Typography} from "@mui/material";
interface Props{
    product:Product
}
const ProductCard = ({product}: Props) => {
    const navigate = useNavigate();
    const minPrice = Math.min(...product.variants.map(v => v.price));
    return (
        <Card
            sx={{ cursor: "pointer" }}
            onClick={() => navigate(`/products/${product.id}`)}
        >
            <CardContent>
                <Typography variant="h6">
                    {product.name}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    {product.description}
                </Typography>

                <Typography variant="subtitle1" sx={{ mt: 1 }}>
                    €{minPrice}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default ProductCard
