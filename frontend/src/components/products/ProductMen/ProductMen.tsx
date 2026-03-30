import {GenderType} from "../../../models/enums.ts";
import './ProductMen.css'
import ShowProducts from "../ShowProducts/ShowProducts.tsx";

const ProductMen = () => {

    return (

        <ShowProducts genderType={GenderType.MEN} />
    )
}

export default ProductMen;
