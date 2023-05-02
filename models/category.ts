import { Schema, models, model } from 'mongoose';

const CategorySchema = new Schema({
  name: { type: String, require: true },
});

export const Category = models?.Category || model('Category', CategorySchema);

// Actions
export const getCategories = () => Category.find();
export const getCategoryById = (_id: string) => Category.findById(_id);
export const getCategoryByName = (name: string) => Category.findOne({ name });
export const createCategory = (data: Record<string, any>) =>
  Category.create(data);
