import clientPromise from '@/lib/mongodb';
import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/product';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  await mongooseConnect();

  if (method === 'POST') {
    const { name, price, description } = req.body;

    const product = await Product.create({ name, price, description });
    res.status(200).json(product);
  }
}
