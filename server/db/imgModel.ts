import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
});

export default mongoose.model("Image", ImageSchema);
