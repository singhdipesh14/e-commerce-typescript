require("dotenv").config()
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET)

exports.handler = async function (event: any, context: any) {
	if (event.body) {
		const { shipping_fee, total_amount } = JSON.parse(event.body)
		const total = shipping_fee + total_amount
		try {
			const paymentIntent = await stripe.paymentIntents.create({
				amount: total,
				currency: "INR",
			})
			return {
				statusCode: 200,
				body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
			}
		} catch (error) {
			return {
				statusCode: 500,
				body: JSON.stringify({ msg: error.message }),
			}
		}
	}
	return {
		statusCode: 200,
		body: JSON.stringify({ msg: "create-payment-intent" }),
	}
}
