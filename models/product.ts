import { ObjectId } from 'mongodb';
import { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  category: { type: ObjectId, ref: 'Category' },
  price: { type: Number, required: true },
  images: { type: [String] },
});

export const Product = models?.Product || model('Product', ProductSchema);
