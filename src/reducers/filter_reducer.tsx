import { initialState } from "../context/filter_context"
import { ProductsType } from "../context/products_context"

export enum typeEnum {
	LOAD_PRODUCTS = "LOAD_PRODUCTS",
	SET_LISTVIEW = "SET_LISTVIEW",
	SET_GRIDVIEW = "SET_GRIDVIEW",
	UPDATE_SORT = "UPDATE_SORT",
	SORT_PRODUCTS = "SORT_PRODUCTS",
	UPDATE_FILTERS = "UPDATE_FILTERS",
	FILTER_PRODUCTS = "FILTER_PRODUCTS",
	CLEAR_FILTERS = "CLEAR_FILTERS",
}

type Action = {
	type: typeEnum
	payload?: {
		products?: ProductsType
		sortValue?: string
		filterName?: string
		filterValue?: string | number | boolean
	}
}

const filter_reducer = (state: typeof initialState, action: Action) => {
	switch (action.type) {
		case typeEnum.UPDATE_FILTERS:
			if (action.payload && action.payload.filterName) {
				return {
					...state,
					filters: {
						...state.filters,
						[action.payload.filterName]: action.payload.filterValue,
					},
				}
			}
			return { ...state }
		case typeEnum.SET_GRIDVIEW:
			return { ...state, grid_view: true }
		case typeEnum.SET_LISTVIEW:
			return { ...state, grid_view: false }
		case typeEnum.LOAD_PRODUCTS:
			if (action.payload && action.payload.products) {
				let prices = action.payload.products.map((p) => p.price)
				let maxPrice = Math.max(...prices)
				return {
					...state,
					all_products: [...action.payload.products],
					filtered_products: [...action.payload.products],
					filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
				}
			}
			return { ...state }
		case typeEnum.UPDATE_SORT:
			if (action.payload && action.payload.sortValue) {
				return { ...state, sort: action.payload.sortValue }
			}
			return { ...state }
		case typeEnum.SORT_PRODUCTS:
			switch (state.sort) {
				case "price-lowest":
					return {
						...state,
						filtered_products: state.filtered_products.sort(
							(a, b) => a.price - b.price
						),
					}
				case "price-highest":
					return {
						...state,
						filtered_products: state.filtered_products.sort(
							(a, b) => b.price - a.price
						),
					}
				case "name-a":
					return {
						...state,
						filtered_products: state.filtered_products.sort((a, b) => {
							return a.name.localeCompare(b.name)
						}),
					}
				case "name-z":
					return {
						...state,
						filtered_products: state.filtered_products.sort((a, b) => {
							return b.name.localeCompare(a.name)
						}),
					}
			}
			return { ...state }
		case typeEnum.FILTER_PRODUCTS:
			const { all_products } = state
			const { category, color, company, price, shipping, text } = state.filters
			let tempProducts = [...all_products]
			if (text) {
				tempProducts = tempProducts.filter((prod) =>
					prod.name.toLowerCase().startsWith(text)
				)
			}
			if (category !== "all") {
				tempProducts = tempProducts.filter((prod) => prod.category === category)
			}
			if (color !== "all") {
				tempProducts = tempProducts.filter((prod) => prod.colors.includes(color))
			}
			if (company !== "all") {
				tempProducts = tempProducts.filter((prod) => prod.company === company)
			}
			tempProducts = tempProducts.filter((prod) => prod.price <= price)
			if (shipping) {
				tempProducts = tempProducts.filter(
					(prod) => prod.shipping && prod.shipping === true
				)
			}
			return { ...state, filtered_products: tempProducts }
		case typeEnum.CLEAR_FILTERS:
			return {
				...state,
				filtered_products: state.all_products,
				filters: {
					...state.filters,
					text: "",
					company: "all",
					category: "all",
					color: "all",
					price: state.filters.max_price,
					shipping: false,
				},
			}
		default:
			throw new Error(`No Matching "${action.type}" - action type`)
	}
}

export default filter_reducer
