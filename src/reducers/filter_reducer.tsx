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
	}
}

const filter_reducer = (state: typeof initialState, action: Action) => {
	switch (action.type) {
		case typeEnum.SET_GRIDVIEW:
			return { ...state, grid_view: true }
		case typeEnum.SET_LISTVIEW:
			return { ...state, grid_view: false }
		case typeEnum.LOAD_PRODUCTS:
			if (action.payload && action.payload.products)
				return {
					...state,
					all_products: [...action.payload.products],
					filtered_products: [...action.payload.products],
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
		default:
			throw new Error(`No Matching "${action.type}" - action type`)
	}
}

export default filter_reducer
