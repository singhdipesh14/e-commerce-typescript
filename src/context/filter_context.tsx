import React, { useEffect, useContext, useReducer } from "react"
import reducer, { typeEnum } from "../reducers/filter_reducer"

import { useProductsContext, ProductsType } from "./products_context"

export const initialState = {
	filtered_products: [] as ProductsType,
	all_products: [] as ProductsType,
	grid_view: true,
	sort: "price-lowest",
	filters: {
		text: "",
		company: "all",
		category: "all",
		color: "all",
		min_price: 0,
		max_price: 0,
		price: 0,
		shipping: false,
	},
}

type contextType = {
	filtered_products: ProductsType
	all_products: ProductsType
	grid_view: boolean
	toggle: (bool: boolean) => void
	updateSort: (e: React.ChangeEvent<HTMLSelectElement>) => void
	sort: string
	updateFilters: (e: React.ChangeEvent<any>) => void
	clearFilters: () => void
	filters: typeof initialState.filters
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
	}, [products, state.sort, state.filtered_products])

	useEffect(() => {
		dispatch({ type: typeEnum.FILTER_PRODUCTS })
	}, [products, state.filters])

	const toggleView = (bool: boolean) => {
		if (bool) dispatch({ type: typeEnum.SET_GRIDVIEW })
		else dispatch({ type: typeEnum.SET_LISTVIEW })
	}
	const updateSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
		// const name = e.target.name
		const value = e.target.value
		dispatch({ type: typeEnum.UPDATE_SORT, payload: { sortValue: value } })
	}

	const updateFilters = (e: React.ChangeEvent<any>) => {
		let name: string = e.target.name
		let value: string | number | boolean = e.target.value
		if (name === "price") value = Number(value)
		if (name === "shipping") value = e.target.checked
		dispatch({
			type: typeEnum.UPDATE_FILTERS,
			payload: {
				filterName: name,
				filterValue: value,
			},
		})
	}

	const clearFilters = () => {
		dispatch({ type: typeEnum.CLEAR_FILTERS })
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
				updateFilters,
				clearFilters,
				filters: state.filters,
			}}>
			{children}
		</FilterContext.Provider>
	)
}
// make sure use
export const useFilterContext = () => {
	return useContext(FilterContext)
}
