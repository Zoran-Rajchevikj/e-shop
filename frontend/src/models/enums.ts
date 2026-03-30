// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export enum GenderType{
    MEN= "MEN",
    WOMEN= "WOMEN",
    KIDS="KIDS"
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export enum ProductType {
    MAICA = "MAICA",
    DUKSER = "DUKSER",
    DOLEN_DEL_TRENERKI = "DOLEN_DEL_TRENERKI",
    TRENERKA = "TRENERKA",
    ELEK = "ELEK",
    JAKNA = "JAKNA",
    PANTALONI = "PANTALONI",
    HELANKI = "HELANKI",
    GRADNIK = "GRADNIK",
    FUSTAN ="FUSTAN",
    KAPUT ="KAPUT",

}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export enum Size{
    XS, S, M, L, XL, XXL
}
export const ProductTypeLabel: Record<ProductType, string> = {
    [ProductType.MAICA]: "Маица",
    [ProductType.DUKSER]: "Дуксер",
    [ProductType.DOLEN_DEL_TRENERKI]: "Долен дел тренерки",
    [ProductType.TRENERKA]: "Тренерка",
    [ProductType.ELEK]: "Елек",
    [ProductType.JAKNA]: "Јакна",
    [ProductType.PANTALONI]: "Панталони",
    [ProductType.HELANKI]: "Хеланки",
    [ProductType.GRADNIK]: "Градник",
    [ProductType.FUSTAN]:"Фустан",
    [ProductType.KAPUT] : "Капут"
};