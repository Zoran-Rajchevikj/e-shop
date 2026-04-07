
import type {CreateProductVariant} from "../../../models/variant/CreateProductVariant.ts";
import {useState} from "react";
import {  Size} from "../../../models/enums.ts";
import useProductVariant from "../../../api/hooks/useProductVariant.ts";
import * as test from "node:test";

type ProductVariantState= {

    color:string,
    size : Size | "",
    price:string | number,
    stock:string | number
}
type Props = {
    productId: number;
};

const initialForm :ProductVariantState={
    color:"",
    size:"",
    price:"",
    stock:"",
    
}

const VariantForm = ({productId}:Props)=> {
    const[formData,setFormData]=useState(initialForm);
    const {addVariant} = useProductVariant(productId);
    const handleSubmit= (e) =>{
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
            addVariant(variantToCreate);
            setFormData(initialForm);
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
            <form onSubmit={handleSubmit}>
                <input
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    placeholder="Color" />
                <select
                    name="size"
                    value={formData.size}
                    onChange={handleChange}>
                    <option value="">Select Size</option>
                    {Object.values(Size).map(size => (<option key={size} value={size}>{size}</option>))}
                </select>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Price" />
                <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="Stock" />
                <button type="submit">Create Variant</button>
            </form>
        </>
    )
    
}
export default VariantForm;