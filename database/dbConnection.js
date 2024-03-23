
import mongoose from "mongoose";

export function dbConnection() {
    mongoose.connect(process.env.DB_ONLINE).then(() => {
        console.log('database is connected');
    })
}