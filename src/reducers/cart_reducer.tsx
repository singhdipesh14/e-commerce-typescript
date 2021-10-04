import {
	ADD_TO_CART,
	CLEAR_CART,
	COUNT_CART_TOTALS,
	REMOVE_CART_ITEM,
	TOGGLE_CART_ITEM_AMOUNT,
} from "../actions"

const cart_reducer = (state: any, action: any) => {
	return state
	throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
