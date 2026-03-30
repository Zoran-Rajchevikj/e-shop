// import {useCallback, useState} from "react";
// import variantRepository from "../api/repository/variantRepository.ts";
//
// const initialState= {
//     "variants":[],
//     "loading":true,
// };
//
// const useProductVariant = () => {
//         const [state,setState]=useState(initialState);
//
//     const fetchVariantByProductId = useCallback( (productId:number) => {
//             setState(initialState);
//             variantRepository
//                 .getAllVariantsByProduct(productId)
//                 .then((response) => {
//                     setState({
//                         "variants": response.data,
//                         loading:false
//                     })
//                 })
//                 .catch((error) => console.log(error))
//     },[])
//
// }
// export default useVariant;