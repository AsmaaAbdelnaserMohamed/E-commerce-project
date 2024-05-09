process.on("uncaughtException", (err) => {
  console.log("error", err)
});
import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import { bootstrap } from "./src/index.routes.js";
import dotenv from "dotenv";
import cors from "cors";
import  { createOnlineOrder} from "./src/modules/order/order.controller.js";
const port = process.env.PORT || 5000;
const app = express();
dotenv.config();
dbConnection();
app.use(cors())
app.post('/webhook', express.raw({type: 'application/json'}),createOnlineOrder)
// app.post('/webhook', express.raw({type: 'application/json'}),createOnlineOrder)
app.use(express.json());
app.use("/uploads", express.static("uploads"));
bootstrap(app);
process.on("unhandledRejection", (err) => {
  console.log("error", err);
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
