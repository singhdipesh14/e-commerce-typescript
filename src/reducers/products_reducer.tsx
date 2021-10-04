type stateType = {
	isSidebarOpen: boolean
}
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
	payload: any
}

const products_reducer = (state: stateType, action: actionType) => {
	switch (action.type) {
		case typeEnum.SIDEBAR_OPEN:
			return { ...state, isSidebarOpen: true }
		case typeEnum.SIDEBAR_CLOSE:
			return { ...state, isSidebarOpen: false }
	}
	throw new Error(`No Matching "${action.type}" - action type`)
}

export default products_reducer
