import { ObjectId } from 'mongodb';
import { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  category: { type: ObjectId, ref: 'Category' },
  price: { type: Number, required: true },
  images: { type: [String] },
  properties: { type: Object },
});

export const Product = models?.Product || model('Product', ProductSchema);

export const createProduct = (data: Record<string, any>) =>
  Product.create(data);
export const getProducts = () => Product.find();
export const getProductById = (_id: string) => Product.findById(_id);
export const getProductByCategory = (category: string) =>
  Product.find({ category: category });
export const updateProductById = (_id: string, data: Record<string, any>) =>
  Product.findByIdAndUpdate(_id, data);
export const deleteProductById = (_id: string) =>
  Product.findByIdAndDelete(_id);
