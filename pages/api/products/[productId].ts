import { mongooseConnect } from '@/lib/mongoose';
import {
  Product,
  deleteProductById,
  getProductById,
  updateProductById,
} from '@/models/product';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function hanler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await mongooseConnect();

  const { method } = req;
  const { productId } = req.query;

  if (!productId || typeof productId !== 'string') {
    throw new Error('Invalid ID');
  }

  if (method === 'GET') {
    try {
      const product = await getProductById(productId);
      res.status(200).json(product);
    } catch (error) {
      console.log(error);
      return res.status(400).end();
    }
  }

  if (method === 'PATCH') {
    const { name, price, description, images, category, properties } = req.body;

    try {
      const product = await updateProductById(productId, {
        price,
        name,
        description,
        images,
        category,
        properties,
      });
      return res.status(200).json({ status: 'Updated' });
    } catch (error) {
      console.log(error);
      return res.status(400).end();
    }
  }

  if (method === 'DELETE') {
    try {
      await deleteProductById(productId);
      return res.status(200).json({ status: 'Deleted' });
    } catch (error) {
      console.log(error);
      return res.status(400).end();
    }
  }
}
