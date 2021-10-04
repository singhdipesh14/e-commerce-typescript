import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Navbar, Sidebar, Footer } from "./components"
import Nav from "./components/Navbar"

import { About, Cart, Checkout, Home, Products, SingleProduct } from "./pages"
import ErrorPage from "./pages/ErrorPage"

function App() {
	return (
		<Router>
			<Navbar />
			<Sidebar />
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route exact path="/about">
					<About />
				</Route>
				<Route exact path="/cart">
					<Cart />
				</Route>
				<Route exact path="/products">
					<Products />
				</Route>
				<Route exact path="/products/:id">
					<SingleProduct />
				</Route>
				<Route exact path="/checkout">
					<Checkout />
				</Route>
				<Route exact path="*">
					<ErrorPage />
				</Route>
			</Switch>
			<Footer />
		</Router>
	)
}

export default App
