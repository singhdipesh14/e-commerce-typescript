import { addToCartParams, initialState, Item } from "../context/cart_context"

export enum typeEnum {
	ADD_TO_CART = "ADD_TO_CART",
	CLEAR_CART = "CLEAR_CART",
	COUNT_CART_TOTALS = "COUNT_CART_TOTALS",
	REMOVE_CART_ITEM = "REMOVE_CART_ITEM",
	TOGGLE_CART_ITEM_AMOUNT = "TOGGLE_CART_ITEM_AMOUNT",
}

type Action = {
	type: string
	payload?: {
		item?: addToCartParams
		id?: string
		toggleAmount?: number
	}
}

const cart_reducer = (state: typeof initialState, action: Action) => {
	switch (action.type) {
		case typeEnum.ADD_TO_CART:
			if (action.payload && action.payload.item) {
				const { amount, color, id, product } = action.payload.item
				const tempItem = state.cart.find((it) => it.id === id + color)

				if (tempItem) {
					const tempCart = state.cart.map((item) => {
						if (item.id === tempItem.id) {
							let newAmount = item.amount + amount
							if (newAmount > item.max) {
								newAmount = item.max
							}

							return { ...item, amount: newAmount }
						}

						return item
					})
					return { ...state, cart: tempCart }
				} else {
					const newItem: Item = {
						id: id + color,
						name: product.name,
						color,
						amount,
						image: product.images[0].url,
						price: product.price,
						max: product.stock,
					}
					return { ...state, cart: [...state.cart, newItem] }
				}
			}
			return { ...state }
		case typeEnum.REMOVE_CART_ITEM:
			if (action.payload && action.payload.id) {
				const tempCart = state.cart.filter((item) => item.id !== action.payload?.id)
				return { ...state, cart: tempCart }
			}
			return { ...state }
		case typeEnum.CLEAR_CART:
			return { ...state, cart: [] }
		case typeEnum.TOGGLE_CART_ITEM_AMOUNT:
			if (action.payload && action.payload.id && action.payload.toggleAmount) {
				const item = state.cart.find((item) => item.id === action.payload?.id)
				if (item) {
					const newAmount = item.amount + action.payload.toggleAmount
					if (newAmount === 0) {
						return { ...state, cart: state.cart.filter((im) => im.id !== item.id) }
					}
					if (newAmount > item.max) {
						return { ...state }
					}
					return {
						...state,
						cart: state.cart.map((im) => {
							if (im.id === item.id) {
								return { ...im, amount: newAmount }
							}
							return im
						}),
					}
				}
			}
			return { ...state }
		case typeEnum.COUNT_CART_TOTALS:
			const total = state.cart.reduce(
				(acc, item) => {
					return {
						nb: acc.nb + item.amount,
						total: acc.total + item.amount * item.price,
					}
				},
				{ nb: 0, total: 0 }
			)
			return { ...state, total_items: total.nb, total_amount: total.total }
		default:
			throw new Error(`No Matching "${action.type}" - action type`)
	}
}

export default cart_reducer
