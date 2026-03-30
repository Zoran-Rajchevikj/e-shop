import { Grid, CircularProgress } from "@mui/material";

import useProduct from "../../api/hooks/useProduct.ts";
import ProductCard from "../../components/products/ProductCard/ProductCard.tsx";

const ProductsPage = () => {
    const { products, loading } = useProduct();

    if (loading) return <CircularProgress />;

    return (
        <Grid container spacing={6}>
            {products.map((product) => (
                <Grid
                    key={product.id}
                    sx={{
                        flexBasis: {
                            xs: "100%",
                            sm: "50%",
                            md: "33.33%",
                        },
                    }}
                >
                    <ProductCard product={product} />
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductsPage;