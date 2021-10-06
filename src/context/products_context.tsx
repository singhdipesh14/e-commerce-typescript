import axios from "axios"
import React, { useCallback, useContext, useEffect, useReducer } from "react"
import reducer, { typeEnum } from "../reducers/products_reducer"
import { products_url as url } from "../utils/constants"

export type SingleProductType = {
	id: string
	featured?: boolean
	colors: string[]
	description: string
	image: string
	name: string
	shipping: boolean
	category: string
	price: number
	company: string
}

export type Image = {
	id: string
	width: number
	height: number
	url: string
	filename: string
	type: string
	thumbnail: {
		small: {
			height: number
			width: number
			url: string
		}
		large: {
			height: number
			width: number
			url: string
		}
		medium: {
			height: number
			width: number
			url: string
		}
	}
}

export type SingleProductPageType = {
	id: string
	category: string
	company: string
	colors: string[]
	featured?: boolean
	description: string
	images: Image[]
	name: string
	price: number
	reviews: number
	stars: number
	stock: number
}

export type ProductsType = SingleProductType[]

export const initialState = {
	isSidebarOpen: false,
	products_loading: false,
	products_error: false,
	products: [] as ProductsType,
	featured_products: [] as ProductsType,
	single_products_loading: false,
	single_products_error: false,
	single_products: {} as SingleProductPageType,
}

type contextType = {
	openSidebar: () => void
	closeSidebar: () => void
	isSidebarOpen: boolean
	featured_products: ProductsType
	products: ProductsType
	products_loading: boolean
	products_error: boolean
	single_products: SingleProductPageType
	single_products_loading: boolean
	single_products_error: boolean
	fetchSingleProduct: (url: string) => Promise<void>
}

const ProductsContext = React.createContext({} as contextType)

export const ProductsProvider: React.FC = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState)
	const openSidebar = () => {
		dispatch({ type: typeEnum.SIDEBAR_OPEN })
	}
	const closeSidebar = () => {
		dispatch({ type: typeEnum.SIDEBAR_CLOSE })
	}

	const fetchSingleProduct = useCallback(async (url: string) => {
		dispatch({ type: typeEnum.GET_SINGLE_PRODUCT_BEGIN })
		try {
			const response = await axios.get(url)
			const singleProduct: SingleProductPageType = response.data
			dispatch({
				type: typeEnum.GET_SINGLE_PRODUCT_SUCCESS,
				payload: { singleProduct },
			})
		} catch (error) {
			dispatch({ type: typeEnum.GET_SINGLE_PRODUCT_ERROR })
		}
	}, [])

	const fetchProducts = async (url: string) => {
		dispatch({ type: typeEnum.GET_PRODUCTS_BEGIN })
		try {
			const response = await axios.get(url)
			const products: ProductsType = response.data
			dispatch({
				type: typeEnum.GET_PRODUCTS_SUCCESS,
				payload: { products },
			})
		} catch (error) {
			dispatch({ type: typeEnum.GET_PRODUCTS_ERROR })
		}
	}

	useEffect(() => {
		fetchProducts(`${url}`)
	}, [])

	return (
		<ProductsContext.Provider
			value={{
				openSidebar,
				closeSidebar,
				isSidebarOpen: state.isSidebarOpen,
				products: state.products,
				featured_products: state.featured_products,
				products_loading: state.products_loading,
				products_error: state.products_error,
				fetchSingleProduct,
				single_products: state.single_products,
				single_products_error: state.single_products_error,
				single_products_loading: state.single_products_loading,
			}}>
			{children}
		</ProductsContext.Provider>
	)
}
// make sure use
export const useProductsContext = () => {
	return useContext(ProductsContext)
}
