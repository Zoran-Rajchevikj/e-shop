import {ProductType} from "../../../models/enums.ts";

import './ProductTypeMen.css'
import ProductTypes from "../ProductTypes/ProductTypes.tsx";
const MAN_PRODUCT_TYPE = [
    ProductType.ELEK,
    ProductType.DUKSER,
    ProductType.JAKNA,
    ProductType.HELANKI,
    ProductType.DOLEN_DEL_TRENERKI,
    ProductType.MAICA,
    ProductType.PANTALONI,
    ProductType.TRENERKA,
    ProductType.KAPUT,
]

const ProductTypeMen = () => {

    return(
        <ProductTypes title={"Машка Облека"} productType={MAN_PRODUCT_TYPE} category={"men"} />
    )
}
export default ProductTypeMen;