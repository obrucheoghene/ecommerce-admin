import { Product } from '@/models/product';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function hanler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { productId } = req.query;

  if (!productId || typeof productId !== 'string') {
    throw new Error('Invalid ID');
  }

  if (method === 'GET') {
    try {
      const product = await Product.findById(productId);
      res.status(200).json(product);
    } catch (error) {
      console.log(error);
      res.status(400).end();
    }
  }

  if (method === 'PATCH') {
    const { name, price, description } = req.body;

    try {
      const product = await Product.findByIdAndUpdate(productId, {
        price,
        name,
        description,
      });
      res.status(200).json({ status: 'Updated' });
    } catch (error) {
      console.log(error);
      res.status(400).end();
    }
  }

  if (method === 'DELETE') {
    try {
      await Product.findByIdAndDelete(productId);
      res.status(200).json({ status: 'Deleted' });
    } catch (error) {
      console.log(error);
      res.status(400).end();
    }
  }
}
