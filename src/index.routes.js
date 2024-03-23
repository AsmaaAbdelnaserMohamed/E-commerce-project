import { globalError } from "./middleware/globalErrorHandling.js";
import authRouter from "./auth/auth.routes.js";
import brandRouter from "./modules/brand/brand.routes.js";
import categoryRouter from "./modules/category/category.routes.js";
import productRouter from "./modules/product/product.routes.js";
import subcategoryRouter from "./modules/subcategory/subcategory.routes.js";
import userRouter from "./modules/user/user.routes.js";
import { AppError } from "./utils/AppError.js";
import reviewRouter from "./modules/review/review.routes.js";
import wishListRouter from "./modules/wishList/wishList.routes.js";
import addressRouter from "./modules/addresses/address.routes.js";
import couponRouter from "./modules/coupon/coupon.routes.js";
import cartRouter from "./modules/cart/cart.routes.js";
import orderRouter from "./modules/order/order.routes.js";

export const bootstrap = (app) => {
  app.get("/", (req, res) => res.send("Hello World!"));
  app.use("/api/v1/categories", categoryRouter);
  app.use("/api/v1/subcategories", subcategoryRouter);
  app.use("/api/v1/brands", brandRouter);
  app.use("/api/v1/products", productRouter);
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/reviews", reviewRouter);
  app.use("/api/v1/wishList",wishListRouter);
  app.use("/api/v1/address",addressRouter);
  app.use("/api/v1/coupon",couponRouter);
  app.use("/api/v1/cart",cartRouter);
  app.use("/api/v1/order",orderRouter);
  app.use("*", (req, res, next) => {
    next(new AppError(`not found endpoint : ${req.originalUrl}`, 404));
  });
  app.use(globalError);
};
