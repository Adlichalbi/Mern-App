import Product from "../models/product.model.js";
import mongoose from "mongoose";
import sendResponse from "../utils/sendResponse.js";
export const createProduct = async (req, res, next) => {
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    return sendResponse(res, 400, false, "All Fields Are Required");
  }
  const newProduct = new Product(product);
  try {
    await newProduct.save();
    sendResponse(res, 201, true, "Product Created Successfully", product);
  } catch (error) {
    next(error);
  }
};
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    if (!products.length) {
      return sendResponse(res, 404, false, "No Product Found");
    }
    return sendResponse(res, 200, true, "Products : ", products);
  } catch (error) {
    next(error);
  }
};
export const getProductById = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return sendResponse(res, 400, false, "Invalid Product Id");
  }
  try {
    const product = await Product.findById(id);
    if (!product) {
      return sendResponse(res, 404, false, "Product Not Found!");
    }
    return sendResponse(res, 200, true, "Product Found : ", product);
  } catch (error) {
    next(error);
  }
};

export const updateProductById = async (req, res, next) => {
  const product = req.body;
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return sendResponse(res, 400, false, "Invalid Product Id");
  }
  if (!product.name || !product.price || !product.image) {
    return sendResponse(res, 400, false, "All Fields Are Required");
  }
  try {
    await Product.findByIdAndUpdate(id, product);
    return sendResponse(
      res,
      200,
      true,
      "Producted Updated Successfully",
      product
    );
  } catch (error) {
    next(error);
  }
};
export const deleteProductById = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return sendResponse(res, 400, false, "Invalid Product Id");
  }
  try {
    await Product.findByIdAndDelete(id);
    return sendResponse(res, 200, true, "Product Deleted Successfully");
  } catch (error) {
    next(error);
  }
};
