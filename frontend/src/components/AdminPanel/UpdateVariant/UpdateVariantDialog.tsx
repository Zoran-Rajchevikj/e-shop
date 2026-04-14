import type {UpdateProductVariant} from "../../../models/variant/UpdateProductVariant.ts";
import {Size} from "../../../models/enums.ts";
import {useState} from "react";
import useProductVariant from "../../../api/hooks/useProductVariant.ts";
import {Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, TextField} from "@mui/material";


const initialData = {
    color: "",
    size: Size.M,
    price: "",
    stock: "",
}


const UpdateVariantDialog = ({productId, variantId, open, close,onSuccess}) => {
    const [variant, setVariant] = useState(initialData);
    const {updateVariant} = useProductVariant(productId);
    const handleChange = (e) => {
        const {name, value} = e.target;
        setVariant({...variant, [name]:value});
    }
    const handleSubmit =async (e) => {
        e.preventDefault();
        if (!variant.color.trim() || Number(variant.price) <= 0 || Number(variant.stock) <= 0) {
            return;
        }
        const updated:UpdateProductVariant = {
            color: variant.color,
            size: variant.size,
            price: Number(variant.price),
            stock: Number(variant.stock)
        }
        await updateVariant(variantId, updated);
        onSuccess();
        setVariant(initialData);

        close();
    }
    return (
        <>
            <Dialog open={open} onClose={close}>
                <DialogTitle>Edit Variant</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            type="text"
                            name="color"
                            placeholder="Enter Color"
                            value={variant.color}
                            onChange={handleChange}
                        />

                        <Select
                            name="size"
                            value={variant.size}
                            onChange={handleChange}
                        >
                            {Object.values(Size).map((size) => (
                                <MenuItem key={size} value={size}>
                                    {size}
                                </MenuItem>
                            ))}
                        </Select>

                        <TextField
                            type="text"
                            name="price"
                            placeholder="Enter Price"
                            value={variant.price}
                            onChange={handleChange}
                        />

                        <TextField
                            type="text"
                            name="stock"
                            placeholder="Enter Stock"
                            value={variant.stock}
                            onChange={handleChange}
                        />
                        <DialogActions>
                            <button type="submit">Edit Variant</button>
                        </DialogActions>

                    </form>
                </DialogContent>

            </Dialog>


        </>
    )
}
export default UpdateVariantDialog;