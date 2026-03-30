import {ProductType} from "../../../models/enums.ts";
import ProductTypes from "../ProductTypes/ProductTypes.tsx";

const KIDS_PRODUCT_TYPE =[
    ProductType.ELEK,
    ProductType.DUKSER,
    ProductType.JAKNA,
    ProductType.HELANKI,
    ProductType.DOLEN_DEL_TRENERKI,
    ProductType.MAICA,
    ProductType.PANTALONI,
    ProductType.TRENERKA,
    ProductType.KAPUT,
    ProductType.FUSTAN
]

const ProductTypeKids = () => {

    return(
        <ProductTypes title={"Детска Облека"} productType={KIDS_PRODUCT_TYPE} category={"kids"} />
    )
}
export default ProductTypeKids;