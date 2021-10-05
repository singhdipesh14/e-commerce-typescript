import axios from "axios"
import React, { Reducer, useContext, useEffect, useReducer } from "react"
import reducer, { typeEnum } from "../reducers/products_reducer"
import { products_url as url } from "../utils/constants"

export type SingleProductType = {
	id: string
	featured?: boolean
	colors: string[3]
	description: string
	image: string
	name: string
	shipping: boolean
	category: string
	price: number
	company: string
}

export type SingleProductPageType = {}

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

	const fetchSingleProduct = async (url: string) => {
		dispatch({ type: typeEnum.GET_SINGLE_PRODUCT_BEGIN })
		try {
			const response = await axios.get(url)
			console.log(response.data)
			const singleProduct: SingleProductPageType = response.data
		} catch (error) {
			dispatch({ type: typeEnum.GET_SINGLE_PRODUCT_ERROR })
		}
	}

	const fetchProducts = async (url: string) => {
		dispatch({ type: typeEnum.GET_PRODUCTS_BEGIN })
		try {
			const response = await axios.get(url)
			const products: ProductsType = response.data
			dispatch({ type: typeEnum.GET_PRODUCTS_SUCCESS, payload: products })
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
			}}>
			{children}
		</ProductsContext.Provider>
	)
}
// make sure use
export const useProductsContext = () => {
	return useContext(ProductsContext)
}
