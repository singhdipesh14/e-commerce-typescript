import {
	initialState,
	ProductsType,
	SingleProductPageType,
} from "../context/products_context"

export enum typeEnum {
	SIDEBAR_OPEN = "SIDEBAR_OPEN",
	SIDEBAR_CLOSE = "SIDEBAR_CLOSE",
	GET_PRODUCTS_BEGIN = "GET_PRODUCTS_BEGIN",
	GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS",
	GET_PRODUCTS_ERROR = "GET_PRODUCTS_ERROR",
	GET_SINGLE_PRODUCT_BEGIN = "GET_SINGLE_PRODUCT_BEGIN",
	GET_SINGLE_PRODUCT_SUCCESS = "GET_SINGLE_PRODUCT_SUCCESS",
	GET_SINGLE_PRODUCT_ERROR = "GET_SINGLE_PRODUCT_ERROR",
}
type actionType = {
	type: typeEnum
	payload?: ProductsType | SingleProductPageType
}

const products_reducer = (state: typeof initialState, action: actionType) => {
	switch (action.type) {
		case typeEnum.SIDEBAR_OPEN:
			return { ...state, isSidebarOpen: true }
		case typeEnum.SIDEBAR_CLOSE:
			return { ...state, isSidebarOpen: false }
		case typeEnum.GET_PRODUCTS_BEGIN:
			return { ...state, products_loading: true }
		case typeEnum.GET_PRODUCTS_SUCCESS:
			if (action.payload && action.payload instanceof ProductsType) {
				const featured_products = action.payload.filter((product) => {
					if (product.featured) {
						if (product.featured === true) return true
					}
					return false
				})
				return {
					...state,
					products_loading: false,
					products: action.payload,
					featured_products,
				}
			}
			return {
				...state,
			}
		case typeEnum.GET_PRODUCTS_ERROR:
			return { ...state, products_loading: false, products_error: true }
		case typeEnum.GET_SINGLE_PRODUCT_BEGIN:
			return {
				...state,
				single_products_loading: true,
				single_products_error: false,
			}
		case typeEnum.GET_SINGLE_PRODUCT_SUCCESS:
			if (action.payload) {
				return { ...state, single_products: action.payload }
			}
			return { ...state }
		default:
			throw new Error(`No Matching "${action.type}" - action type`)
	}
}

export default products_reducer
