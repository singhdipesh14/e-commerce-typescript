import axios from "axios"
import React, { useContext, useEffect, useReducer } from "react"
import reducer, { typeEnum } from "../reducers/products_reducer"
import { products_url as url } from "../utils/constants"

const initialState = {
	isSidebarOpen: false,
}

type contextType = {
	openSidebar: () => void
	closeSidebar: () => void
	isSidebarOpen: boolean
}

const ProductsContext = React.createContext({} as contextType)

export const ProductsProvider: React.FC = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState)
	const openSidebar = () => {
		dispatch({ type: typeEnum.SIDEBAR_OPEN, payload: {} })
	}
	const closeSidebar = () => {
		dispatch({ type: typeEnum.SIDEBAR_CLOSE, payload: {} })
	}
	return (
		<ProductsContext.Provider
			value={{
				openSidebar,
				closeSidebar,
				isSidebarOpen: state.isSidebarOpen,
			}}>
			{children}
		</ProductsContext.Provider>
	)
}
// make sure use
export const useProductsContext = () => {
	return useContext(ProductsContext)
}
