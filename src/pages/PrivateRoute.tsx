import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useUserContext } from "../context/user_context"

type privateRouteType = {
	exact: boolean
	path: string
}

const PrivateRoute: React.FC<privateRouteType> = ({ children, ...rest }) => {
	const { isAuthenticated } = useUserContext()

	return (
		<Route
			{...rest}
			render={() => {
				return isAuthenticated ? children : <Redirect to="/" />
			}}></Route>
	)
}
export default PrivateRoute
