import { cartModel } from "../../../database/models/cart.model.js";
import { orderModel } from "../../../database/models/order.model.js";
import { productModel } from "../../../database/models/product.model.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/AppError.js";
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51Ov6fYRummjHSFwf7b9OouUIbdUonx0nU1AqvG02wj73GCynfGkQt9orNZbO83lRkH2RjqTotJeZcgK8K1MZ42dS00XabqzpGz');
export const createOrderCash = catchError(async (req, res, next) => {
  // 1-get cart=>cartId
  let cart = await cartModel.findById(req.params.id)
  if (!cart) return next(new AppError("cart not found", 404))
  // 2-totalPrice
  let totalOrderPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice
  // 3-create order
  let order = new orderModel({
    user: req.user._id,
    totalOrderPrice,
    orderItems: cart.cartItems,
    shippingAddress: req.body.shippingAddress
  })
  await order.save();

  // 4-increment sold & decrement quantity
  let options = cart.cartItems.map((item) => {
    return (
      {
        updateOne: {
          "filter": { _id: item.product },
          "update": { $inc: { sold: item.quantity, quantity: -item.quantity } }
        }
      }
    )
  })

  await productModel.bulkWrite(options)

  // 5-clear cart
  await cartModel.findByIdAndDelete(req.params.id)
  res.json({ message: 'success', order })
});

export const getSpecificOrder = catchError(async (req, res, next) => {
  let order = await orderModel.findOne({ user: req.user._id }).populate('orderItems.product');
  res.json({ message: 'success', order });
});

export const getAllOrders = catchError(async (req, res, next) => {
  let order = await orderModel.find({}).populate('orderItems.product');
  res.json({ message: 'success', order });
});

export const createCheckOutSession = catchError(async (req, res, next) => {
  // 1-get cart=>cartId
  let cart = await cartModel.findById(req.params.id)
  if (!cart) return next(new AppError("cart not found", 404))
  // 2-totalPrice
  let totalOrderPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice
  // 3-create session
  let session = await stripe.checkout.sessions.create({
    line_items: [{
      price_data: {
        currency: 'egp',
        unit_amount: totalOrderPrice * 100,
        product_data: {
          name: req.user.name
        }
      }, quantity: 1
    }],
    mode: 'payment',
    success_url: 'https://route-comm.netlify.app/#/',
    cancel_url: 'https://route-comm.netlify.app/#/cart',
    customer_email: req.user.email,
    client_reference_id: req.params.id,
    metadata: req.body.shippingAddress
  })
  res.json({ message: 'success', session })
});