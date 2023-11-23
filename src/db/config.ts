import mongoose from "mongoose";
export default function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;
        connection.on("error", (err) => {
            console.log(err)
        });
        connection.on("connected", () => {
            console.log("Connected to database");
        });

    } catch (error) {
        console.error();

    }
}