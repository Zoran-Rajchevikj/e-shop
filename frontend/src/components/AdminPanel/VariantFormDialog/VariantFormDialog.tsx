
import type {CreateProductVariant} from "../../../models/variant/CreateProductVariant.ts";
import  {useState} from "react";
import {  Size} from "../../../models/enums.ts";
import useProductVariant from "../../../api/hooks/useProductVariant.ts";
import {Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, TextField} from "@mui/material";


type ProductVariantState= {

    color:string,
    size : Size | "",
    price:string | number,
    stock:string | number
}

const initialForm :ProductVariantState={
    color:"",
    size:"",
    price:"",
    stock:"",
    
}

const VariantFormDialog = ({productId,open,close,onSuccess})=> {
    const[formData,setFormData]=useState(initialForm);
    const {addVariant} = useProductVariant(productId);
    const handleSubmit= async (e) =>{
        e.preventDefault();
        const priceNum = Number(formData.price);
        const stockNum = Number(formData.stock);
        if(!formData.size ||
            priceNum <= 0 ||
            stockNum <= 0 ||
            !/^[a-zA-Z]+$/.test(formData.color)) {
            alert("Please fill all fields with the correct entry");
            return;
        }
        const variantToCreate : CreateProductVariant={
            productId,
            color: formData.color,
            size: formData.size as Size,
            price: priceNum,
            stock: stockNum,
        }
        try{
          await  addVariant(variantToCreate);
            onSuccess();
            setFormData(initialForm);
            close()
        }
        catch(err){
            console.error(err);
        }

    }
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: name === "price" || name==="stock"?Number(value):value});
    }
    return(
        <>
            <Dialog open={open}>
                <DialogTitle>Add new Variant</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            type="text"
                            name="color"
                            value={formData.color}
                            onChange={handleChange}
                            placeholder="Color" />
                        <Select
                            name="size"
                            value={formData.size}
                            onChange={handleChange}>
                            <option value="">Select Size</option>
                            {Object.values(Size).map(size => (<MenuItem key={size} value={size}>{size}</MenuItem>))}
                        </Select>
                        <TextField
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Price" />
                        <TextField
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            placeholder="Stock" />
                        <DialogActions>
                            <button type="submit">Create Variant</button>
                        </DialogActions>

                    </form>
                </DialogContent>
            </Dialog>

        </>
    )
    
}
export default VariantFormDialog;