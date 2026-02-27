import mongoose from "mongoose"

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
            .then(() => {
                process.env.NODE_ENV == "development" && console.log("Database Connected.");
            })
    } catch (error) {
        process.env.NODE_ENV == "development" && console.log("Error Connecting Mongo DB", error);
    }
};

export default connectDatabase;