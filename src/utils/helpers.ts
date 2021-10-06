import { ProductsType } from "../context/products_context"

export const formatPrice = (price: number) => {
	return new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
	}).format(price / 100)
}

export const getUniqueValues = (data: ProductsType, type: string): any => {
	let unique = data.map((item) => (item as any)[type])
	let uniq2 = new Set(unique.flat())
	let arr = Array.from(uniq2)
	return ["all", ...arr]
}
