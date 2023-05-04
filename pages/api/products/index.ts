import clientPromise from '@/lib/mongodb';
import { mongooseConnect } from '@/lib/mongoose';
import { Product, createProduct, getProducts } from '@/models/product';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  await mongooseConnect();

  if (method === 'POST') {
    const { name, price, description, images } = req.body;

    try {
      const product = await createProduct({
        name,
        price,
        description,
        images,
      });
      res.status(200).json(product);
    } catch (error) {
      console.log(error);
      res.status(400).end();
    }
  }

  if (method === 'GET') {
    try {
      const products = await getProducts();

      res.status(200).json(products);
    } catch (error) {
      console.log(error);
      res.status(400).end();
    }
  }
}
