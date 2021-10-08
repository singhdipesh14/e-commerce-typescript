import React, { useContext } from "react"
import {
	LogoutOptions,
	RedirectLoginOptions,
	useAuth0,
} from "@auth0/auth0-react"

export type contextType = {
	loginWithRedirect: (
		options?: RedirectLoginOptions | undefined
	) => Promise<void>
	isAuthenticated: boolean
	logout: (options?: LogoutOptions | undefined) => void
}

const UserContext = React.createContext({} as contextType)
export const UserProvider: React.FC = ({ children }) => {
	const { loginWithRedirect, isAuthenticated, logout } = useAuth0()
	return (
		<UserContext.Provider
			value={{
				loginWithRedirect,
				isAuthenticated,
				logout,
			}}>
			{children}
		</UserContext.Provider>
	)
}
// make sure use
export const useUserContext = () => {
	return useContext(UserContext)
}
