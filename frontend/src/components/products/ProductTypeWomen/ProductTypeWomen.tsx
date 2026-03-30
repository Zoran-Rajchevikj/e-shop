import {ProductType} from "../../../models/enums.ts";
import ProductTypes from "../ProductTypes/ProductTypes.tsx";

const WOMEN_PRODUCT_TYPE =[
    ProductType.ELEK,
    ProductType.DUKSER,
    ProductType.JAKNA,
    ProductType.HELANKI,
    ProductType.DOLEN_DEL_TRENERKI,
    ProductType.MAICA,
    ProductType.PANTALONI,
    ProductType.TRENERKA,
    ProductType.KAPUT,
    ProductType.FUSTAN,
    ProductType.GRADNIK
]

const ProductTypeWomen = () => {

    return(
        <ProductTypes title={"Женска Облека"} productType={WOMEN_PRODUCT_TYPE} category={"women"} />
    )
}
export default ProductTypeWomen;