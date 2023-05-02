import {
  Category,
  createCategory,
  getCategories,
  getCategoryByName,
} from '@/models/category';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method !== 'POST' && method !== 'GET') {
    return res.status(400).end();
  }

  if (method === 'POST') {
    const { name } = req.body;
    if (!name) {
      return res.status(400).end();
    }
    try {
      const existingCategory = await getCategoryByName(name);
      if (existingCategory) {
        return res.status(409).json({ error: 'Category already exist' });
      }
      const category = await createCategory({ name });
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
