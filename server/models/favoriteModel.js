import mongoose, { Schema } from "mongoose"; // Erase if already required
import modelOptions from "./model.option.js";

// Declare the Schema of the Mongo model
const favoriteSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
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
    mediaRate: {
      type: Number,
      required: true,
    },
  },
  modelOptions
);

//Export the model
const favoriteModel = mongoose.model("Favorite", favoriteSchema);
export default favoriteModel;
