import React, { useState } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { FaCheck } from "react-icons/fa"
import { useCartContext } from "../context/cart_context"
import AmountButtons from "./AmountButtons"
import { SingleProductPageType } from "../context/products_context"
const AddToCart: React.FC<{ product: SingleProductPageType }> = ({
	product: { id, colors, stock },
}) => {
	const [mainColor, setMainColor] = useState(colors[0])
	const [amount, setAmount] = useState(1)

	const increase = () => {
		const newAmount = amount + 1
		if (newAmount > stock) return
		setAmount(newAmount)
	}

	const decrease = () => {
		const newAmount = amount - 1
		if (newAmount === 0) return
		setAmount(newAmount)
	}

	return (
		<Wrapper>
			<div className="colors">
				<span>colors : </span>
				<div>
					{colors.map((color, index) => {
						return (
							<button
								key={index}
								className={`color-btn ${color === mainColor && "active"}`}
								style={{
									background: color,
								}}
								onClick={() => setMainColor(color)}>
								{color === mainColor && <FaCheck />}
							</button>
						)
					})}
				</div>
			</div>

			<div className="btn-container">
				<AmountButtons amount={amount} increase={increase} decrease={decrease} />
				<Link to="/cart" className="btn">
					Add to cart
				</Link>
			</div>
		</Wrapper>
	)
}

const Wrapper = styled.section`
	margin-top: 2rem;
	.colors {
		display: grid;
		grid-template-columns: 125px 1fr;
		align-items: center;
		margin-bottom: 1rem;
		span {
			text-transform: capitalize;
			font-weight: 700;
		}
		div {
			display: flex;
		}
	}
	.color-btn {
		display: inline-block;
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 50%;
		background: #222;
		margin-right: 0.5rem;
		border: 2px solid var(--clr-white);
		cursor: pointer;
		opacity: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		svg {
			font-size: 0.75rem;
			color: var(--clr-white);
		}
	}
	.active {
		opacity: 1;
		border: none;
	}
	.btn-container {
		margin-top: 2rem;
	}

	.btn {
		margin-top: 1rem;
		width: 140px;
	}
`
export default AddToCart
