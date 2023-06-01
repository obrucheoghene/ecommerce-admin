import { mongooseConnect } from '@/lib/mongoose';
import {
  Category,
  createCategory,
  getCategories,
  getCategoryByName,
} from '@/models/category';
import { NextApiRequest, NextApiResponse } from 'next';
import { isAdminRequest } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await mongooseConnect();
  await isAdminRequest(req, res);

  if (method !== 'POST' && method !== 'GET') {
    return res.status(400).end();
  }

  if (method === 'POST') {
    const { name, parent, properties } = req.body;
    if (!name) {
      return res.status(400).end();
    }
    try {
      const existingCategory = await getCategoryByName(name);
      if (existingCategory) {
        return res.status(409).json({ error: 'Category already exist' });
      }
      const category = await createCategory({
        name,
        parent: parent === '' ? null : parent,
        properties,
      });
      return res.status(200).json(category);
    } catch (error) {
      console.log(error);
      return res.status(400).end();
    }
  }

  if (method === 'GET') {
    try {
      const categories = await getCategories();
      return res.status(200).json(categories);
    } catch (error) {
      console.log(error);
      return res.status(400).end();
    }
  }
}
