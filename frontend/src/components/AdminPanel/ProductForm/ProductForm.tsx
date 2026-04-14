import {GenderType, ProductType} from "../../../models/enums.ts";
import React, {useState} from "react";
import useProduct from "../../../api/hooks/useProduct.ts";
import type {CreateProduct} from "../../../models/product/CreateProduct.ts";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";

type ProductFormState = {
    name:string,
    description:string,
    genderType:GenderType | "",
    productType:ProductType | "",
}
type Props={
    onProductCreated:(id:number) => void,
}
const initialForm:ProductFormState={
  name:"",
    description:"",
    genderType:"",
    productType:""
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const productTypesByGender: Record<GenderType, ProductType[]>={
    MEN:[  ProductType.KAPUT,
        ProductType.TRENERKA,
        ProductType.PANTALONI,
        ProductType.MAICA,
        ProductType.JAKNA,
        ProductType.DOLEN_DEL_TRENERKI,
        ProductType.DUKSER,
        ProductType.ELEK,
        ProductType.HELANKI,],
    WOMEN:[ProductType.KAPUT,
        ProductType.TRENERKA,
        ProductType.PANTALONI,
        ProductType.MAICA,
        ProductType.JAKNA,
        ProductType.DOLEN_DEL_TRENERKI,
        ProductType.DUKSER,
        ProductType.ELEK,
        ProductType.HELANKI,
        ProductType.GRADNIK,
        ProductType.FUSTAN,]
}

const ProductForm = ({onProductCreated , open,close,addProduct})=>{
    const [formData,setFormData]=useState(initialForm);
    // const {addProduct} = useProduct();
    const handleChange = (event:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
        const {name,value}=event.target;
        setFormData({...formData, [name]:value});
    }

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(!formData.genderType || !formData.productType || !formData.name || !formData.description){
            alert("Please populate all fields");
            return;
        }
        const productToCreate:CreateProduct = {
            name:formData.name,
            description: formData.description,
            genderType: formData.genderType as GenderType,
            productType: formData.productType as ProductType,
        };
        try{
            const createdProduct =await addProduct(productToCreate);
            onProductCreated(createdProduct.id);
            setFormData(initialForm);
            close();
            console.log(createdProduct.id);
        }catch (err){
            console.log(err);
        }


    }

    return (
        <>
            <Dialog open={open} onClose={close}>
                <DialogTitle>Add new product</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Name" />
                        <input
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Description" />
                        <select
                            name="genderType"
                            value={formData.genderType}
                            onChange={handleChange}>
                            <option value="">SelectGender</option>
                            {Object.values(GenderType).map(genderTypes => (<option key={genderTypes} value={genderTypes}>{genderTypes}</option>))}
                        </select>
                        <select
                            name="productType"
                            value={formData.productType}
                            onChange={handleChange}>
                            <option value="">SelectProductType</option>
                            {formData.genderType &&
                                productTypesByGender[formData.genderType as GenderType].map(pt =>
                                    (<option key={pt} value={pt}>{pt}</option>))}
                        </select>
                        <DialogActions>
                            <button type={"submit"}>Create Product</button>
                        </DialogActions>

                    </form>
                </DialogContent>
            </Dialog>

        </>
    )
}

export default ProductForm;