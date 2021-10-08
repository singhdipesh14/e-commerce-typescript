import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { ProductsProvider } from "./context/products_context"
import { FilterProvider } from "./context/filter_context"
import { CartProvider } from "./context/cart_context"
import { UserProvider } from "./context/user_context"
import { Auth0Provider } from "@auth0/auth0-react"

const clientId = process.env.REACT_APP_CLIENT_ID || ""

const domain = process.env.REACT_APP_DOMAIN || ""

ReactDOM.render(
	<Auth0Provider
		clientId={clientId}
		redirectUri={window.location.origin}
		domain={domain}
		cacheLocation="localstorage">
		<UserProvider>
			<ProductsProvider>
				<FilterProvider>
					<CartProvider>
						<App />
					</CartProvider>
				</FilterProvider>
			</ProductsProvider>
		</UserProvider>
	</Auth0Provider>,
	document.getElementById("root")
)
