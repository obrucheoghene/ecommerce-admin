import { ObjectId } from 'mongodb';
import { Schema, models, model } from 'mongoose';

const CategorySchema = new Schema({
  name: { type: String, require: true },
  parent: { type: ObjectId, ref: 'Category', default: null },
  properties: [{ type: Object }],
});

export const Category = models?.Category || model('Category', CategorySchema);

// Actions
export const createCategory = (data: Record<string, any>) =>
  Category.create(data);
export const getCategories = () => Category.find().populate('parent');
export const getCategoryById = (_id: string) => Category.findById(_id);
export const getCategoryByName = (name: string) => Category.findOne({ name });
export const getCategoriesByParent = (parent: string) =>
  Category.find({ parent });

export const updateCategoryById = (_id: string, data: Record<string, any>) =>
  Category.findByIdAndUpdate(_id, data);

export const deleteCategoryById = (_id: string) =>
  Category.findByIdAndDelete(_id);
