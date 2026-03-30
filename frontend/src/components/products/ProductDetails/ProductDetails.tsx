import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import useProductDetails from "../../../api/hooks/useProductDetails";
import type { Size } from "../../../models/enums";
import "./ProductDetails.css"
import {Box, Button, FormControl, MenuItem, Select, StepLabel, TextField, Typography} from "@mui/material";
import useCart from "../../../api/hooks/useCart.ts";
import { toast } from 'react-toastify';
const ProductDetails = () => {
    const { id } = useParams();

    const{addItemToCart} = useCart()
    const { product, loading, getProductById } = useProductDetails();

    const [selectedSize, setSelectedSize] = useState<Size | "">("");
    const [selectedColor, setSelectedColor] = useState<string>("");
    const [quantity, setQuantity] = useState(1);
    const [imgSrc, setImgSrc] = useState<string>("/images/products/placeholder.jpg");


    // Кога пристигне продуктот, селектирај прв вариант
    useEffect(() => {
        if (product?.variants && product.variants.length > 0) {
            const firstVariant = product.variants[0];
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSelectedSize(firstVariant.size);
            setSelectedColor(firstVariant.color);
        }
    }, [product?.id]);

    // Земи го продуктот при учитување
    useEffect(() => {
        if (id) {
            getProductById(Number(id));
        }
    }, [id, getProductById]);

    useEffect(() => {
        if (selectedColor && product) {
            const newImg = `/images/products/${product.productType}/${product.name.toLowerCase()}-${selectedColor.toLowerCase()}.jpg`;
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setImgSrc(newImg);
        }
    }, [selectedColor, product]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!product) {
        return <p>Product not found</p>;
    }
    const variants = product.variants ?? [];
    const sizes: Size[] = Array.from(
        new Set(variants.map(v => v.size))
    );

    const colors = selectedSize
        ? variants
            .filter(v => v.size === selectedSize)
            .map(v => v.color)
        : [];

    const selectedVariant = variants.find(
        v => v.size === selectedSize && v.color === selectedColor
    );

    console.log(imgSrc)
    return (
        <div>
        <div className="product-wrapper">
            <div id="img-div">
                <img src={imgSrc} alt="" />
            </div>

            <div id="info-div">
                <span>{product?.name}</span>
                <p>{product?.description}</p>
                <p> cena: {selectedVariant?.price}</p>
                <FormControl sx={{ minWidth: 150, marginBottom: 2 }}>
                    <StepLabel>Izberi golemina</StepLabel>
                    <Select
                        value={selectedSize}
                        onChange={(e) => {
                            setSelectedSize(e.target.value as Size);
                            setSelectedColor("");
                        }}
                    >
                        {sizes.map(size => (
                            <MenuItem key={size} value={size}>{size}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <StepLabel>Select Color</StepLabel>

                {selectedSize && (
                    <FormControl sx={{ minWidth: 150, marginBottom: 2 }}>
                        <Select
                            value={selectedColor}
                            onChange={(e) => setSelectedColor(e.target.value)}
                        >
                            {colors.map(c => (
                                <MenuItem key={c} value={c}>{c}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                )}
                <Box>
                    <Typography fontWeight={500} mb={1}>
                        Quantity
                    </Typography>
                    <TextField
                        type="number"
                        value={quantity}
                        inputProps={{ min: 1 }}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                    />
                </Box>
                <Button
                    variant="contained"
                    size="large"
                    disabled={!selectedVariant}
                    sx={{ mt: 3, width: 250 }}
                     onClick={() => {
                         addItemToCart(Number(selectedVariant?.id),quantity);
                     toast.success("Successfully added to cart!")
                     }}
                >
                    Add to cart
                </Button>
            </div>
        </div>
        </div>
    )


};

export default ProductDetails;