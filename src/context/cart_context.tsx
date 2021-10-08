import React, { useEffect, useContext, useReducer } from "react"
import reducer, { typeEnum } from "../reducers/cart_reducer"
import { SingleProductPageType } from "./products_context"

export type Item = {
	id: string
	name: string
	color: string
	amount: number
	image: string
	price: number
	max: number
}

const getLocalStorage = () => {
	let cart = localStorage.getItem("cart")
	if (cart) return JSON.parse(cart)
	else return []
}

export const initialState = {
	cart: getLocalStorage() as Item[],
	total_items: 0,
	total_amount: 0,
	shipping_fee: 535,
}

export type addToCartParams = {
	amount: number
	color: string
	id: string
	product: SingleProductPageType
}

type contextType = {
	cart: Item[]
	total_items: number
	total_amount: number
	shipping_fee: number
	addToCart: (arg0: addToCartParams) => void
	removeItem: (id: string) => void
	clearCart: () => void
	toggleAmount: (id: string, value: number) => void
}

const CartContext = React.createContext({} as contextType)

export const CartProvider: React.FC = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState)
	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(state.cart))
		dispatch({ type: typeEnum.COUNT_CART_TOTALS })
	}, [state.cart])
	const addToCart = ({ amount, color, id, product }: addToCartParams) => {
		dispatch({
			type: typeEnum.ADD_TO_CART,
			payload: {
				item: { id, color, amount, product },
			},
		})
	}
	const removeItem = (id: string) => {
		dispatch({ type: typeEnum.REMOVE_CART_ITEM, payload: { id } })
	}
	const toggleAmount = (id: string, value: number) => {
		dispatch({
			type: typeEnum.TOGGLE_CART_ITEM_AMOUNT,
			payload: { id, toggleAmount: value },
		})
	}
	const clearCart = () => {
		dispatch({ type: typeEnum.CLEAR_CART })
	}

	return (
		<CartContext.Provider
			value={{
				cart: state.cart,
				shipping_fee: state.shipping_fee,
				total_amount: state.total_amount,
				total_items: state.total_items,
				addToCart,
				removeItem,
				clearCart,
				toggleAmount,
			}}>
			{children}
		</CartContext.Provider>
	)
}
// make sure use
export const useCartContext = () => {
	return useContext(CartContext)
}
