import mongoose, { Schema } from "mongoose"; // Erase if already required
import modelOptions from "./model.option.js";

// Declare the Schema of the Mongo model
const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    mediaType: {
      type: String,
      required: true,
      enum: ["movie", "tv"],
    },
    mediaId: {
      type: String,
      required: true,
    },
    mediaTitle: {
      type: String,
      required: true,
    },
    mediaPoster: {
      type: String,
      required: true,
    },
  },
  modelOptions
);

//Export the model
const reviewModel = mongoose.model("Review", reviewSchema);
export default reviewModel;
