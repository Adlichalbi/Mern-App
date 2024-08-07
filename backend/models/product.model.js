import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price must be greater than 0"],
    },
    image: {
      type: String,
      required: [true, "Product Image is required"],
    },
  },
  {
    timestamps: true, // createdAt,updatedAt
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
