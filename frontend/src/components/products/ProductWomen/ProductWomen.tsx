import ShowProducts from "../ShowProducts/ShowProducts.tsx";
import {GenderType} from "../../../models/enums.ts";

const ProductWomen = () => {
    return (
        <ShowProducts genderType={GenderType.WOMEN}/>
    )
}
export default ProductWomen;