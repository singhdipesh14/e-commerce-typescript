import { type } from "os"
import React, { useEffect, useContext, useReducer, ContextType } from "react"
import { SORT_PRODUCTS } from "../actions"
import reducer, { typeEnum } from "../reducers/filter_reducer"

import { useProductsContext, ProductsType } from "./products_context"

export const initialState = {
	filtered_products: [] as ProductsType,
	all_products: [] as ProductsType,
	grid_view: true,
	sort: "price-lowest",
}

type contextType = {
	filtered_products: ProductsType
	all_products: ProductsType
	grid_view: boolean
	toggle: (bool: boolean) => void
	updateSort: (e: React.ChangeEvent<HTMLSelectElement>) => void
	sort: string
}

const FilterContext = React.createContext({} as contextType)

export const FilterProvider: React.FC = ({ children }) => {
	const { products } = useProductsContext()
	const [state, dispatch] = useReducer(reducer, initialState)

	useEffect(() => {
		dispatch({
			type: typeEnum.LOAD_PRODUCTS,
			payload: {
				products,
			},
		})
	}, [products])

	useEffect(() => {
		dispatch({ type: typeEnum.SORT_PRODUCTS })
	}, [products, state.sort])

	const toggleView = (bool: boolean) => {
		if (bool) dispatch({ type: typeEnum.SET_GRIDVIEW })
		else dispatch({ type: typeEnum.SET_LISTVIEW })
	}
	const updateSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
		// const name = e.target.name
		const value = e.target.value
		dispatch({ type: typeEnum.UPDATE_SORT, payload: { sortValue: value } })
	}
	return (
		<FilterContext.Provider
			value={{
				filtered_products: state.filtered_products,
				all_products: state.all_products,
				grid_view: state.grid_view,
				toggle: toggleView,
				updateSort,
				sort: state.sort,
			}}>
			{children}
		</FilterContext.Provider>
	)
}
// make sure use
export const useFilterContext = () => {
	return useContext(FilterContext)
}
