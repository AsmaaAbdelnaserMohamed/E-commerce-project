import Stripe from "stripe";

async function payment({
    stripe = new Stripe(process.env.STRIPE__KEY),
    payment_method_types = ['card'],
    mode='payment',
    customer_email,
    customer_name,
    customer_phone,
    customer_address,
    customer_city,
    metadata={},
    cancel_url = process.env.CANCEL_URL,
    success_url = process.env.SUCCESS_URL,
    discounts = [],
    line_items=[]

} = {}) {

const session = await stripe.checkout.sessions.create({
    payment_method_types,
    mode,
    customer_email,
    customer_name,
    customer_phone,
    customer_address,
    customer_city,
    metadata,
    cancel_url, 
    success_url ,
    discounts,
    line_items
})
return session
}
export default payment